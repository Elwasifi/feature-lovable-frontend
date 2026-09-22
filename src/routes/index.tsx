import { useEffect, useRef, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bed,
  Briefcase,
  Building2,
  CalendarDays,
  Clapperboard,
  Compass,
  Dna,
  FileText,
  GraduationCap,
  Info,
  Landmark,
  LayoutGrid,
  MapPin,
  Home as HomeIcon,
  Palmtree,
  Sailboat,
  Search,
  ShoppingBag,
  Stamp,
  Sun,
  TrendingUp,
  Users,
  Utensils,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";
import { marketplacePages } from "@/data/marketplace";
import heroImage from "@/assets/hero-egyptora-hub.jpg";
import featHeritage from "@/assets/card-heritage.jpg";
import featMuseums from "@/assets/card-museums.jpg";
import featEvents from "@/assets/promo-summer.jpg";
import featProperties from "@/assets/sector-realestate.jpg";
import featInvest from "@/assets/sec-mice.jpg";
import featMarket from "@/assets/market-crafts.jpg";
import govBuilding from "@/assets/gov/cairo.jpg";
import govCairo from "@/assets/gov/cairo.jpg";
import govGiza from "@/assets/gov/giza.jpg";
import govAlexandria from "@/assets/gov/alexandria.jpg";
import govLuxor from "@/assets/gov/luxor.jpg";
import govAswan from "@/assets/gov/aswan.jpg";
import govPortSaid from "@/assets/gov/port-said.jpg";
import { SaveButton } from "@/components/site/SaveButton";
import { EgyptMap } from "@/components/site/EgyptMap";
import { AppRail } from "@/components/dashboard/AppRail";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { IntelligenceRail } from "@/components/dashboard/IntelligenceRail";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { GhostButton, SourceBadge } from "@/components/site/Primitives";
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


const title = "Egyptora Hub — Everything Egypt. One Hub.";
const description =
  "Egyptora Hub is a unified digital gateway to Egypt: destinations, 27 governorates, heritage, culture, events and investment — presented through one intelligent platform.";

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
      { property: "og:image", content: `${SITE.url}/og-image.jpg` },
      { name: "twitter:image", content: `${SITE.url}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/` }],
  }),
  component: Home,
});

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex min-h-screen bg-background">
        <AppRail open={menuOpen} onClose={() => setMenuOpen(false)} />

        <div className="min-w-0 flex-1">
          <DashboardTopBar onMenu={() => setMenuOpen(true)} />


        <main>
          <Hero />

          <div className="mx-auto grid w-full max-w-[1360px] grid-cols-1 gap-12 px-4 py-12 lg:px-8">
            <Mission />
            <GovernmentDirectory />
            <DirectoryCategoryCards />
            <ImportantNotice />
            <FeaturedServices />
            <Categories />
            <Discover />
            <Destinations />
            <SectorStrip />
            <Offers />
            <Governorates />
            <BookingSearch />
            <ThroughTime />
            <Insights />
            <Research />
            <Film />
            <Marketplace />
            <Concierge />
            <Invest />
            <Programmes />
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
  // Eyebrow labels were dropped in the reference-aligned typography pass; the
  // prop is kept so callers stay unchanged.
  void eyebrow;
  return (
    <section id={id} className="scroll-mt-32">
      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
        <div className="min-w-0">
          <h2 className="font-display text-2xl leading-tight tracking-tight text-foreground sm:text-3xl lg:text-[2.1rem]">
            {t(heading)}
          </h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function ViewAll({ href = "/#explore" }: { href?: string }) {
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

/** Shared marker for sections that are planned but have no page yet. */
function ComingSoonBadge({ className }: { className?: string }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full border border-border/70 bg-background/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground backdrop-blur",
        className,
      )}
    >
      {t("Coming soon")}
    </span>
  );
}

// Official Travelpayouts widget script, generated from our Travelpayouts
// account (marker 777434). Used for both the Flights and Hotels tabs.
const TP_WIDGET_SRC =
  "https://tpwgts.com/content?currency=usd&trs=574096&shmarker=777434&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%23D9B15B&color_button=%23D9B15B&color_icons=%23D9B15B&dark=%23F3F2ED&light=%230F1721&secondary=%230F1721&special=%23303944&color_focused=%23D9B15B&border_radius=12&plain=true&promo_id=7879&campaign_id=100";

