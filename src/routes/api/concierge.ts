import { createFileRoute } from "@tanstack/react-router";
import { stepCountIs, streamText, tool } from "ai";
import { z } from "zod";

import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayRunId,
} from "@/lib/ai-gateway.server";
import { CONCIERGE_TABLES, searchSiteContent } from "@/lib/concierge-search.server";

const MODEL = "google/gemini-2.5-flash";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .min(1)
    .max(24),
  locale: z.string().max(12).optional(),
});

const SYSTEM_PROMPT = `You are the Egyptora Hub AI Concierge — the travel assistant of Egyptora Hub, a national digital gateway to Egypt.

Scope: travel planning in Egypt (itineraries, destinations, the 27 governorates, heritage sites, museums, Nile cruises, Red Sea stays, food, culture, seasons and weather, transport, general visitor guidance).
Style: warm, concise, practical. Prefer short paragraphs and compact bullet lists. Give concrete day-by-day plans when an itinerary is requested.
Language: always reply in the same language the traveller writes in (Arabic answers in Arabic, English in English, etc.).

Hard rules:
- You are an AI system, not a human agent and not a government official.
- Never give legal, medical, visa-eligibility, or investment advice, and never present yourself as an official source. Point users to the official authorities for visa, entry, health and emergency matters.
- For emergencies, tell the user to contact the official emergency services immediately.
- Do not invent prices, availability, bookings or opening hours as facts; say they must be confirmed with the provider or official site.
- Politely decline anything outside travel and culture in Egypt.

Grounding in real site content:
- You have no reliable memory of what exists on Egyptora Hub. The ONLY way to know is the search_site_content tool.
- Before naming any specific place, hotel, museum, heritage site, event or offer — and ALWAYS before writing an itinerary — call search_site_content. For a multi-city or multi-day plan, call it once per city/category (e.g. "Luxor" with category heritage_sites, then "Cairo" with category museums) before you write anything.
- Never name a place you did not see in a tool result in this conversation, even if you are sure it exists.
- Only recommend entries the tool actually returned. Do not invent place names, slugs or entries that are not in the results.
- If the tool returns nothing relevant, say plainly that the hub has no matching entry yet, and answer with general guidance instead of inventing a name.
- General questions (weather, seasons, culture, packing, transport in general) do not need a tool call — answer them directly.

Itinerary format:
- When you propose a day-by-day plan, append a single fenced block at the very end of your reply, exactly in this form:
\`\`\`itinerary
[{"day":1,"name":"...","slug":"...","type":"museum","summary":"one short line"}]
\`\`\`
- "type" must be one of: ${CONCIERGE_TABLES.join(", ")}. "name" and "slug" must be copied verbatim from the tool results — never invented.
- Keep the prose around it short: a one or two line intro before the block, and optionally a brief closing line. Do not repeat the same items as a long bullet list in the prose.`;

