import { useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  Car,
  Clapperboard,
  Compass,
  Dna,
  HeartPulse,
  Hotel,
  MoreHorizontal,
  Plane,
  ShoppingBag,
  Ship,
  Sun,
  TrendingUp,
  Utensils,
  Heart,
  Landmark,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { marketplacePages } from "@/data/marketplace";
import heroImage from "@/assets/hero-egypt-one.jpg";
import { EgyptMap } from "@/components/site/EgyptMap";
import { AppRail } from "@/components/dashboard/AppRail";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { IntelligenceRail } from "@/components/dashboard/IntelligenceRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GhostButton, GoldButton, SourceBadge } from "@/components/site/Primitives";
import {
  discoverCards,
  egyptSectors,
  eras,
  heroImages,
  investSectors,
  offerCards,
  popularDestinations,
  programmes,
  quickCategories,
  researchItems,
  searchTabs,
  sectorCards,
  trustItems,
  weatherStrip,
} from "@/data/site";
import { SITE, mailto } from "@/config/site";
import { useI18n } from "@/i18n";
import { useCurrency } from "@/i18n/currency";
import { cn } from "@/lib/utils";

const title = "Egypt One — One Egypt. One Journey. One Platform.";
const description =
  "Egypt One is a unified digital gateway to Egypt: destinations, 27 governorates, heritage, culture, events and investment — presented through one intelligent platform.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: SITE.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/` }],
  }),
  component: Home,
});

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <TopUtilityBar />
      <div className="flex min-h-screen bg-background">
        <AppRail open={menuOpen} onClose={() => setMenuOpen(false)} />

        <div className="min-w-0 flex-1">
          <DashboardTopBar onMenu={() => setMenuOpen(true)} />


        <main className="grid gap-6 px-4 py-5 lg:px-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="grid min-w-0 grid-cols-1 gap-8">
            <Hero />
            <WeatherStrip />
            <Categories />
            <Discover />
            <Destinations />
            <SectorStrip />
            <Offers />
            <Governorates />
            <ThroughTime />
            <Research />
            <Film />
            <Marketplace />
            <Concierge />
            <Invest />
            <Programmes />
            <Trust />
          </div>
          <div className="min-w-0">
            <div className="2xl:sticky 2xl:top-32">
              <IntelligenceRail />
            </div>
          </div>
        </main>

          <SiteFooter />
        </div>
      </div>
    </>
  );

}

