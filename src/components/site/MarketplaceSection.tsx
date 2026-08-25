import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, MapPin, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeader, GoldButton, GhostButton, SourceBadge } from "@/components/site/Primitives";
import { useI18n } from "@/i18n";
import { mailto } from "@/config/site";
import { marketplacePages, type MarketplacePage } from "@/data/marketplace";

export function MarketplaceSection({ page }: { page: MarketplacePage }) {
  const { t } = useI18n();
  const others = marketplacePages.filter((p) => p.slug !== page.slug);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative">
          <img
            src={page.hero}
            alt={page.heroAlt}
            width={1600}
            height={900}
            className="h-[46vh] min-h-[320px] w-full object-cover lg:h-[58vh]"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--background) 6%, color-mix(in oklab, var(--background) 78%, transparent) 45%, color-mix(in oklab, var(--background) 35%, transparent) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto w-full max-w-[1360px] px-5 pb-8 lg:px-10 lg:pb-14">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                {t(page.eyebrow)}
              </p>
              <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-6xl">
                {t(page.title)}
              </h1>
              <p className="mt-2 text-sm text-gold/90 lg:text-base">{t(page.tagline)}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/85 lg:text-base">
                {t(page.intro)}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <GoldButton href={mailto(page.buySubject)}>{t("Enquire & order")}</GoldButton>
                <GhostButton href="#experiences">{t("Book an experience")}</GhostButton>
              </div>
            </div>
          </div>
        </section>

        <Section className="py-10 lg:py-14">
          <SourceBadge status="DEMO" className="mb-3" />
          <div className="grid gap-3 sm:grid-cols-3">
            {page.stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-gold-line bg-card p-5">
                <div className="font-display text-2xl text-gold">{t(s.value)}</div>
                <div className="mt-1 text-xs text-muted-foreground">{t(s.label)}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section className="py-6 lg:py-10">
          <SectionHeader
            eyebrow={t("Why it matters")}
            title={t("What makes it worth the trip")}
            description={t("Verified makers, transparent pricing and experiences you can book as a visitor.")}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {page.highlights.map((h) => (
              <article key={h.title} className="rounded-2xl border border-border bg-card p-5">
                <Check className="size-5 text-gold" />
                <h3 className="mt-3 text-sm font-semibold text-foreground">{t(h.title)}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(h.note)}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section className="py-6 lg:py-10">
          <div className="grid gap-4 lg:grid-cols-2">
            {page.gallery.map((g) => (
              <figure
                key={g.caption}
                className="group relative overflow-hidden rounded-2xl border border-border/70"
              >
                <img
                  src={g.image}
                  alt={g.alt}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 lg:h-96"
                />
                <div className="absolute inset-0" style={{ background: "var(--gradient-fade)" }} />
                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-lg text-foreground">{t(g.caption)}</p>
                  <p className="mt-1 text-xs text-foreground/75">{t(g.note)}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="experiences" className="py-6 lg:py-10">
          <SectionHeader
            eyebrow={t("For visitors")}
            title={t("Experiences you can book")}
            description={t("Curated routes that put the making, tasting and buying in one day.")}
          />
          <div className="grid gap-3 lg:grid-cols-3">
            {page.experiences.map((e) => (
              <article
                key={e.title}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5"
              >
                <MapPin className="mt-0.5 size-5 shrink-0 text-gold" />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{t(e.title)}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(e.note)}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-4 rounded-2xl border border-gold-line bg-gold-soft p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
                <Sparkles className="size-3.5" /> {t("AI Concierge")}
              </p>
              <h2 className="mt-2 font-display text-xl text-foreground sm:text-2xl">
                {t("Add this to your itinerary")}
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {t("Tell the concierge your travel dates and it will slot the makers, markets and tastings into your trip.")}
              </p>
            </div>
            <GoldButton href={mailto(page.buySubject)}>{t("Enquire & order")}</GoldButton>
          </div>
        </Section>

        <Section className="py-6 lg:py-16">
          <SectionHeader eyebrow={t("Marketplace & crafts")} title={t("More from Made in Egypt")} />
          <div className="grid gap-3 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={o.href}
                className="group relative overflow-hidden rounded-2xl border border-border/70"
              >
                <img
                  src={o.hero}
                  alt={o.heroAlt}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="h-40 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0" style={{ background: "var(--gradient-fade)" }} />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
                  <span className="min-w-0">
                    <span className="block truncate font-display text-base text-foreground">
                      {t(o.title)}
                    </span>
                    <span className="block truncate text-[11px] text-foreground/70">{t(o.tagline)}</span>
                  </span>
                  <ArrowRight className="size-4 shrink-0 text-gold rtl:rotate-180" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