// Transfers (promo 4674), car rental (promo 4480), attractions (Klook, promo 4497)
// and eSIM (promo 8588) widgets — same account marker, one script per product.
const TP_TRANSFERS_SRC =
  "https://tpwgts.com/content?trs=574096&shmarker=777434&locale=en&powered_by=true&border_radius=16&plain=true&color_background=%230F1721&color_button=%23D9B15B&promo_id=4674&campaign_id=22";

const TP_CAR_RENTAL_SRC =
  "https://tpwgts.com/content?trs=574096&shmarker=777434&locale=en&powered_by=true&border_radius=16&plain=true&show_logo=false&color_background=%230F1721&color_button=%23D9B15B&color_text=%23F5EFE0&color_input_text=%23000000&color_button_text=%230F1721&promo_id=4480&campaign_id=10";

// Klook widget: no confirmed colour-override parameters for this product, so it
// renders with its default styling rather than risk breaking it with guesses.
const TP_ATTRACTIONS_SRC =
  "https://tpwgts.com/content?currency=USD&trs=574096&shmarker=777434&locale=en&city_id=284&category=3&amount=3&powered_by=true&campaign_id=137&promo_id=4497";

const TP_ESIM_SRC =
  "https://tpwgts.com/content?trs=574096&shmarker=777434&locale=en&country=Egypt&powered_by=true&color_button=%23D9B15B&color_focused=%23D9B15B&secondary=%230F1721&dark=%23F5EFE0&light=%23FFFFFF&special=%233A4657&border_radius=16&plain=true&no_labels=&promo_id=8588&campaign_id=541";

// The widget's flight search already opens in a new tab (its form targets
// _blank). Its "Show hotels" option, however, sends the *current* tab to the
// Hotellook deeplink. The widget renders into an open shadow root on our own
// page (no cross-origin iframe), so we intercept that one interaction: on
// submit with "Show hotels" ticked we untick it (widget then only runs the
// flight search), open the identical Hotellook deeplink in a new tab, and
// restore the tick. Marker/tracking parameters are copied from the widget's
// own hidden fields, never altered.
function buildHotelDeeplink(root: ShadowRoot): string | null {
  const val = (name: string) =>
    (root.querySelector(`input[name="${name}"]`) as HTMLInputElement | null)?.value?.trim() ?? "";
  const destination = val("destination_slug");
  const checkIn = val("DateRange_from_name");
  const checkOut = val("DateRange_to_name");
  const marker = val("marker");
  const promo = val("p");
  if (!destination || !checkIn || !marker) return null;

  const params = new URLSearchParams({
    gateId: "2",
    skipRulerCheck: "skip",
    utm_campaign: "checkbox",
    "flags[utm]": `tp_cascoon_${promo}`,
    utm_source: "tp_cascoon",
    utm_medium: `campaign_${promo}`,
    destination,
    selectedHotelId: destination,
    language: val("locale") || "en",
    currency: val("currency") || "usd",
    marker,
    adults: val("passengers_adults") || "1",
    checkIn,
  });
  if (checkOut) params.set("checkOut", checkOut);
  return `https://yasen.hotellook.com/adaptors/location_deeplink?${params.toString()}`;
}

function TravelpayoutsWidget({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = "";
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.charset = "utf-8";
    host.appendChild(script);

    let attached: ShadowRoot | null = null;
    let bypass = false;
    const onCapture = (event: Event) => {
      const root = attached;
      if (!root || bypass) return;
      const path = (event as MouseEvent).composedPath();
      const submit = path.find(
        (n) =>
          n instanceof HTMLElement &&
          (n.tagName === "BUTTON" || n.tagName === "INPUT") &&
          (n as HTMLButtonElement).type === "submit",
      ) as HTMLElement | undefined;
      if (!submit) return;
      const checkbox = root.querySelector(
        'input[name="Show_hotels"]',
      ) as HTMLInputElement | null;
      if (!checkbox || !checkbox.checked) return;
      const url = buildHotelDeeplink(root);
      if (!url) return;

      // Hold this submit, untick "Show hotels" so the widget performs only the
      // flight search (its own new-tab behaviour), open the hotel deeplink in a
      // new tab while we still have the click gesture, then replay the submit.
      event.preventDefault();
      event.stopImmediatePropagation();
      checkbox.click();
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => {
        bypass = true;
        submit.click();
        window.setTimeout(() => {
          bypass = false;
          if (!checkbox.checked) checkbox.click();
        }, 600);
      }, 200);
    };

    const timer = window.setInterval(() => {
      const el = host.querySelector("tp-cascoon");
      const root = el?.shadowRoot ?? null;
      if (!root || attached) return;
      attached = root;
      root.addEventListener("click", onCapture, true);
    }, 400);

    return () => {
      window.clearInterval(timer);
      attached?.removeEventListener("click", onCapture, true);
      host.innerHTML = "";
    };
  }, [src]);

  return <div ref={ref} className="w-full min-w-0 overflow-x-hidden [&_iframe]:!w-full" />;
}

