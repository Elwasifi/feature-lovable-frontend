import { createFileRoute } from "@tanstack/react-router";
import { MarketplaceSection } from "@/components/site/MarketplaceSection";
import { marketplacePageBySlug } from "@/data/marketplace";
import { SITE } from "@/config/site";

const title = "Local Producers — farms, spices & Nile harvests | Egypt One";
const description =
  "Siwa dates, Aswan hibiscus, olive oil and desert honey straight from Egyptian farms: harvest calendar, tasting rooms and export-ready gift packs.";

export const Route = createFileRoute("/marketplace/local-producers")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/marketplace/local-producers` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/marketplace/local-producers` }],
  }),
  component: () => <MarketplaceSection page={marketplacePageBySlug["local-producers"]} />,
});
