import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CONTENT_TABLES = [
  "properties",
  "providers",
  "offers",
  "investment_opportunities",
  "countries",
  "products",
  "events",
  "heritage_sites",
  "museums",
  "governorates",
] as const;

export type AdminStats = {
  users: number;
  trips: number;
  bookings: { pending: number; confirmed: number; cancelled: number; other: number; total: number };
  content: { table: string; count: number }[];
};

export type AdminStatsResult =
  | { authorized: false }
  | { authorized: true; stats: AdminStats };

/** Admin-only dashboard counts. Returns { authorized: false } for non-admins. */
export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminStatsResult> => {
    const { data: isAdmin, error } = await context.supabase.rpc("has_role", {
      check_user_id: context.userId,
      check_role: "admin",
    });
    if (error || isAdmin !== true) return { authorized: false };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const count = async (table: string, apply?: (q: any) => any) => {
      let q = supabaseAdmin.from(table as never).select("*", { count: "exact", head: true });
      if (apply) q = apply(q);
      const { count: c } = await q;
      return c ?? 0;
    };

    const [trips, pending, confirmed, cancelled, totalBookings] = await Promise.all([
      count("trips"),
      count("bookings", (q) => q.eq("status", "pending")),
      count("bookings", (q) => q.eq("status", "confirmed")),
      count("bookings", (q) => q.eq("status", "cancelled")),
      count("bookings"),
    ]);

    const content = await Promise.all(
      CONTENT_TABLES.map(async (table) => ({ table, count: await count(table) })),
    );

    let users = 0;
    try {
      const { data } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 });
      users = (data as { total?: number } | null)?.total ?? data?.users?.length ?? 0;
    } catch {
      users = 0;
    }

    return {
      users,
      trips,
      bookings: {
        pending,
        confirmed,
        cancelled,
        other: Math.max(totalBookings - pending - confirmed - cancelled, 0),
        total: totalBookings,
      },
      content,
    };
  });
