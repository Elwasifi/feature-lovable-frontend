import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { EgyptMap } from "@/components/site/EgyptMap";
import { governorates } from "@/data/governorates";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";

const title = "The 27 Governorates of Egypt | Egyptora Hub";
const description = "Explore all 27 governorates of Egypt on one interactive map — capitals, landmarks, investment, real estate and services.";

export const Route = createFileRoute("/governorates/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${SITE.url}/governorates` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/governorates` }],
  }),
  component: GovernoratesPage,
});

function GovernoratesPage() {
  const { t } = useI18n();
  const sorted = [...governorates].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <>
    <SiteHeader />
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-navy lg:text-4xl">{t("The 27 Governorates of Egypt")}</h1>
      <p className="mt-2 max-w-2xl text-text-body">{t("Pick a governorate on the map or from the list to see its places, events, investment, real estate and services.")}</p>
      <div className="mt-8"><EgyptMap /></div>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {sorted.map((g) => (
          <li key={g.id}>
            <Link
              to="/governorates/$id"
              params={{ id: g.id }}
              className="block rounded-[10px] border border-border bg-card p-3 hover:border-primary"
            >
              <span className="block font-semibold text-navy">{t(g.name)}</span>
              <span className="block text-xs text-muted-foreground">{t(g.region)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
    <SiteFooter />
    </>
  );
}
