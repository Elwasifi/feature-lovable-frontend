import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Building, MapPin, Ruler } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeader, SourceBadge } from "@/components/site/Primitives";
import { GovernanceBanner, type GovernanceStatus } from "@/components/site/GovernanceBanner";
import { governorates } from "@/data/governorates";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type Property = {
  id: string;
  slug: string;
  name: string;
  governorate_slug: string;
  property_type: string | null;
  price_usd: number | null;
  area_m2: number | null;
  city: string | null;
  summary: string | null;
  tags: string[] | null;
  governance_status: GovernanceStatus;
};

const title = "Real Estate in Egypt | Egypt One";
const description =
  "Browse residential and commercial properties across Egypt's governorates — homes, apartments and land for those looking to live or invest in Egypt.";

export const Route = createFileRoute("/properties")({
  loader: async () => {
    const { data, error } = await supabase
      .from("properties")
      .select(
        "id, slug, name, governorate_slug, property_type, price_usd, area_m2, city, summary, tags, governance_status",
      )
      .order("name");

    if (error) {
      console.error("[properties] failed to load properties:", error.message);
    }
    return { properties: (data ?? []) as Property[] };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/properties` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/properties` }],
  }),
  component: PropertiesPage,
});

const govName = (slug: string) => governorates.find((g) => g.id === slug)?.name ?? slug;

function formatPrice(usd: number | null, lang: string) {
  if (usd === null) return null;
  return `$${usd.toLocaleString(lang === "ar" ? "ar-EG" : "en-US", { maximumFractionDigits: 0 })}`;
}

function PropertiesPage() {
  const { properties } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const [type, setType] = useState<string | null>(null);

  const types = useMemo(
    () =>
      Array.from(
        new Set(properties.map((p) => p.property_type).filter((v): v is string => !!v)),
      ).sort(),
    [properties],
  );
  const filtered = type ? properties.filter((p) => p.property_type === type) : properties;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Section>
        <SectionHeader
          eyebrow="Invest & live"
          title="Real estate & live in Egypt"
          description="Residential, commercial and land listings across Egypt's governorates, for those looking to live or invest."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setType(null)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              type === null
                ? "border-gold-line bg-gold-soft text-gold"
                : "border-border/60 text-muted-foreground hover:border-gold-line hover:text-gold",
            )}
          >
            {t("All types")}
          </button>
          {types.map((ty) => (
            <button
              key={ty}
              type="button"
              onClick={() => setType(ty)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                type === ty
                  ? "border-gold-line bg-gold-soft text-gold"
                  : "border-border/60 text-muted-foreground hover:border-gold-line hover:text-gold",
              )}
            >
              {t(ty)}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((property) => (
              <article
                key={property.id}
                className="rounded-2xl border border-border/60 bg-card/60 p-5 transition-colors hover:border-gold-line"
              >
                <GovernanceBanner status={property.governance_status} className="mb-3" />
                <div className="flex items-start justify-between gap-3">
                  <h2 className="flex items-center gap-2 font-display text-base text-foreground">
                    <Building className="size-4 shrink-0 text-gold" />
                    {t(property.name)}
                  </h2>
                  <SourceBadge status="DEMO" />
                </div>

                <p className="mt-2 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3.5 text-gold/70" />
                  <Link
                    to="/governorates/$id"
                    params={{ id: property.governorate_slug }}
                    className="hover:text-gold"
                  >
                    {t(govName(property.governorate_slug))}
                  </Link>
                  {property.city && (
                    <>
                      {" · "}
                      {t(property.city)}
                    </>
                  )}
                </p>

                {property.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(property.summary)}
                  </p>
                )}

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-foreground/85">
                  {property.price_usd !== null && (
                    <span className="text-gold">{formatPrice(property.price_usd, lang)}</span>
                  )}
                  {property.area_m2 !== null && (
                    <span className="flex items-center gap-1">
                      <Ruler className="size-3.5 text-gold/70" />
                      {property.area_m2.toLocaleString()} m²
                    </span>
                  )}
                </div>

                {property.tags && property.tags.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {property.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gold-line/60 bg-gold-soft px-2 py-0.5 text-[10px] text-gold"
                      >
                        {t(tag)}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
            {t("No properties match this filter yet.")}
          </p>
        )}
      </Section>
      <SiteFooter />
    </div>
  );
}
