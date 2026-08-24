import { createFileRoute } from "@tanstack/react-router";
import { MarketplaceSection } from "@/components/site/MarketplaceSection";
import { marketplacePageBySlug } from "@/data/marketplace";
import { SITE } from "@/config/site";

const title = "Wear Egypt — modern Egyptian design, ancient roots | Egypt One";
const description =
  "Contemporary Egyptian fashion labels reworking pharaonic and Coptic motifs: designer directory, concept stores and made-to-order tailoring.";

export const Route = createFileRoute("/marketplace/wear-egypt")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/marketplace/wear-egypt` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/marketplace/wear-egypt` }],
  }),
  component: () => <MarketplaceSection page={marketplacePageBySlug["wear-egypt"]} />,
});