function Block({
  id,
  eyebrow,
  title: heading,
  action,
  children,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { t } = useI18n();
  return (
    <section id={id} className="scroll-mt-32">
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
        <div className="min-w-0">
          {eyebrow && (
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/80">
              {t(eyebrow)}
            </p>
          )}
          <h2 className="mt-1 font-display text-xl tracking-tight text-foreground sm:text-2xl">
            {t(heading)}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function ViewAll({ href = "#explore" }: { href?: string }) {
  const { t } = useI18n();
  return (
    <a
      href={href}
      className="shrink-0 text-xs font-semibold text-gold transition-opacity hover:opacity-80"
    >
      {t("View all")}
    </a>
  );
}

function Hero() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/70">
      <img
        src={heroImage}
        alt={t("The Sphinx, the Pyramids of Giza and a Nile felucca at dusk")}
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      {/* Legibility scrims: a full darkening wash plus a stronger bottom/leading fade. */}
      <div className="absolute inset-0 bg-background/45" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, oklch(0.12 0.02 255 / 96%) 0%, oklch(0.12 0.02 255 / 72%) 45%, oklch(0.12 0.02 255 / 20%) 100%)",
        }}
      />

      <div className="relative flex min-h-[460px] flex-col justify-end p-5 sm:min-h-[520px] sm:p-8">
        <p className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border border-gold-line bg-background/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur">
          <Sparkles className="size-3" /> {t("The official gateway to Egypt")}
        </p>
        <h1 className="max-w-3xl font-display text-3xl leading-tight text-foreground drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-5xl">
          {t("One Egypt.")} <span className="text-gold">{t("One Journey.")}</span>{" "}
          {t("One Platform.")}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.8)] sm:text-base">
          {t(
            "Plan, discover and invest across 27 governorates — heritage, culture, experiences and opportunity in a single national platform.",
          )}
        </p>

        <div className="mt-6 rounded-2xl border border-border/70 bg-background/90 p-3 backdrop-blur-xl">
          <div className="flex gap-1 overflow-x-auto pb-2 [scrollbar-width:none]">
            {searchTabs.map((tab, i) => (
              <button
                key={tab}
                className={cn(
                  "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                  i === 0 ? "bg-gold-soft text-gold" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(tab)}
              </button>
            ))}
          </div>
          <div className="grid gap-2 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)_auto]">
            <Field
              icon={<MapPin className="size-4" />}
              label={t("Where are you going?")}
              value="Cairo, Luxor, Aswan"
            />
            <Field
              icon={<CalendarDays className="size-4" />}
              label={t("Dates")}
              value={t("Select dates")}
            />
            <Field
              icon={<Users className="size-4" />}
              label={t("Travellers")}
              value={t("2 adults, 0 children")}
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">
              <Search className="size-4" /> {t("Search")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2 rounded-xl border border-border/70 bg-card px-3 py-2.5">
      <span className="shrink-0 text-gold">{icon}</span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        <span className="block truncate text-xs text-foreground">{value}</span>
      </span>
    </div>
  );
}

function WeatherStrip() {
  const { t } = useI18n();
  const { currency } = useCurrency();
  return (
    <section className="grid gap-2 rounded-2xl border border-border/70 bg-card p-3 sm:grid-cols-2 lg:grid-cols-5">
      {weatherStrip.map((w) => (
        <div
          key={w.city}
          className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl border border-border/60 bg-surface-2 px-3 py-2"
        >
          <Sun className="size-4 shrink-0 text-gold" />
          <span className="min-w-0">
            <span className="block truncate text-xs text-foreground">{t(w.city)}</span>
            <span className="block truncate text-[10px] text-muted-foreground">{t(w.state)}</span>
          </span>
          <span className="shrink-0 font-display text-sm text-gold">{w.temp}</span>
        </div>
      ))}
      <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2.5 rounded-xl border border-gold-line bg-gold-soft px-3 py-2">
        <TrendingUp className="size-4 shrink-0 text-gold" />
        <span className="min-w-0 truncate text-xs text-gold" dir="ltr">
          1 {currency.code} ≈ {(48.2 / currency.perUsd).toLocaleString(undefined, { maximumFractionDigits: 2 })}{" "}
          EGP
        </span>
      </div>
    </section>
  );
}

const categoryIcons = [
  Hotel,
  Plane,
  Landmark,
  Ship,
  Compass,
  Car,
  Utensils,
  CalendarDays,
  ShoppingBag,
  HeartPulse,
  TrendingUp,
  MoreHorizontal,
];

function Categories() {
  const { t } = useI18n();
  return (
    <Block eyebrow="Browse by category" title="Everything Egypt, one click away">
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12">
        {quickCategories.map((c, i) => {
          const Icon = categoryIcons[i % categoryIcons.length]!;
          return (
            <a
              key={c}
              href="#explore"
              className="grid place-items-center gap-2 rounded-xl border border-border/70 bg-card px-2 py-3.5 text-center transition-colors hover:border-gold-line"
            >
              <Icon className="size-5 text-gold" />
              <span className="w-full truncate text-[11px] text-muted-foreground">{t(c)}</span>
            </a>
          );
        })}
      </div>
    </Block>
  );
}

function Discover() {
  const { t } = useI18n();
  return (
    <Block id="explore" eyebrow="Discovery" title="Discover Egypt in depth" action={<ViewAll />}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {discoverCards.map((card) => (
          <a
            key={card.title}
            href="#governorates"
            className="group relative overflow-hidden rounded-2xl border border-border/70"
          >
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              width={800}
              height={600}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: "var(--gradient-fade)" }} />
            {card.badge && <SourceBadge status="DEMO" className="absolute end-3 top-3" />}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-base text-foreground">{t(card.title)}</p>
              <p className="text-xs text-foreground/70">{t(card.subtitle)}</p>
            </div>
          </a>
        ))}
      </div>
    </Block>
  );
}

