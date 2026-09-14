import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminBooking = {
  id: string;
  user_id: string;
  trip_id: string | null;
  trip_item_id: string | null;
  item_type: string;
  item_id: string;
  item_name: string | null;
  status: string;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  amount: number | null;
  currency: string | null;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  paid_at: string | null;
  requested_at: string;
};

export type AdminBookingsPage = {
  rows: AdminBooking[];
  total: number;
  page: number;
  pageSize: number;
  itemTypes: string[];
};

export type AdminBookingsResult =
  | { authorized: false }
  | { authorized: true; data: AdminBookingsPage };

export type AdminBookingUpdateResult =
  | { authorized: false }
  | { authorized: true; ok: boolean; booking?: AdminBooking; error?: string };

const PAGE_SIZE = 20;

const ITEM_TABLES: Record<string, string> = {
  property: "properties",
  properties: "properties",
  offer: "offers",
  offers: "offers",
  investment: "investment_opportunities",
  investment_opportunity: "investment_opportunities",
  event: "events",
  events: "events",
  heritage_site: "heritage_sites",
  heritage: "heritage_sites",
  museum: "museums",
  museums: "museums",
  provider: "providers",
  providers: "providers",
  product: "products",
  products: "products",
};

async function isAdmin(context: { supabase: any; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    check_user_id: context.userId,
    check_role: "admin",
  });
  return !error && data === true;
}

/** Resolve display names for bookings missing item_name, by looking up the source table. */
async function withItemNames(admin: any, rows: AdminBooking[]): Promise<AdminBooking[]> {
  const missing = rows.filter((r) => !r.item_name);
  if (missing.length === 0) return rows;

  const byTable = new Map<string, Set<string>>();
  for (const row of missing) {
    const table = ITEM_TABLES[row.item_type];
    if (!table) continue;
    if (!byTable.has(table)) byTable.set(table, new Set());
    byTable.get(table)!.add(row.item_id);
  }

  const lookup = new Map<string, string>();
  await Promise.all(
    [...byTable.entries()].map(async ([table, ids]) => {
      try {
        const { data } = await admin.from(table).select("id, name").in("id", [...ids]);
        for (const rec of (data ?? []) as { id: string; name: string }[]) {
          lookup.set(`${table}:${rec.id}`, rec.name);
        }
      } catch {
        /* a missing source row just leaves the name blank */
      }
    }),
  );

  return rows.map((row) => {
    if (row.item_name) return row;
    const table = ITEM_TABLES[row.item_type];
    const name = table ? lookup.get(`${table}:${row.item_id}`) : undefined;
    return name ? { ...row, item_name: name } : row;
  });
}

/** Admin-only paginated booking list. Returns { authorized: false } for non-admins. */
export const listAdminBookings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { status?: string; itemType?: string; page?: number }) => input ?? {})
  .handler(async ({ data, context }): Promise<AdminBookingsResult> => {
    if (!(await isAdmin(context))) return { authorized: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const page = Math.max(1, Math.floor(data.page ?? 1));
    const from = (page - 1) * PAGE_SIZE;

    let query = supabaseAdmin
      .from("bookings")
      .select("*", { count: "exact" })
      .order("requested_at", { ascending: false })
      .range(from, from + PAGE_SIZE - 1);

    if (data.status && data.status !== "all") query = query.eq("status", data.status);
    if (data.itemType && data.itemType !== "all") query = query.eq("item_type", data.itemType);

    const { data: rows, count } = await query;

    const { data: typeRows } = await supabaseAdmin.from("bookings").select("item_type");
    const itemTypes = [
      ...new Set(((typeRows ?? []) as { item_type: string }[]).map((r) => r.item_type)),
    ].sort();

    const withNames = await withItemNames(supabaseAdmin, (rows ?? []) as AdminBooking[]);

    return {
      authorized: true,
      data: { rows: withNames, total: count ?? 0, page, pageSize: PAGE_SIZE, itemTypes },
    };
  });

/** Admin-only booking status change (pending | confirmed | cancelled). */
export const updateBookingStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: string }) => {
    if (!input?.id) throw new Error("Missing booking id");
    if (!["pending", "confirmed", "cancelled"].includes(input.status)) {
      throw new Error("Invalid status");
    }
    return input;
  })
  .handler(async ({ data, context }): Promise<AdminBookingUpdateResult> => {
    if (!(await isAdmin(context))) return { authorized: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("bookings")
      .update({ status: data.status })
      .eq("id", data.id)
      .select("*")
      .maybeSingle();

    if (error) return { authorized: true, ok: false, error: error.message };
    if (!row) return { authorized: true, ok: true };
    return { authorized: true, ok: true, booking: row as AdminBooking };
  });