/** Quick entry tiles sitting inside the hero, each pointing at a real section. */
const heroTiles: {
  label: string;
  note: string;
  Icon: typeof Palmtree;
  to?: string;
  href?: string;
}[] = [
  { label: "Tourism", note: "Explore timeless beauty", Icon: Palmtree, href: "/#explore" },
  {
    label: "Investment",
    note: "Opportunities for growth",
    Icon: TrendingUp,
    to: "/investment-opportunities",
  },
  { label: "Real Estate", note: "Find your place", Icon: HomeIcon, to: "/properties" },
  { label: "Visa & Entry", note: "Start your journey", Icon: Stamp, to: "/countries" },
  { label: "Education", note: "A brighter future", Icon: GraduationCap, to: "/research-programs" },
  { label: "Do Business", note: "Launch and expand", Icon: Briefcase, to: "/providers" },
  {
    label: "Government Services",
    note: "Access official resources",
    Icon: Landmark,
    href: "/#government-directory",
  },
];

function Hero() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");

  // One search field: the question is handed to the live AI concierge, which
  // is grounded in the platform's own content.
  const ask = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    window.dispatchEvent(new CustomEvent("egyptora:ask-concierge", { detail: q }));
    setQuery("");
  };

  return (
    <section className="relative overflow-hidden">
      <img
        src={heroImage}
        alt={t("The Sphinx, the Pyramids of Giza and a Nile felucca at dusk")}
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, oklch(0.243 0.058 249.8 / 88%) 0%, oklch(0.243 0.058 249.8 / 62%) 55%, oklch(0.243 0.058 249.8 / 30%) 100%)",
        }}
      />

      <div className="on-dark relative mx-auto w-full max-w-[1360px] px-4 pb-8 pt-14 sm:pt-20 lg:px-8">
        <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-gold-line bg-primary/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur">
          <Sparkles className="size-3" /> {t("The official gateway to Egypt")}
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.05] text-foreground drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)] sm:text-6xl">
          {t("Your Gateway to Egypt")}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
          {t("Discover. Invest. Live. Explore. Belong.")}
        </p>

        <form
          onSubmit={ask}
          className="mt-7 grid max-w-2xl grid-cols-[minmax(0,1fr)_auto] items-center gap-2 rounded-2xl bg-background/95 p-2 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.8)]"
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("What are you looking for in Egypt?")}
            aria-label={t("What are you looking for in Egypt?")}
            className="h-12 w-full min-w-0 rounded-xl bg-transparent px-4 text-sm text-primary outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            aria-label={t("Search")}
            className="grid h-12 w-14 shrink-0 place-items-center rounded-xl bg-gold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Search className="size-5" />
          </button>
        </form>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {heroTiles.map(({ label, note, Icon, to, href }) => {
            const className =
              "grid place-items-center gap-1.5 rounded-xl border border-gold-line/50 bg-primary/55 px-3 py-4 text-center backdrop-blur transition-colors hover:border-gold-line hover:bg-primary/75";
            const inner = (
              <>
                <Icon className="size-6 text-gold" />
                <span className="w-full truncate text-xs font-semibold text-foreground">
                  {t(label)}
                </span>
                <span className="w-full truncate text-[10px] text-foreground/70">{t(note)}</span>
              </>
            );
            return to ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- static, typed route paths
              <Link key={label} to={to as any} className={className}>
                {inner}
              </Link>
            ) : (
              <a key={label} href={href} className={className}>
                {inner}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const featuredServices: { title: string; note: string; image: string; to: string }[] = [
  { title: "Heritage Sites", note: "Thousands of listed sites", image: featHeritage, to: "/heritage-sites" },
  { title: "Museums", note: "Collections across Egypt", image: featMuseums, to: "/museums" },
  { title: "Events & Festivals", note: "What's on right now", image: featEvents, to: "/events" },
  { title: "Real Estate", note: "Buy, rent or invest", image: featProperties, to: "/properties" },
  {
    title: "Investment Opportunities",
    note: "Projects seeking partners",
    image: featInvest,
    to: "/investment-opportunities",
  },
  { title: "Made in Egypt", note: "Crafts, cotton & producers", image: featMarket, to: "/products" },
];

function FeaturedServices() {
  const { t } = useI18n();
  return (
    <Block eyebrow="Featured" title="Featured services">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredServices.map((s) => (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any -- static, typed route paths
          <Link
            key={s.title}
            to={s.to as any}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-colors hover:border-gold-line"
          >
            <img
              src={s.image}
              alt={s.title}
              loading="lazy"
              width={900}
              height={600}
              className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 p-4">
              <span className="min-w-0">
                <span className="block truncate font-display text-base text-foreground">
                  {t(s.title)}
                </span>
                <span className="block truncate text-xs text-muted-foreground">{t(s.note)}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-gold rtl:rotate-180" />
            </div>
          </Link>
        ))}
      </div>
    </Block>
  );
}

/** The real Travelpayouts booking search, now a dedicated section below the hero. */
function BookingSearch() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<(typeof searchTabs)[number]>(searchTabs[0]);

  return (
    <Block id="book" eyebrow="Book your trip" title="Flights, stays and everything in between">
      <div className="overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)] sm:p-6">
        <div className="mb-3 flex gap-1 overflow-x-auto pb-2 [scrollbar-width:none]">
          {searchTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              aria-pressed={activeTab === tab}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors",
                activeTab === tab
                  ? "bg-gold text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t(tab)}
            </button>
          ))}
        </div>

        {activeTab === "Flights" ? (
          <TravelpayoutsWidget key="tp-flights" src={TP_WIDGET_SRC} />
        ) : activeTab === "Hotels" ? (
          <TravelpayoutsWidget key="tp-hotels" src={TP_WIDGET_SRC} />
        ) : activeTab === "Transfers" ? (
          <TravelpayoutsWidget key="tp-transfers" src={TP_TRANSFERS_SRC} />
        ) : activeTab === "Car Rental" ? (
          <TravelpayoutsWidget key="tp-car-rental" src={TP_CAR_RENTAL_SRC} />
        ) : activeTab === "Attractions" ? (
          <TravelpayoutsWidget key="tp-attractions" src={TP_ATTRACTIONS_SRC} />
        ) : (
          <TravelpayoutsWidget key="tp-esim" src={TP_ESIM_SRC} />
        )}
      </div>
    </Block>
  );
}

