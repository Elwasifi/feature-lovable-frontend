import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { checkRole } from "@/lib/roles.functions";

export const CRM_STAGES = ["new", "contacted", "negotiating", "closed", "lost"] as const;
export const CRM_PRIORITIES = ["low", "medium", "high"] as const;

export type CrmItemType = "property" | "investment_opportunity";
export type CrmStage = (typeof CRM_STAGES)[number];
export type CrmPriority = (typeof CRM_PRIORITIES)[number];

export type CrmRow = {
  id: string;
  name: string;
  subtitle: string | null;
  stage: CrmStage;
  priority: CrmPriority;
  assignedTo: string | null;
  updatedAt: string | null;
};

export type CrmNote = {
  id: string;
  note: string;
  createdAt: string;
  createdBy: string | null;
  createdByEmail: string | null;
};

export type CrmStaff = { id: string; email: string | null };

export type Denied = { authorized: false };
export type Ok<T> = { authorized: true } & T;

const TABLE: Record<CrmItemType, "properties" | "investment_opportunities"> = {
  property: "properties",
  investment_opportunity: "investment_opportunities",
};

function validType(value: unknown): CrmItemType {
  if (value !== "property" && value !== "investment_opportunity") throw new Error("Unknown item type");
  return value;
}

/** Admin passes every CRM check; otherwise the role must match the item type. */
async function canAccess(context: { supabase: any; userId: string }, itemType: CrmItemType) {
  if (await checkRole(context, "admin")) return true;
  return checkRole(context, itemType === "property" ? "crm_properties" : "crm_investment");
}

async function emailsFor(ids: string[]): Promise<Map<string, string | null>> {
  const map = new Map<string, string | null>();
  const unique = Array.from(new Set(ids.filter(Boolean)));
  if (unique.length === 0) return map;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await Promise.all(
    unique.map(async (id) => {
      try {
        const { data } = await supabaseAdmin.auth.admin.getUserById(id);
        map.set(id, data?.user?.email ?? null);
      } catch {
        map.set(id, null);
      }
    }),
  );
  return map;
}

/** CRM list for one item type: underlying rows joined with their pipeline entry. */
export const listCrmItems = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { itemType: CrmItemType }) => ({ itemType: validType(input?.itemType) }))
  .handler(
    async ({ data, context }): Promise<Denied | Ok<{ rows: CrmRow[]; staff: CrmStaff[] }>> => {
      if (!(await canAccess(context, data.itemType))) return { authorized: false };
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      const table = TABLE[data.itemType];
      const cols =
        data.itemType === "property"
          ? "id, name, city, property_type"
          : "id, name, sector, stage";

      const [{ data: items }, { data: pipeline }] = await Promise.all([
        supabaseAdmin.from(table as any).select(cols).order("name"),
        supabaseAdmin
          .from("crm_pipeline")
          .select("item_id, stage, priority, assigned_to, updated_at")
          .eq("item_type", data.itemType),
      ]);

      const byId = new Map(
        ((pipeline ?? []) as any[]).map((p) => [String(p.item_id), p] as const),
      );

      const rows: CrmRow[] = ((items ?? []) as any[]).map((row) => {
        const p = byId.get(String(row.id));
        return {
          id: String(row.id),
          name: String(row.name ?? row.id),
          subtitle:
            data.itemType === "property"
              ? [row.property_type, row.city].filter(Boolean).join(" · ") || null
              : [row.sector, row.stage].filter(Boolean).join(" · ") || null,
          stage: (p?.stage ?? "new") as CrmStage,
          priority: (p?.priority ?? "medium") as CrmPriority,
          assignedTo: p?.assigned_to ?? null,
          updatedAt: p?.updated_at ?? null,
        };
      });

      const { data: roleRows } = await supabaseAdmin.from("user_roles").select("user_id, role");
      const staffIds = Array.from(new Set(((roleRows ?? []) as any[]).map((r) => String(r.user_id))));
      const emails = await emailsFor(staffIds);
      const staff: CrmStaff[] = staffIds.map((id) => ({ id, email: emails.get(id) ?? null }));

      return { authorized: true, rows, staff };
    },
  );

/** Pipeline entry plus the full append-only activity log for one item. */
export const getCrmItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { itemType: CrmItemType; itemId: string }) => {
    if (!input?.itemId) throw new Error("Missing item");
    return { itemType: validType(input?.itemType), itemId: String(input.itemId) };
  })
  .handler(async ({ data, context }): Promise<Denied | Ok<{ notes: CrmNote[] }>> => {
    if (!(await canAccess(context, data.itemType))) return { authorized: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: log } = await supabaseAdmin
      .from("crm_activity_log")
      .select("id, note, created_at, created_by")
      .eq("item_type", data.itemType)
      .eq("item_id", data.itemId)
      .order("created_at", { ascending: false });

    const rows = (log ?? []) as any[];
    const emails = await emailsFor(rows.map((r) => String(r.created_by ?? "")));

    return {
      authorized: true,
      notes: rows.map((r) => ({
        id: String(r.id),
        note: String(r.note),
        createdAt: String(r.created_at),
        createdBy: r.created_by ?? null,
        createdByEmail: r.created_by ? (emails.get(String(r.created_by)) ?? null) : null,
      })),
    };
  });

/** Create or update the pipeline entry. Never touches the underlying content row. */
export const updateCrmPipeline = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (input: {
      itemType: CrmItemType;
      itemId: string;
      stage?: CrmStage;
      priority?: CrmPriority;
      assignedTo?: string | null;
    }) => {
      if (!input?.itemId) throw new Error("Missing item");
      if (input.stage && !CRM_STAGES.includes(input.stage)) throw new Error("Invalid stage");
      if (input.priority && !CRM_PRIORITIES.includes(input.priority))
        throw new Error("Invalid priority");
      return { ...input, itemType: validType(input?.itemType), itemId: String(input.itemId) };
    },
  )
  .handler(async ({ data, context }): Promise<Denied | Ok<{ ok: boolean; error?: string }>> => {
    if (!(await canAccess(context, data.itemType))) return { authorized: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const patch: Record<string, any> = {
      item_type: data.itemType,
      item_id: data.itemId,
      updated_at: new Date().toISOString(),
    };
    if (data.stage) patch["stage"] = data.stage;
    if (data.priority) patch["priority"] = data.priority;
    if (data.assignedTo !== undefined) patch["assigned_to"] = data.assignedTo || null;

    const { error } = await supabaseAdmin
      .from("crm_pipeline")
      .upsert(patch as any, { onConflict: "item_type,item_id" });
    if (error) return { authorized: true, ok: false, error: error.message };
    return { authorized: true, ok: true };
  });

/** Append one note. The log is never edited or deleted through the UI. */
export const addCrmNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { itemType: CrmItemType; itemId: string; note: string }) => {
    const note = String(input?.note ?? "").trim();
    if (!input?.itemId) throw new Error("Missing item");
    if (note.length < 1) throw new Error("Note is empty");
    if (note.length > 2000) throw new Error("Note is too long");
    return { itemType: validType(input?.itemType), itemId: String(input.itemId), note };
  })
  .handler(async ({ data, context }): Promise<Denied | Ok<{ ok: boolean; error?: string }>> => {
    if (!(await canAccess(context, data.itemType))) return { authorized: false };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("crm_activity_log").insert({
      item_type: data.itemType,
      item_id: data.itemId,
      note: data.note,
      created_by: context.userId,
    } as any);
    if (error) return { authorized: true, ok: false, error: error.message };
    return { authorized: true, ok: true };
  });