export const Route = createFileRoute("/api/concierge")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return Response.json(
            { error: "The AI Concierge is not configured yet." },
            { status: 500 },
          );
        }

        let parsed;
        try {
          parsed = bodySchema.parse(await request.json());
        } catch {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }

        const gateway = createLovableAiGatewayProvider(
          apiKey,
          getLovableAiGatewayRunId(request),
        );

        // Everything the read-only search actually returned this request, so the
        // itinerary block can be filtered down to genuinely existing entries.
        const grounded = new Map<
          string,
          { id: string; name: string; slug: string; type: string }
        >();

        try {
          const result = streamText({
            model: gateway(MODEL),
            system: SYSTEM_PROMPT,
            messages: parsed.messages,
            stopWhen: stepCountIs(6),
            tools: {
              search_site_content: tool({
                description:
                  "Search Egyptora Hub's real published content (governorates, destinations, heritage sites, museums, events, properties, offers). Returns only name, slug, type and a one-line summary. Read-only.",
                inputSchema: z.object({
                  query: z.string().min(2).max(120).describe("Free-text search, e.g. 'Luxor temple'"),
                  category: z
                    .enum(CONCIERGE_TABLES)
                    .optional()
                    .describe("Optional catalogue to restrict the search to"),
                }),
                execute: async ({ query, category }) => {
                  const matches = await searchSiteContent(query, category);
                  for (const m of matches) {
                    grounded.set(`${m.type}:${m.slug}`, {
                      id: m.id,
                      name: m.name,
                      slug: m.slug,
                      type: m.type,
                    });
                  }
                  // Keep the model payload free of internal ids.
                  return {
                    matches: matches.map(({ id: _id, ...rest }) => rest),
                  };
                },
              }),
            },
            onError: ({ error }) => console.error("[concierge] stream error", error),
          });
          const encoder = new TextEncoder();
          const stream = new ReadableStream<Uint8Array>({
            async start(controller) {
              let buffer = "";
              let inBlock = false;
              try {
                for await (const chunk of result.textStream) {
                  buffer += chunk;
                  if (inBlock) continue;
                  const idx = buffer.indexOf("```itinerary");
                  if (idx !== -1) {
                    const prose = buffer.slice(0, idx);
                    if (prose) controller.enqueue(encoder.encode(prose));
                    buffer = buffer.slice(idx);
                    inBlock = true;
                    continue;
                  }
                  // Hold back a short tail that could be a partial fence marker.
                  const keep = Math.min(buffer.length, 12);
                  const emit = buffer.slice(0, buffer.length - keep);
                  buffer = buffer.slice(buffer.length - keep);
                  if (emit) controller.enqueue(encoder.encode(emit));
                }

                if (!inBlock) {
                  if (buffer) controller.enqueue(encoder.encode(buffer));
                } else {
                  const match = /```itinerary\s*([\s\S]*?)```/.exec(buffer);
                  let raw: unknown[] = [];
                  try {
                    const parsedBlock: unknown = JSON.parse((match?.[1] ?? "").trim());
                    if (Array.isArray(parsedBlock)) raw = parsedBlock;
                  } catch {
                    raw = [];
                  }
                  // Only keep items the read-only search actually returned.
                  const items = raw
                    .map((entry) => {
                      const row = entry as {
                        day?: unknown;
                        slug?: unknown;
                        type?: unknown;
                        summary?: unknown;
                      };
                      const slug = typeof row.slug === "string" ? row.slug : "";
                      const hit =
                        grounded.get(`${String(row.type)}:${slug}`) ??
                        [...grounded.values()].find((g) => g.slug === slug);
                      if (!hit) return null;
                      return {
                        ...(typeof row.day === "number" ? { day: row.day } : {}),
                        name: hit.name,
                        slug: hit.slug,
                        type: hit.type,
                        summary: typeof row.summary === "string" ? row.summary : "",
                      };
                    })
                    .filter((item): item is NonNullable<typeof item> => item !== null);

                  if (items.length > 0) {
                    controller.enqueue(
                      encoder.encode(`\n\`\`\`itinerary\n${JSON.stringify(items)}\n\`\`\``),
                    );
                  }
                }
              } catch (streamError) {
                console.error("[concierge] stream failed", streamError);
              } finally {
                controller.close();
              }
            },
          });

          return new Response(stream, {
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "cache-control": "no-store",
            },
          });
        } catch (error) {
          const status =
            typeof error === "object" && error !== null && "statusCode" in error
              ? Number((error as { statusCode: unknown }).statusCode)
              : 500;
          const message =
            status === 429
              ? "The concierge is busy right now — please try again in a moment."
              : status === 402
                ? "The AI Concierge is temporarily unavailable (usage limit reached)."
                : "The concierge could not answer right now. Please try again.";
          console.error("[concierge] request failed", error);
          return Response.json({ error: message }, { status: status || 500 });
        }
      },
    },
  },
});
