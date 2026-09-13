import { supabase } from "@/integrations/supabase/client";

export type MarketplaceProduct = {
  id: string;
  name: string;
  governorate_slug: string;
  category: string | null;
  price_egp: number | null;
  maker: string | null;
  summary: string | null;
  images: string[] | null;
  tags: string[] | null;
  governance_status: string;
};

/**
 * Fetches the products that belong to one Made in Egypt collection.
 * Hardened: any failure resolves to an empty list so the page still renders.
 */
export async function loadCollectionProducts(collection: string): Promise<MarketplaceProduct[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, governorate_slug, category, price_egp, maker, summary, images, tags, governance_status",
      )
      .eq("collection", collection)
      .order("name", { ascending: true });

    if (error) {
      console.error("[marketplace] failed to load products", collection, error);
      return [];
    }
    return (data ?? []) as MarketplaceProduct[];
  } catch (err) {
    console.error("[marketplace] unexpected error loading products", collection, err);
    return [];
  }
}
