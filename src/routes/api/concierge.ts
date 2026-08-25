import { createFileRoute } from "@tanstack/react-router";
import { streamText } from "ai";
import { z } from "zod";

import {
  createLovableAiGatewayProvider,
  getLovableAiGatewayRunId,
} from "@/lib/ai-gateway.server";

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

const SYSTEM_PROMPT = `You are the Egypt One AI Concierge — the travel assistant of Egypt One, a national digital gateway to Egypt.

Scope: travel planning in Egypt (itineraries, destinations, the 27 governorates, heritage sites, museums, Nile cruises, Red Sea stays, food, culture, seasons and weather, transport, general visitor guidance).
Style: warm, concise, practical. Prefer short paragraphs and compact bullet lists. Give concrete day-by-day plans when an itinerary is requested.
Language: always reply in the same language the traveller writes in (Arabic answers in Arabic, English in English, etc.).

Hard rules:
- You are an AI system, not a human agent and not a government official.
- Never give legal, medical, visa-eligibility, or investment advice, and never present yourself as an official source. Point users to the official authorities for visa, entry, health and emergency matters.
- For emergencies, tell the user to contact the official emergency services immediately.
- Do not invent prices, availability, bookings or opening hours as facts; say they must be confirmed with the provider or official site.
- Politely decline anything outside travel and culture in Egypt.`;

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

        try {
          const result = streamText({
            model: gateway(MODEL),
            system: SYSTEM_PROMPT,
            messages: parsed.messages,
            onError: ({ error }) => console.error("[concierge] stream error", error),
          });
          return result.toTextStreamResponse();
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
