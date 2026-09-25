/**
 * Read-only content search used to ground the AI Concierge in real site data.
 *
 * SECURITY: this helper touches ONLY the public catalogue tables listed below.
 * It never reads trips, bookings, user_roles, profiles or any auth/personal
 * data, and it only ever performs SELECTs.
 */

/** Tables that can appear in the itinerary block (have detail pages). */
export const ITINERARY_TABLES = [
  "governorates",
  "destinations",
  "heritage_sites",
  "museums",
  "events",
  "properties",
  "offers",
] as const;

export const CONCIERGE_TABLES = [
  ...ITINERARY_TABLES,
  "government_entities",
  "investment_opportunities",
  "providers",
  "products",
] as const;

export type ConciergeTable = (typeof CONCIERGE_TABLES)[number];

export type ConciergeMatch = {
  id: string;
  name: string;
  slug: string;
  type: ConciergeTable;
  summary: string;
  /** Public link: official URL for government entities, site path otherwise. */
  link?: string;
  category?: string;
};

const MAX_SUMMARY = 160;
const SITE = "https://egyptora-hub.com";

function oneLine(value: unknown): string {
  if (typeof value !== "string") return "";
  const clean = value.replace(/\s+/g, " ").trim();
  return clean.length > MAX_SUMMARY ? `${clean.slice(0, MAX_SUMMARY - 1)}…` : clean;
}

const DETAIL_PATH: Partial<Record<ConciergeTable, string>> = {
  governorates: "/governorates",
  heritage_sites: "/heritage-sites",
  museums: "/museums",
  events: "/events",
  properties: "/properties",
  offers: "/offers",
  investment_opportunities: "/investment-opportunities",
  providers: "/providers",
  products: "/products",
};

async function searchGovernment(term: string, limit: number): Promise<ConciergeMatch[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("government_entities")
    .select("id, entity_name_en, entity_name_ar, description_en, category_en, official_url")
    .or(
      `entity_name_en.ilike.%${term}%,entity_name_ar.ilike.%${term}%,description_en.ilike.%${term}%,category_en.ilike.%${term}%`,
    )
    .order("sort_order")
    .limit(limit);
  if (error) throw error;
  return (data ?? []).map((e) => ({
    id: String(e.id),
    name: e.entity_name_en,
    slug: String(e.id),
    type: "government_entities" as const,
    summary: oneLine(e.description_en),
    category: e.category_en,
    link: e.official_url || `${SITE}/government-directory`,
  }));
}

export async function searchSiteContent(
  query: string,
  category?: ConciergeTable,
  limit = 6,
): Promise<ConciergeMatch[]> {
  const term = query.replace(/[%,()]/g, " ").trim();
  if (!term) return [];

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const tables = category ? [category] : [...CONCIERGE_TABLES];
  const perTable = category ? limit : 2;

  const results = await Promise.all(
    tables.map(async (table) => {
      try {
        if (table === "government_entities") return await searchGovernment(term, perTable);
        let q = (supabaseAdmin.from(table) as any)
          .select("id, name, slug, summary")
          .or(`name.ilike.%${term}%,summary.ilike.%${term}%`);
        if (table === "properties" || table === "investment_opportunities") {
          q = q.eq("moderation_state", "PUBLISHED");
        }
        const { data, error } = await q.limit(perTable);
        if (error) throw error;
        return ((data ?? []) as Array<Record<string, unknown>>).map((row) => {
          const id = String(row.id ?? "");
          const base = DETAIL_PATH[table];
          return {
            id,
            name: String(row.name ?? ""),
            slug: String(row.slug ?? ""),
            type: table,
            summary: oneLine(row.summary),
            ...(base ? { link: `${SITE}${base}/${id}` } : {}),
          } as ConciergeMatch;
        });
      } catch (err) {
        console.error(`[concierge-search] ${table} lookup failed:`, err);
        return [] as ConciergeMatch[];
      }
    }),
  );

  return results.flat().filter((m) => m.name && m.slug).slice(0, Math.max(limit * 2, 16));
}
