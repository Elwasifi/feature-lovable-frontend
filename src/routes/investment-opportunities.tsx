import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Landmark, MapPin, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeader, SourceBadge } from "@/components/site/Primitives";
import { GovernanceBanner, type GovernanceStatus } from "@/components/site/GovernanceBanner";
import { governorates } from "@/data/governorates";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type InvestmentOpportunity = {
  id: string;
  slug: string;
  name: string;
  sector: string | null;
  governorate_slug: string | null;
  stage: string | null;
  investment_min_usd: number | null;
  investment_max_usd: number | null;
  competent_entity: string | null;
  summary: string | null;
  governance_status: GovernanceStatus;
};

const title = "Investment Opportunities in Egypt | Egypt One";
const description =
  "Sector-by-sector investment opportunities across Egypt's governorates — projects, land and partnerships open to investors.";

export const Route = createFileRoute("/investment-opportunities")({
  loader: async () => {
    const { data, error } = await supabase
      .from("investment_opportunities")
      .select(
        "id, slug, name, sector, governorate_slug, stage, investment_min_usd, investment_max_usd, competent_entity, summary, governance_status",
      )
      .order("name");

    if (error) {
      console.error(
        "[investment-opportunities] failed to load investment_opportunities:",
        error.message,
      );
    }
    return { opportunities: (data ?? []) as InvestmentOpportunity[] };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/investment-opportunities` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/investment-opportunities` }],
  }),
  component: InvestmentOpportunitiesPage,
});

const govName = (slug: string) => governorates.find((g) => g.id === slug)?.name ?? slug;

function formatRange(min: number | null, max: number | null, lang: string) {
  const locale = lang === "ar" ? "ar-EG" : "en-US";
  const fmt = (n: number) => `$${n.toLocaleString(locale, { maximumFractionDigits: 0 })}`;
  if (min !== null && max !== null) return `${fmt(min)} – ${fmt(max)}`;
  if (min !== null) return `${fmt(min)}+`;
  if (max !== null) return `≤ ${fmt(max)}`;
  return null;
}

function InvestmentOpportunitiesPage() {
  const { opportunities } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const [sector, setSector] = useState<string | null>(null);

  const sectors = useMemo(
    () =>
      Array.from(
        new Set(opportunities.map((o) => o.sector).filter((v): v is string => !!v)),
      ).sort(),
    [opportunities],
  );
  const filtered = sector ? opportunities.filter((o) => o.sector === sector) : opportunities;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Section>
        <SectionHeader
          eyebrow="Invest & business"
          title="Investment opportunities"
          description="Sector-by-sector projects and opportunities across Egypt's governorates, open to investors."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSector(null)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              sector === null
                ? "border-gold-line bg-gold-soft text-gold"
                : "border-border/60 text-muted-foreground hover:border-gold-line hover:text-gold",
            )}
          >
            {t("All sectors")}
          </button>
          {sectors.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSector(s)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                sector === s
                  ? "border-gold-line bg-gold-soft text-gold"
                  : "border-border/60 text-muted-foreground hover:border-gold-line hover:text-gold",
              )}
            >
              {t(s)}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((opp) => (
              <article
                key={opp.id}
                className="rounded-2xl border border-border/60 bg-card/60 p-5 transition-colors hover:border-gold-line"
              >
                <GovernanceBanner status={opp.governance_status} className="mb-3" />
                <div className="flex items-start justify-between gap-3">
                  <h2 className="flex items-center gap-2 font-display text-base text-foreground">
                    <Landmark className="size-4 shrink-0 text-gold" />
                    {t(opp.name)}
                  </h2>
                  <SourceBadge status="DEMO" />
                </div>

                {opp.governorate_slug && (
                  <p className="mt-2 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="size-3.5 text-gold/70" />
                    <Link
                      to="/governorates/$id"
                      params={{ id: opp.governorate_slug }}
                      className="hover:text-gold"
                    >
                      {t(govName(opp.governorate_slug))}
                    </Link>
                    {opp.stage && (
                      <>
                        {" · "}
                        {t(opp.stage)}
                      </>
                    )}
                  </p>
                )}
                {opp.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(opp.summary)}
                  </p>
                )}
                {formatRange(opp.investment_min_usd, opp.investment_max_usd, lang) && (
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-gold">
                    <TrendingUp className="size-3.5 shrink-0" />
                    {formatRange(opp.investment_min_usd, opp.investment_max_usd, lang)}
                  </p>
                )}
                {opp.competent_entity && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    {t("Competent entity")}: {t(opp.competent_entity)}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
            {t("No investment opportunities match this filter yet.")}
          </p>
        )}
      </Section>
      <SiteFooter />
    </div>
  );
}