function Destinations() {
  const { t } = useI18n();
  return (
    <Block eyebrow="Destinations" title="Popular destinations" action={<ViewAll />}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {popularDestinations.map((d) => (
          <article
            key={d.name}
            className="group overflow-hidden rounded-2xl border border-border/70 bg-card"
          >
            <div className="relative">
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                width={800}
                height={600}
                className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute end-2 top-2 grid size-8 place-items-center rounded-full border border-border/70 bg-background/70 text-muted-foreground backdrop-blur">
                <Heart className="size-3.5" />
              </span>
            </div>
            <div className="p-3">
              <p className="truncate font-display text-sm text-foreground">{t(d.name)}</p>
              <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">{t(d.note)}</p>
              <p className="mt-2 text-[11px] text-gold">
                ★ {d.rating} <span className="text-muted-foreground">({d.reviews})</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </Block>
  );
}

function SectorStrip() {
  const { t } = useI18n();
  return (
    <Block id="sectors" eyebrow="Sectors" title="Egypt sectors" action={<ViewAll href="#invest" />}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {egyptSectors.map((s) => (
          <a
            key={s.title}
            href="#invest"
            className="group relative overflow-hidden rounded-2xl border border-border/70"
          >
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              width={800}
              height={1000}
              className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: "var(--gradient-fade)" }} />
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="font-display text-sm leading-tight text-foreground">{t(s.title)}</p>
              <p className="mt-1 text-[10px] leading-snug text-foreground/70">{t(s.note)}</p>
            </div>
          </a>
        ))}
      </div>
    </Block>
  );
}

function Offers() {
  const { t } = useI18n();
  return (
    <Block id="offers" eyebrow="Offers" title="Offers & programmes">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {offerCards.map((o) => (
          <article key={o.title} className="relative overflow-hidden rounded-2xl border border-border/70">
            <img
              src={o.image}
              alt={o.title}
              loading="lazy"
              width={1000}
              height={700}
              className="h-44 w-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "var(--gradient-fade)" }} />
            <span className="absolute start-3 top-3 rounded-full border border-gold-line bg-background/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold backdrop-blur">
              {t(o.tag)}
            </span>
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-base text-foreground">{t(o.title)}</p>
              <p className="mt-1 text-xs text-foreground/75">{t(o.body)}</p>
              <a
                href={mailto(`Egypt One — ${o.title}`)}
                className="mt-3 inline-flex rounded-lg bg-gold px-3 py-1.5 text-[11px] font-semibold text-primary-foreground"
              >
                {t(o.cta)}
              </a>
            </div>
          </article>
        ))}
      </div>
    </Block>
  );
}

function Governorates() {
  const { t } = useI18n();
  return (
    <Block
      id="governorates"
      eyebrow="The map of Egypt"
      title="Explore all 27 governorates"
      action={<ViewAll href="#governorates" />}
    >
      <EgyptMap />

    </Block>
  );
}

function ThroughTime() {
  const { t } = useI18n();
  return (
    <Block id="through-time" eyebrow="Timeline" title="Egypt through time">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {eras.map((era) => (
          <figure
            key={era.name}
            className="group min-w-0 overflow-hidden rounded-xl border border-border/70 bg-card"
          >
            <img
              src={era.image}
              alt={`${era.name} era in Egypt`}
              loading="lazy"
              width={800}
              height={600}
              className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <figcaption className="p-3">
              <p className="truncate font-display text-sm text-foreground">{t(era.name)}</p>
              <p className="mt-1 text-[11px] text-muted-foreground" dir="ltr">
                {era.years}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Block>
  );
}

function Research() {
  const { t } = useI18n();
  return (
    <Block id="research" eyebrow="Research & continuity" title="Egyptian genetic continuity">
      <div className="grid gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <img
          src={heroImages.research}
          alt={t("Golden DNA helix over a hieroglyph wall")}
          loading="lazy"
          width={1200}
          height={800}
          className="h-56 w-full object-cover lg:h-full"
        />
        <div className="grid content-center gap-3 p-6">
          <Dna className="size-6 text-gold" />
          <p className="font-display text-lg text-foreground">
            {t("An unbroken line, studied and documented")}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t(
              "A dedicated research track presenting genetic, linguistic and cultural continuity between ancient and modern Egyptians — sourced from published studies and national archives.",
            )}
          </p>
          <ul className="mt-1 grid gap-2 sm:grid-cols-2">
            {researchItems.map((r) => (
              <li key={r.title} className="rounded-xl border border-border/60 bg-surface-2 p-3">
                <p className="text-xs text-foreground">{t(r.title)}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{t(r.note)}</p>
              </li>
            ))}
          </ul>
          <SourceBadge status="PLANNED" className="w-fit" />
        </div>
      </div>
    </Block>
  );
}

function Film() {
  const { t } = useI18n();
  return (
    <Block id="film" eyebrow="Film & culture" title="Film, culture & creative Egypt">
      <div className="grid gap-4 overflow-hidden rounded-2xl border border-border/70 bg-card lg:grid-cols-2">
        <img
          src={heroImages.film}
          alt={t("Film crew shooting on location in the Egyptian desert at dusk")}
          loading="lazy"
          width={1200}
          height={800}
          className="h-56 w-full object-cover lg:h-full"
        />
        <div className="grid content-center gap-3 p-6">
          <Clapperboard className="size-6 text-gold" />
          <p className="font-display text-lg text-foreground">
            {t("Films, series and location scouting")}
          </p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {t(
              "A dedicated track for productions: shooting locations, permits guidance and cultural advisers — turning screen exposure into visits.",
            )}
          </p>
          <GhostButton href={mailto("Egypt One — Film & screen tourism")} className="w-fit">
            {t("Contact the film desk")}
          </GhostButton>
        </div>
      </div>
    </Block>
  );
}

function Marketplace() {
  const { t } = useI18n();
  return (
    <Block id="marketplace" eyebrow="Marketplace & crafts" title="Made in Egypt">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-2xl border border-border/70">
          <img
            src={heroImages.market}
            alt={t("Egyptian handicrafts and textiles in a lantern-lit souk")}
            loading="lazy"
            width={1000}
            height={700}
            className="h-64 w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-fade)" }} />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <p className="font-display text-lg text-foreground">{t("Wear Egypt & local makers")}</p>
            <p className="mt-1 max-w-lg text-xs text-foreground/75">
              {t("Cotton, crafts and produce from verified artisans across the country.")}
            </p>
          </div>
        </div>
        <div className="grid content-start gap-3">
          {marketplacePages.map((m) => (
            <Link
              key={m.title}
              to={m.href}
              className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-colors hover:border-gold-line"
            >
              <ShoppingBag className="size-5 shrink-0 text-gold" />
              <span className="min-w-0">
                <span className="block truncate text-sm text-foreground">{t(m.title)}</span>
                <span className="block truncate text-[11px] text-muted-foreground">{t(m.tagline)}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground rtl:rotate-180" />
            </Link>
          ))}
        </div>
      </div>
    </Block>
  );
}

function Concierge() {
  const { t } = useI18n();
  return (
    <section id="ai-concierge" className="scroll-mt-32">
      <div className="grid gap-4 rounded-2xl border border-gold-line bg-gold-soft p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <p className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
            <Sparkles className="size-3.5" /> {t("AI Concierge")}
          </p>
          <h2 className="mt-2 font-display text-xl text-foreground sm:text-2xl">
            {t("Your personal assistant for everything Egypt")}
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {t(
              "Ask for a 7-day itinerary, a Nile cruise window or a quiet heritage route — the concierge drafts it, you refine it.",
            )}
          </p>
        </div>
        <GoldButton href={mailto("Egypt One — AI Concierge access")}>
          {t("Open AI Concierge")}
        </GoldButton>
      </div>
    </section>
  );
}

function Invest() {
  const { t } = useI18n();
  return (
    <Block id="invest" eyebrow="Invest & Business" title="Build with Egypt">
      <div className="grid gap-4 md:grid-cols-3">
        {sectorCards.map((s) => (
          <article key={s.title} className="overflow-hidden rounded-2xl border border-border/70 bg-card">
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              width={800}
              height={600}
              className="h-36 w-full object-cover"
            />
            <div className="p-4">
              <p className="font-display text-base text-foreground">{t(s.title)}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(s.body)}</p>
              <a
                href={mailto(`Egypt One — ${s.title}`)}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold"
              >
                {t(s.cta)} <ArrowRight className="size-3.5 rtl:rotate-180" />
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {investSectors.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-[11px] text-muted-foreground"
          >
            {t(s)}
          </span>
        ))}
      </div>
    </Block>
  );
}

function Programmes() {
  const { t } = useI18n();
  return (
    <Block id="programmes" eyebrow="National programmes" title="Egypt One initiatives">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {programmes.map((p) => (
          <article key={p.title} className="rounded-2xl border border-border/70 bg-card p-5">
            <p className="font-display text-sm text-gold">{t(p.title)}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t(p.body)}</p>
          </article>
        ))}
      </div>
    </Block>
  );
}

function Trust() {
  const { t } = useI18n();
  return (
    <section className="grid gap-3 rounded-2xl border border-border/70 bg-card p-5 sm:grid-cols-2 lg:grid-cols-5">
      {trustItems.map((item) => (
        <div key={item.title} className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
          <ShieldCheck className="size-5 shrink-0 text-gold" />
          <span className="min-w-0">
            <span className="block truncate text-xs font-semibold text-foreground">
              {t(item.title)}
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">{t(item.body)}</span>
          </span>
        </div>
      ))}
    </section>
  );
}