const directoryCategories: { label: string; Icon: typeof Landmark; href?: string }[] = [
  { label: "Ministries", Icon: Landmark },
  { label: "Authorities & Agencies", Icon: Building2 },
  { label: "Governorates", Icon: MapPin, href: "/#governorates" },
  { label: "Government Services", Icon: FileText },
  { label: "Parliament & Councils", Icon: Users },
  { label: "More Categories", Icon: LayoutGrid },
];

function GovernmentDirectory() {
  const { t } = useI18n();
  return (
    <section id="government-directory" className="scroll-mt-32">
      <div className="on-dark grid overflow-hidden rounded-3xl bg-primary lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <img
          src={govBuilding}
          alt={t("Egyptian government building")}
          loading="lazy"
          width={800}
          height={600}
          className="h-48 w-full object-cover lg:h-full"
        />
        <div className="grid content-center gap-3 p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
            {t("Official links. Trusted sources.")}
          </p>
          <h2 className="font-display text-2xl leading-tight text-foreground">
            {t("Egypt Official Government Directory")}
          </h2>
          <p className="text-sm leading-relaxed text-foreground/75">
            {t(
              "Access Egyptian government entities, ministries, authorities and services in one place.",
            )}
          </p>
          <span className="mt-1 inline-flex w-fit items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-xs font-semibold text-primary-foreground">
            {t("Directory coming soon")} <ArrowRight className="size-4 rtl:rotate-180" />
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 p-6 sm:grid-cols-3">
          {directoryCategories.map(({ label, Icon, href }) => {
            const className =
              "grid place-items-center gap-2 rounded-xl border border-gold-line/40 bg-primary/40 px-2 py-4 text-center";
            const inner = (
              <>
                <Icon className="size-5 text-gold" />
                <span className="w-full text-[11px] leading-tight text-foreground">{t(label)}</span>
              </>
            );
            return href ? (
              <a key={label} href={href} className={cn(className, "transition-colors hover:border-gold-line")}>
                {inner}
              </a>
            ) : (
              <div key={label} className={cn(className, "opacity-75")}>
                {inner}
                <ComingSoonBadge />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** Reference-style photo cards for the directory categories. */
const directoryCards: {
  label: string;
  arabic: string;
  image: string;
  href?: string;
}[] = [
  { label: "Presidency & Cabinet", arabic: "رئاسة الجمهورية ومجلس الوزراء", image: govCairo },
  { label: "Ministries", arabic: "الوزارات", image: govGiza },
  { label: "Authorities & Agencies", arabic: "الهيئات والأجهزة الحكومية", image: govAlexandria },
  { label: "Governorates", arabic: "المحافظات", image: govLuxor, href: "/#governorates" },
  { label: "Tourism & Antiquities", arabic: "السياحة والآثار", image: govAswan },
  { label: "Investment & Business", arabic: "الاستثمار والأعمال", image: govPortSaid },
];

function DirectoryCategoryCards() {
  const { t } = useI18n();
  return (
    <Block
      title="Browse Government Directory by Category"
      action={<ViewAll href="/#government-directory" />}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {directoryCards.map((c) => {
          const inner = (
            <>
              <img
                src={c.image}
                alt={t(c.label)}
                loading="lazy"
                width={900}
                height={600}
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="grid gap-1 p-4">
                <span className="block truncate font-display text-base text-foreground">
                  {t(c.label)}
                </span>
                <span className="block truncate text-xs text-muted-foreground" dir="rtl">
                  {c.arabic}
                </span>
                {c.href ? (
                  <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold text-gold">
                    {t("View entities")} <ArrowRight className="size-3.5 rtl:rotate-180" />
                  </span>
                ) : (
                  <ComingSoonBadge className="mt-1 w-fit" />
                )}
              </div>
            </>
          );
          const className =
            "group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)] transition-colors hover:border-gold-line";
          return c.href ? (
            <a key={c.label} href={c.href} className={className}>
              {inner}
            </a>
          ) : (
            <div key={c.label} className={cn(className, "opacity-90")}>
              {inner}
            </div>
          );
        })}
      </div>
    </Block>
  );
}

/** Bilingual independence notice, its own band as in the reference. */
function ImportantNotice() {
  const { t } = useI18n();
  return (
    <section className="grid gap-4 rounded-2xl border border-info/25 bg-info/5 p-5 lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
      <div className="flex items-center gap-2">
        <Info className="size-5 shrink-0 text-info" />
        <span className="font-display text-sm text-foreground">
          {t("Important notice")} <span dir="rtl">— تنويه هام</span>
        </span>
      </div>
      <p className="text-[11px] leading-relaxed text-muted-foreground">
        {t(
          "Egyptora Hub is an independent private platform and is not a governmental entity. Links to government entities and official services are provided for informational purposes only.",
        )}
      </p>
      <p className="text-[11px] leading-relaxed text-muted-foreground" dir="rtl">
        منصة إيجيبتورا هَب منصة رقمية خاصة ومستقلة وليست جهة حكومية. يتم توفير روابط الجهات الحكومية
        والخدمات الرسمية لأغراض التعريف وتسهيل الوصول فقط.
      </p>
    </section>
  );
}

/** Live weather / currency strip plus the visitor-intelligence panels. */
function Insights() {
  return (
    <Block eyebrow="Live signals" title="Egypt right now">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="grid content-start gap-6">
          <WeatherStrip />
          <EgyptMapNote />
        </div>
        <IntelligenceRail />
      </div>
    </Block>
  );
}

function EgyptMapNote() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <p className="font-display text-base text-foreground">{t("Weather, currency and demand")}</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {t(
          "Seasonal conditions, exchange rates and visitor trends, gathered in one place to help you time your trip or your investment.",
        )}
      </p>
    </div>
  );
}



function WeatherStrip() {
  const { t } = useI18n();
  const { currency } = useCurrency();
  return (
    <section className="relative grid gap-2 rounded-2xl border border-border/70 bg-card p-3 sm:grid-cols-2 lg:grid-cols-5">
      <SourceBadge status="DEMO" className="absolute -top-2 end-3" />
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

// One icon per quick category, in the same order as `quickCategories`.
const categoryIcons = [
  CalendarDays,
  ShoppingBag,
  TrendingUp,
  Wrench,
  Sailboat,
  Compass,
  Bed,
  Utensils,
];


function Categories() {
  const { t } = useI18n();
  return (
    <Block eyebrow="Browse by category" title="Everything Egypt, one click away">
      <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
        {quickCategories.map((c, i) => {
          const Icon = categoryIcons[i]!;
          const className =
            "grid place-items-center gap-2 rounded-xl border border-border/70 bg-card px-2 py-3.5 text-center transition-colors hover:border-gold-line";
          const inner = (
            <>
              <Icon className="size-5 text-gold" />
              <span className="w-full truncate text-[11px] text-muted-foreground">
                {t(c.label)}
              </span>
            </>
          );
          // Planned categories have no page yet: same card, badged and not clickable.
          if (c.soon) {
            return (
              <div key={c.label} className={cn(className, "opacity-80")}>
                {inner}
                <ComingSoonBadge />
              </div>
            );
          }
          return c.to ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- static, typed route paths
            <Link key={c.label} to={c.to as any} className={className}>
              {inner}
            </Link>
          ) : (
            <a key={c.label} href={c.href} className={className}>
              {inner}
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
        {discoverCards.map((card) => {
          // Cards that point at a real route navigate client-side; in-page anchors stay
          // plain anchors so they still scroll. Cards without a page yet are not links.
          const href = card.href;
          const isRoute = !!href && !href.includes("#");
          const className = "group relative overflow-hidden rounded-2xl border border-border/70";
          const inner = (
            <>
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                width={800}
                height={600}
                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "var(--gradient-fade)" }} />
              {card.soon ? (
                <ComingSoonBadge className="absolute end-3 top-3" />
              ) : (
                card.badge && <SourceBadge status="DEMO" className="absolute end-3 top-3" />
              )}
              <div className="on-dark absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-base text-foreground">{t(card.title)}</p>
                <p className="text-xs text-foreground/70">{t(card.subtitle)}</p>
              </div>
            </>
          );
          if (card.soon) {
            return (
              <div key={card.title} className={className}>
                {inner}
              </div>
            );
          }
          return isRoute ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- static, typed route paths
            <Link key={card.title} to={href as any} className={className}>
              {inner}
            </Link>
          ) : (
            <a key={card.title} href={href} className={className}>
              {inner}
            </a>
          );
        })}

      </div>
    </Block>
  );
}

function Destinations() {
  const { t } = useI18n();
  return (
    <Block
      eyebrow="Destinations"
      title="Popular destinations"
      action={
        <span className="flex items-center gap-2">
          <SourceBadge status="DEMO" />
          <ViewAll />
        </span>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {popularDestinations.map((d) => (
          <article
            key={d.name}
            className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card"
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
              <SaveButton
                variant="icon"
                className="absolute end-2 top-2 z-10"
                itemType="destination"
                itemId={d.name.toLowerCase().replace(/\s+/g, "-")}
                itemName={d.name}
              />
            </div>
            <div className="p-3">
              <p className="truncate font-display text-sm text-foreground">{t(d.name)}</p>
              <p className="mt-0.5 line-clamp-2 text-[11px] text-muted-foreground">{t(d.note)}</p>
              <p className="mt-2 text-[11px] text-gold">
                ★ {d.rating} <span className="text-muted-foreground">({d.reviews})</span>
              </p>
            </div>
            {/* Whole card opens the matching governorate page; the save icon sits above it. */}
            <Link
              to="/governorates/$id"
              params={{ id: d.gov }}
              aria-label={t(d.name)}
              className="absolute inset-0"
            />
          </article>
        ))}
      </div>
    </Block>
  );
}

function SectorStrip() {
  const { t } = useI18n();
  return (
    <Block id="sectors" eyebrow="Sectors" title="Egypt sectors" action={<ViewAll href="/#invest" />}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {egyptSectors.map((s) => (
          <a
            key={s.title}
            href="/#invest"
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
            <div className="on-dark absolute inset-x-0 bottom-0 p-3">
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
    <Block
      id="offers"
      eyebrow="Offers"
      title="Offers & programmes"
      action={<SourceBadge status="DEMO" />}
    >
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
            <div className="on-dark absolute inset-x-0 bottom-0 p-4">
              <p className="font-display text-base text-foreground">{t(o.title)}</p>
              <p className="mt-1 text-xs text-foreground/75">{t(o.body)}</p>
              <a
                href={mailto(`Egyptora Hub — ${o.title}`)}
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
          <Link
            key={era.name}
            to="/encyclopedia"
            className="group block min-w-0 overflow-hidden rounded-xl border border-border/70 bg-card"
          >
            <img
              src={era.image}
              alt={`${era.name} era in Egypt`}
              loading="lazy"
              width={800}
              height={600}
              className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="p-3">
              <p className="truncate font-display text-sm text-foreground">{t(era.name)}</p>
              <p className="mt-1 text-[11px] text-muted-foreground" dir="ltr">
                {era.years}
              </p>
            </div>
          </Link>
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
          <GhostButton href={mailto("Egyptora Hub — Film & screen tourism")} className="w-fit">
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
          <div className="on-dark absolute inset-x-0 bottom-0 p-5">
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
      {/* The floating concierge widget (available on every page) is the entry point,
          so this section introduces it without a separate button. */}
      <div className="rounded-2xl border border-gold-line bg-gold-soft p-6">
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
              {/* Real estate has a real, populated page; the other two sectors
                  still route to email until their pages exist. */}
              {s.title === "Real Estate in Egypt" ? (
                <Link
                  to="/properties"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold"
                >
                  {t(s.cta)} <ArrowRight className="size-3.5 rtl:rotate-180" />
                </Link>
              ) : (
                <a
                  href={mailto(`Egyptora Hub — ${s.title}`)}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold"
                >
                  {t(s.cta)} <ArrowRight className="size-3.5 rtl:rotate-180" />
                </a>
              )}
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
    <Block id="programmes" eyebrow="National programmes" title="Egyptora Hub initiatives">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {programmes.map((p) => (
          <article key={p.title} className="rounded-2xl border border-border/70 bg-card p-5">
            <div className="flex items-start justify-between gap-2">
              <p className="font-display text-sm text-gold">{t(p.title)}</p>
              <ComingSoonBadge />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t(p.body)}</p>
          </article>
        ))}
      </div>
    </Block>
  );
}

/** Mission band: platform statement plus the trust pillars, as in the reference. */
function Mission() {
  const { t } = useI18n();
  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)] lg:items-center">
      <div>
        <h2 className="font-display text-2xl leading-tight text-foreground sm:text-3xl lg:text-[2.1rem]">
          {t("A private platform supporting Egypt's digital future")}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {t(
            "Egyptora Hub is an independent private platform designed to facilitate access to Egypt's opportunities, services and official resources, in one connected gateway.",
          )}
        </p>
        <Link
          to="/legal"
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-gold-line px-4 py-2.5 text-xs font-semibold text-gold transition-colors hover:bg-gold-soft"
        >
          {t("Learn more")} <ArrowRight className="size-4 rtl:rotate-180" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {trustItems.map((item) => (
          <div key={item.title} className="grid justify-items-start gap-2">
            <span className="grid size-10 place-items-center rounded-full bg-gold-soft">
              <ShieldCheck className="size-5 text-gold" />
            </span>
            <span className="text-xs font-semibold text-foreground">{t(item.title)}</span>
            <span className="text-[11px] leading-relaxed text-muted-foreground">{t(item.body)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
