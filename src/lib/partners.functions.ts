import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { coerceFieldValue } from "@/lib/admin-content.config";
import { getPartnerItemConfig, type PartnerItemType } from "@/lib/partners.config";

export type Denied = { authorized: false };
export type Ok<T> = { authorized: true } & T;

export type PartnerProfile = {
  id: string;
  orgName: string;
  partnerType: string;
  contactEmail: string | null;
};

export type PartnerAssignedItem = {
  itemType: PartnerItemType;
  itemId: string;
  name: string;
  moderationState: string;
  lastSubmittedAt: string | null;
};

/** Resolves the signed-in user's ACTIVE partner row, or null. */
async function getActivePartner(userId: string): Promise<PartnerProfile | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("partners")
    .select("id, org_name, partner_type, contact_email, active")
    .eq("user_id", userId)
    .eq("active", true)
    .maybeSingle();
  if (!data) return null;
  const row = data as any;
  return {
    id: String(row.id),
    orgName: String(row.org_name),
    partnerType: String(row.partner_type),
    contactEmail: row.contact_email ?? null,
  };
}

async function isAssigned(partnerId: string, itemType: PartnerItemType, itemId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("partner_assignments")
    .select("id")
    .eq("partner_id", partnerId)
    .eq("item_type", itemType)
    .eq("item_id", itemId)
    .maybeSingle();
  return !!data;
}

/** Portal home: the partner and only the items assigned to them. */
export const getPartnerPortal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(
    async ({
      context,
    }): Promise<Denied | Ok<{ partner: PartnerProfile; items: PartnerAssignedItem[] }>> => {
      const partner = await getActivePartner(context.userId);
      if (!partner) return { authorized: false };
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

      const { data: assignments } = await supabaseAdmin
        .from("partner_assignments")
        .select("item_type, item_id")
        .eq("partner_id", partner.id);

      const rows = (assignments ?? []) as { item_type: string; item_id: string }[];
      const items: PartnerAssignedItem[] = [];

      for (const type of ["property", "investment_opportunity"] as PartnerItemType[]) {
        const ids = rows.filter((r) => r.item_type === type).map((r) => r.item_id);
        if (ids.length === 0) continue;
        const cfg = getPartnerItemConfig(type)!;
        const { data: found } = await supabaseAdmin
          .from(cfg.table as any)
          .select("id, name, moderation_state, last_submitted_at")
          .in("id", ids);
        for (const row of (found ?? []) as any[]) {
          items.push({
            itemType: type,
            itemId: String(row.id),
            name: String(row.name ?? row.id),
            moderationState: String(row.moderation_state ?? "PUBLISHED"),
            lastSubmittedAt: row.last_submitted_at ?? null,
          });
        }
      }

      items.sort((a, b) => a.name.localeCompare(b.name));
      return { authorized: true, partner, items };
    },
  );

/** One assigned item, restricted to the allowlisted fields. */
export const getPartnerItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { itemType: PartnerItemType; itemId: string }) => {
    if (!getPartnerItemConfig(input?.itemType)) throw new Error("Unknown item type");
    if (!input?.itemId) throw new Error("Missing item");
    return { itemType: input.itemType, itemId: String(input.itemId) };
  })
  .handler(
    async ({
      data,
      context,
    }): Promise<
      Denied | Ok<{ values: Record<string, any>; moderationState: string; name: string }>
    > => {
      const partner = await getActivePartner(context.userId);
      if (!partner) return { authorized: false };
      if (!(await isAssigned(partner.id, data.itemType, data.itemId))) return { authorized: false };

      const cfg = getPartnerItemConfig(data.itemType)!;
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data: row } = await supabaseAdmin
        .from(cfg.table as any)
        .select("*")
        .eq("id", data.itemId)
        .maybeSingle();
      if (!row) return { authorized: false };

      const source = row as Record<string, any>;
      const values: Record<string, any> = {};
      for (const field of cfg.fields) values[field.name] = source[field.name] ?? null;

      return {
        authorized: true,
        values,
        name: String(source["name"] ?? data.itemId),
        moderationState: String(source["moderation_state"] ?? "PUBLISHED"),
      };
    },
  );

/**
 * Partner save. Writes only allowlisted fields and ALWAYS force-sets
 * moderation_state = 'IN_REVIEW' — a partner can never publish their own content.
 */
export const savePartnerItem = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { itemType: PartnerItemType; itemId: string; values: Record<string, any> }) => {
    if (!getPartnerItemConfig(input?.itemType)) throw new Error("Unknown item type");
    if (!input?.itemId) throw new Error("Missing item");
    return { itemType: input.itemType, itemId: String(input.itemId), values: input.values ?? {} };
  })
  .handler(async ({ data, context }): Promise<Denied | Ok<{ ok: boolean; error?: string }>> => {
    const partner = await getActivePartner(context.userId);
    if (!partner) return { authorized: false };
    if (!(await isAssigned(partner.id, data.itemType, data.itemId))) return { authorized: false };

    const cfg = getPartnerItemConfig(data.itemType)!;
    const payload: Record<string, any> = {};
    try {
      for (const field of cfg.fields) {
        const value = coerceFieldValue(field, data.values?.[field.name]);
        if (value !== undefined) payload[field.name] = value;
      }
    } catch (err) {
      return { authorized: true, ok: false, error: (err as Error).message };
    }

    // Forced, never taken from the request.
    payload["moderation_state"] = "IN_REVIEW";
    payload["last_submitted_at"] = new Date().toISOString();
    payload["updated_at"] = new Date().toISOString();

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from(cfg.table as any)
      .update(payload as any)
      .eq("id", data.itemId);
    if (error) return { authorized: true, ok: false, error: error.message };
    return { authorized: true, ok: true };
  });
