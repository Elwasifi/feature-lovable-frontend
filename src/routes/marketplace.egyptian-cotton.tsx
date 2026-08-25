import { createFileRoute } from "@tanstack/react-router";
import { MarketplaceSection } from "@/components/site/MarketplaceSection";
import { marketplacePageBySlug } from "@/data/marketplace";
import { SITE } from "@/config/site";

const title = "Egyptian Cotton — certified mills, ateliers & visits | Egypt One";
const description =
  "Discover Egyptian cotton: Giza long-staple varieties, certified mills, bespoke tailoring and Delta cotton trails you can book as a visitor.";

export const Route = createFileRoute("/marketplace/egyptian-cotton")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/marketplace/egyptian-cotton` },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `${SITE.url}/og-image.jpg` },
      { name: "twitter:image", content: `${SITE.url}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/marketplace/egyptian-cotton` }],
  }),
  component: () => <MarketplaceSection page={marketplacePageBySlug["egyptian-cotton"]} />,
});
