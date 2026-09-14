/**
 * Read-only content search used to ground the AI Concierge in real site data.
 *
 * SECURITY: this helper touches ONLY the seven public, public-read catalogue
 * tables listed below. It never reads trips, bookings, user_roles, profiles or
 * any auth/personal data, and it only ever performs SELECTs.
 */

export const CONCIERGE_TABLES = [
  "governorates",
  "destinations",
  "heritage_sites",
  "museums",
  "events",
  "properties",
  "offers",
] as const;

export type ConciergeTable = (typeof CONCIERGE_TABLES)[number];

export type ConciergeMatch = {
  /** Display name of the entry. */
  name: string;
  /** Stable slug used to build the public link. */
  slug: string;
  /** Which catalogue the entry comes from. */
  type: ConciergeTable;
  /** One-line summary (truncated) — never the full description. */
  summary: string;
};

const MAX_SUMMARY = 160;

function oneLine(value: unknown): string {
  if (typeof value !== "string") return "";
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > MAX_SUMMARY ? `${clean.slice(0, MAX_SUMMARY - 1)}…` : clean;
}

/**
 * Searches the seven public catalogue tables and returns compact matches
 * (name / slug / type / summary only) to keep the token payload small.
 */
export async function searchSiteContent(
  query: string,
  category?: ConciergeTable,
  limit = 6,
): Promise<ConciergeMatch[]> {
  const term = query.replace(/[%,()]/g, " ").trim();
  if (!term) return [];

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const tables = category ? [category] : [...CONCIERGE_TABLES];
  const perTable = category ? limit : Math.max(2, Math.ceil(limit / 2));

  const results = await Promise.all(
    tables.map(async (table) => {
      try {
        let q = supabaseAdmin
          .from(table)
          .select("name, slug, summary")
          .or(`name.ilike.%${term}%,summary.ilike.%${term}%`);
        // Never surface content that is still awaiting review.
        if (table === "properties") q = q.eq("moderation_state", "PUBLISHED");
        const { data, error } = await q.limit(perTable);
        if (error) throw error;
        return (data ?? []).map((row) => ({
          name: String((row as { name?: string }).name ?? ""),
          slug: String((row as { slug?: string }).slug ?? ""),
          type: table,
          summary: oneLine((row as { summary?: string }).summary),
        })) as ConciergeMatch[];
      } catch (err) {
        console.error(`[concierge-search] ${table} lookup failed:`, err);
        return [] as ConciergeMatch[];
      }
    }),
  );

  return results.flat().filter((m) => m.name && m.slug).slice(0, limit * 2);
}
