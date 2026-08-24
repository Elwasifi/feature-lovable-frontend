import { createFileRoute } from "@tanstack/react-router";
import { MarketplaceSection } from "@/components/site/MarketplaceSection";
import { marketplacePageBySlug } from "@/data/marketplace";
import { SITE } from "@/config/site";

const title = "Handmade Crafts — artisans across 27 governorates | Egypt One";
const description =
  "Copper, pottery, glass, kilim and khayamiya: meet Egyptian artisans, book workshop visits and buy handmade crafts at fair, published prices.";

export const Route = createFileRoute("/marketplace/handmade-crafts")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/marketplace/handmade-crafts` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/marketplace/handmade-crafts` }],
  }),
  component: () => <MarketplaceSection page={marketplacePageBySlug["handmade-crafts"]} />,
});
