import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { checkRole } from "@/lib/roles.functions";

/**
 * Read-only government oversight dashboard.
 * Every query in this module is a plain SELECT — nothing here writes to any table.
 */

/** Exact list of public tables carrying a `governance_status` column. */
export const GOVERNANCE_TABLES = [
  "governorates",
  "destinations",
  "heritage_sites",
  "museums",
  "events",
  "eras",
  "rulers",
  "heritage_worldwide",
  "research_programs",
  "traveller_stories",
  "properties",
  "products",
  "offers",
  "countries",
  "investment_opportunities",
  "providers",
] as const;

export type GovernanceTable = (typeof GOVERNANCE_TABLES)[number];

export const GOVERNANCE_TABLE_LABEL: Record<GovernanceTable, string> = {
  governorates: "Governorates",
  destinations: "Destinations",
  heritage_sites: "Heritage sites",
  museums: "Museums",
  events: "Events",
  eras: "Eras",
  rulers: "Rulers",
  heritage_worldwide: "Heritage held abroad",
  research_programs: "Research programmes",
  traveller_stories: "Traveller stories",
  properties: "Properties",
  products: "Products",
  offers: "Offers",
  countries: "Countries",
  investment_opportunities: "Investment opportunities",
  providers: "Providers",
};

export const GOVERNANCE_STATUSES = ["PUBLIC_CONTENT", "PENDING_GOVERNMENT_LINK", "LIVE"] as const;

export type GovernanceRow = {
  table: GovernanceTable;
  id: string;
  name: string;
  status: string;
  /** public page for this item, when one exists */
  href: string | null;
};

export type GovernanceSummaryRow = {
  table: GovernanceTable;
  counts: Record<string, number>;
  total: number;
};

export type GovernmentDashboard =
  | { authorized: false }
  | { authorized: true; summary: GovernanceSummaryRow[]; pending: GovernanceRow[] };

/** eras uses `key` as its primary key; everything else uses `id`. */
function pkColumn(table: GovernanceTable): string {
  return table === "eras" ? "key" : "id";
}

function publicHref(table: GovernanceTable, id: string): string | null {
  switch (table) {
    case "properties":
      return `/properties/${id}`;
    case "investment_opportunities":
      return `/investment-opportunities/${id}`;
    case "providers":
      return `/providers/${id}`;
    case "products":
      return `/products/${id}`;
    case "offers":
      return `/offers/${id}`;
    case "countries":
      return `/countries/${id}`;
    case "governorates":
      return `/governorates/${id}`;
    case "heritage_sites":
      return "/heritage-sites";
    case "museums":
      return "/museums";
    case "events":
      return "/events";
    case "research_programs":
      return "/research-programs";
    case "traveller_stories":
      return "/traveler-stories";
    case "heritage_worldwide":
      return "/egyptian-heritage-worldwide";
    default:
      return null;
  }
}

export const getGovernmentDashboard = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<GovernmentDashboard> => {
    const [admin, viewer] = await Promise.all([
      checkRole(context, "admin"),
      checkRole(context, "government_viewer"),
    ]);
    if (!admin && !viewer) return { authorized: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const summary: GovernanceSummaryRow[] = [];
    const pending: GovernanceRow[] = [];

    for (const table of GOVERNANCE_TABLES) {
      const pk = pkColumn(table);
      try {
        const { data, error } = await (supabaseAdmin.from(table) as any)
          .select(`${pk}, name, governance_status`)
          .limit(5000);
        if (error) throw error;

        const rows = (data ?? []) as Array<Record<string, unknown>>;
        const counts: Record<string, number> = {};
        for (const raw of rows) {
          const status = String(raw["governance_status"] ?? "PUBLIC_CONTENT");
          counts[status] = (counts[status] ?? 0) + 1;
          if (status === "PENDING_GOVERNMENT_LINK") {
            const id = String(raw[pk] ?? "");
            pending.push({
              table,
              id,
              name: String(raw["name"] ?? id),
              status,
              href: id ? publicHref(table, id) : null,
            });
          }
        }
        summary.push({
          table,
          counts,
          total: rows.length,
        });
      } catch (err) {
        console.error(`[government] failed to read ${table}:`, err);
        summary.push({ table, counts: {}, total: 0 });
      }
    }

    pending.sort((a, b) => a.table.localeCompare(b.table) || a.name.localeCompare(b.name));
    return { authorized: true, summary, pending };
  });
