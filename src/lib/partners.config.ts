/**
 * Explicit allowlist of the fields a partner may edit, per item type.
 *
 * A partner can never write a column that is not listed here — not governance
 * columns, not the slug, and never moderation_state (the save function always
 * force-sets that to IN_REVIEW).
 */

import type { FieldConfig } from "@/lib/admin-content.config";

export const PARTNER_ITEM_TYPES = ["property", "investment_opportunity"] as const;
export type PartnerItemType = (typeof PARTNER_ITEM_TYPES)[number];

export type PartnerItemConfig = {
  itemType: PartnerItemType;
  table: "properties" | "investment_opportunities";
  pk: "id";
  label: string;
  displayColumn: "name";
  fields: FieldConfig[];
};

const text = (name: string): FieldConfig => ({ name, type: "text" });
const area = (name: string): FieldConfig => ({ name, type: "textarea" });
const num = (name: string): FieldConfig => ({ name, type: "number" });

export const PARTNER_ITEMS: Record<PartnerItemType, PartnerItemConfig> = {
  property: {
    itemType: "property",
    table: "properties",
    pk: "id",
    label: "Property",
    displayColumn: "name",
    fields: [
      text("name"),
      text("property_type"),
      num("price_usd"),
      num("area_m2"),
      text("city"),
      area("summary"),
      area("description"),
      { name: "images", type: "images" },
      { name: "tags", type: "tags" },
    ],
  },
  investment_opportunity: {
    itemType: "investment_opportunity",
    table: "investment_opportunities",
    pk: "id",
    label: "Investment opportunity",
    displayColumn: "name",
    fields: [
      text("name"),
      text("sector"),
      text("stage"),
      num("investment_min_usd"),
      num("investment_max_usd"),
      num("land_requirement_ha"),
      text("competent_entity"),
      area("summary"),
      area("description"),
    ],
  },
};

export function getPartnerItemConfig(itemType: string | undefined): PartnerItemConfig | undefined {
  if (!itemType) return undefined;
  return (PARTNER_ITEMS as Record<string, PartnerItemConfig>)[itemType];
}

export const MODERATION_LABEL: Record<string, string> = {
  IN_REVIEW: "In review",
  PUBLISHED: "Published",
};
