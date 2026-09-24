import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase, Building2, ChevronDown, ExternalLink, Landmark, MapPin, Plane, ShieldCheck, Sparkles, LayoutGrid,
  Scale, Link2, Map as MapIcon, Users, TrendingUp, Gavel, Globe2, GraduationCap, Hospital, BookOpen, Home, Bus,
  Wallet, BadgeCheck, IdCard, Car, FileText, Receipt, Stamp, Baby, Heart, Package, Factory, Headphones, Search,
} from "lucide-react";
import {
  InnerPage, SectionHead, PhotoCard, SidePanel, EgyptMap, ViewAll, CircleTile, ImportantNoticeBox,
  AppPromoCard, BandPromo, type CardItem, type Chip,
} from "@/components/layout/InnerPage";
import { askConcierge } from "@/components/layout/MainNav";
import mfa from "@/assets/home/world.jpg";
import tourism from "@/assets/gov/luxor.jpg";
import gafi from "@/assets/home/inv-opps.jpg";
import cbe from "@/assets/home/biz-support.jpg";
import cairoGov from "@/assets/gov/cairo.jpg";
import heroImage from "@/assets/inner/gov-hero.jpg";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export type GovEntity = {
  id: string;
  category_en: string;
  category_ar: string;
  entity_name_en: string;
  entity_name_ar: string | null;
  description_en: string | null;
  official_url: string | null;
  verification_status: string;
  sort_order: number;
};

const title = "Egypt Official Government Directory | Egyptora Hub";
const description =
  "Official Egyptian government entities — presidency, cabinet, ministries, authorities and agencies — with direct links to their official websites.";

export const slugifyCategory = (category: string) =>
  category
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const Route = createFileRoute("/government-directory")({
  loader: async () => {
    let entities: GovEntity[] = [];
    try {
      const { data, error } = await supabase
        .from("government_entities")
        .select(
          "id, category_en, category_ar, entity_name_en, entity_name_ar, description_en, official_url, verification_status, sort_order",
        )
        .order("sort_order");
      if (error) {
        console.error("[government-directory] failed to load entities:", error.message);
      } else {
        entities = (data ?? []) as GovEntity[];
      }
    } catch (err) {
      console.error("[government-directory] unexpected error:", err);
    }
    return { entities };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/government-directory` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/government-directory` }],
  }),
  component: GovernmentDirectoryPage,
});

const categoryIcon = (category: string) => {
  const key = category.toLowerCase();
  if (key.includes("presidency")) return ShieldCheck;
  if (key.includes("ministr")) return Landmark;
  if (key.includes("authorit")) return Building2;
  if (key.includes("governorate")) return MapPin;
  if (key.includes("tourism")) return Plane;
  if (key.includes("invest") || key.includes("business")) return Briefcase;
  return Sparkles;
};

function EntityRow({ entity }: { entity: GovEntity }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3 text-start"
      >
        <span className="grid min-w-0 flex-1 gap-0.5">
          <span className="truncate font-display text-sm text-foreground">
            {entity.entity_name_en}
          </span>
          {entity.entity_name_ar ? (
            <span className="truncate text-xs text-muted-foreground" dir="rtl">
              {entity.entity_name_ar}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>
      {open ? (
        <div className="grid gap-3 border-t border-border px-4 py-4">
          {entity.description_en ? (
            <p className="text-sm leading-relaxed text-muted-foreground">{entity.description_en}</p>
          ) : null}
          {entity.official_url ? (
            <a
              href={entity.official_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-xs font-semibold text-primary-foreground"
            >
              {t("Visit Official Website")} <ExternalLink className="size-3.5" />
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

const GD = "/government-directory";

const chips: Chip[] = [
  { label: "All Entities", Icon: LayoutGrid },
  { label: "Ministries", Icon: Landmark, to: `${GD}#ministries` },
  { label: "Regulatory Bodies", Icon: Scale, to: `${GD}#authorities-and-agencies` },
  { label: "Related Entities", Icon: Link2 },
  { label: "Governorates", Icon: MapIcon, to: "/explore-egypt" },
  { label: "Public Services", Icon: Users, to: `${GD}/digital-services` },
  { label: "Economic Authorities", Icon: TrendingUp, to: `${GD}#investment-and-business` },
  { label: "Judicial Bodies", Icon: Gavel },
  { label: "Diplomatic Missions", Icon: Globe2 },
  { label: "Educational Institutions", Icon: GraduationCap, to: "/research-programs" },
];

const featuredSpec: { title: string; match: RegExp; desc: string; img: string; badge: string; fallback: string }[] = [
  { title: "Ministry of Foreign Affairs", match: /foreign affairs/i, desc: "Egypt's foreign policy, consular and diplomatic services.", img: mfa, badge: "Ministry", fallback: "https://www.mfa.gov.eg" },
  { title: "Ministry of Tourism & Antiquities", match: /tourism/i, desc: "Tourism development and protection of Egypt's heritage.", img: tourism, badge: "Ministry", fallback: "https://mota.gov.eg" },
  { title: "General Authority for Investment (GAFI)", match: /GAFI|general authority for investment/i, desc: "The official gateway for investors and company setup.", img: gafi, badge: "Authority", fallback: "https://www.gafi.gov.eg" },
  { title: "Central Bank of Egypt", match: /central bank/i, desc: "Monetary policy, banking supervision and exchange rates.", img: cbe, badge: "Regulatory", fallback: "https://www.cbe.org.eg" },
  { title: "Cairo Governorate", match: /cairo governorate/i, desc: "Local services and administration for the capital.", img: cairoGov, badge: "Governorate", fallback: "https://www.cairo.gov.eg" },
];

const ministries: { label: string; Icon: typeof Landmark; match: RegExp }[] = [
  { label: "Foreign Affairs", Icon: Globe2, match: /foreign affairs/i },
  { label: "Tourism & Antiquities", Icon: Landmark, match: /tourism/i },
  { label: "Trade & Industry", Icon: Factory, match: /industry/i },
  { label: "Investment & Foreign Trade", Icon: TrendingUp, match: /investment/i },
  { label: "Health & Population", Icon: Hospital, match: /health/i },
  { label: "Education", Icon: BookOpen, match: /education/i },
  { label: "Housing", Icon: Home, match: /housing/i },
  { label: "Transport", Icon: Bus, match: /transport/i },
  { label: "Finance", Icon: Wallet, match: /finance/i },
  { label: "Interior", Icon: ShieldCheck, match: /interior/i },
];

const DS = `${GD}/digital-services`;
const services = [
  { label: "Passport Renewal", Icon: Stamp },
  { label: "National ID", Icon: IdCard },
  { label: "Business Registration", Icon: Briefcase },
  { label: "Driving License", Icon: Car },
  { label: "Property Registration", Icon: Home },
  { label: "Tax Filing", Icon: Receipt },
  { label: "Visa Services", Icon: Plane },
  { label: "Birth Certificate", Icon: Baby },
  { label: "Marriage Certificate", Icon: Heart },
  { label: "Customs Clearance", Icon: Package },
];

function FindServicesForm({ categories }: { categories: string[] }) {
  const { t } = useI18n();
  const [cat, setCat] = useState("");
  const [gov, setGov] = useState("");
  const [type, setType] = useState("");
  const sel = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-navy";
  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const parts = [type, cat, gov].filter(Boolean).map((x) => t(x));
        askConcierge(parts.length ? `${t("Find government services")}: ${parts.join(", ")}` : t("Find government services"));
      }}
    >
      <select aria-label={t("Category")} value={cat} onChange={(e) => setCat(e.target.value)} className={sel}>
        <option value="">{t("Category")}</option>
        {categories.map((c) => <option key={c} value={c}>{t(c)}</option>)}
      </select>
      <select aria-label={t("Governorate")} value={gov} onChange={(e) => setGov(e.target.value)} className={sel}>
        <option value="">{t("Governorate")}</option>
        {["Cairo", "Giza", "Alexandria", "Luxor", "Aswan", "Red Sea", "South Sinai"].map((g) => <option key={g} value={g}>{t(g)}</option>)}
      </select>
      <select aria-label={t("Service Type")} value={type} onChange={(e) => setType(e.target.value)} className={sel}>
        <option value="">{t("Service Type")}</option>
        {services.map((s) => <option key={s.label} value={s.label}>{t(s.label)}</option>)}
      </select>
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gold-cta px-5 py-2.5 text-sm font-semibold text-primary-foreground">
        <Search className="size-4" /> {t("Search")}
      </button>
    </form>
  );
}

function GovernmentDirectoryPage() {
  const { entities } = Route.useLoaderData();
  const { t } = useI18n();

  const categories = useMemo(() => {
    const map = new Map<string, { en: string; ar: string; slug: string; rows: GovEntity[] }>();
    for (const e of entities) {
      const existing = map.get(e.category_en);
      if (existing) existing.rows.push(e);
      else map.set(e.category_en, { en: e.category_en, ar: e.category_ar, slug: slugifyCategory(e.category_en), rows: [e] });
    }
    return Array.from(map.values());
  }, [entities]);

  /* Homepage links land here with a #category hash — scroll to it. */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [categories]);

  const findUrl = (re: RegExp) => entities.find((e) => re.test(e.entity_name_en) && e.official_url)?.official_url ?? null;
  const featured: CardItem[] = featuredSpec.map((f) => ({
    title: f.title, desc: f.desc, img: f.img, badge: f.badge, to: findUrl(f.match) ?? f.fallback,
  }));
  const ministriesSlug = categories.find((c) => /ministr/i.test(c.en))?.slug ?? "ministries";
  const ministryRows = categories.find((c) => /ministr/i.test(c.en))?.rows ?? [];

  return (
    <InnerPage
      pageName="Government Directory"
      hero={{
        image: heroImage,
        title: "Government Directory",
        subtitle: "One Point of Access to Official Egypt.",
        body: "Find official government entities, their responsibilities and direct links to their services.",
        placeholder: "Search ministries, entities, or services…",
        tagline: ["People", "Services", "A stronger tomorrow"],
      }}
      chips={chips}
      moreTo={`${GD}#all-entities`}
      notice={<ImportantNoticeBox />}
      sidebar={
        <>
          <SidePanel title="Find Government Services">
            <FindServicesForm categories={categories.map((c) => c.en)} />
          </SidePanel>
          <SidePanel title="Egypt Map – Government Entities">
            <EgyptMap pins={["Alexandria", "Cairo", "New Capital", "Suez", "Luxor", "Aswan"]} />
            <div className="mt-3">
              <ViewAll to="/explore-egypt" label="Explore the Map" />
            </div>
          </SidePanel>
          <SidePanel title="Directory at a glance">
            <dl className="grid grid-cols-3 gap-2 text-center">
              {[
                ["Entities", entities.length],
                ["Categories", categories.length],
                ["Verified", entities.filter((e) => e.verification_status === "Verified").length],
              ].map(([l, v]) => (
                <div key={l} className="rounded-lg bg-bg-band p-2">
                  <dt className="text-[10px] uppercase text-text-body">{t(String(l))}</dt>
                  <dd className="font-display text-xl font-bold text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </SidePanel>
        </>
      }
      bottom={
        <div className="grid gap-4 md:grid-cols-2">
          <BandPromo Icon={Headphones} title="Need Help Finding a Service?" body="Tell us what you are looking for and we will point you to the right official body." cta="Contact Us" to="/contact" />
          <AppPromoCard />
        </div>
      }
    >
      <section>
        <SectionHead title="Featured Entities" body="Quick access to key government entities in Egypt." to={`${GD}#all-entities`} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c) => <PhotoCard key={c.title} c={c} h="h-32" />)}
        </div>
      </section>

      <section>
        <SectionHead title="Browse by Ministry" to={`${GD}#${ministriesSlug}`} />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-5">
          {ministries.map((m) => {
            const url = ministryRows.find((e) => m.match.test(e.entity_name_en) && e.official_url)?.official_url;
            return <CircleTile key={m.label} label={m.label} Icon={m.Icon} to={url ?? `${GD}#${ministriesSlug}`} />;
          })}
        </div>
      </section>

      <section>
        <SectionHead title="Most Searched Services" to={DS} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((s) => (
            <a
              key={s.label}
              href={DS}
              className="flex items-center gap-2.5 rounded-[10px] border border-border bg-card px-3 py-3 text-xs font-semibold text-navy shadow-sm transition-colors hover:border-shell-gold"
            >
              <s.Icon className="size-4 shrink-0 text-shell-gold" />
              <span className="min-w-0">{t(s.label)}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="all-entities" className="scroll-mt-28">
        <SectionHead title="All Government Entities" body="Every entity links straight to its own official website." />
        {categories.length === 0 ? (
          <p className="text-sm text-text-body">{t("No entries yet.")}</p>
        ) : (
          <div className="grid gap-10">
            {categories.map((c) => {
              const Icon = categoryIcon(c.en);
              return (
                <div key={c.en} id={c.slug} className="grid scroll-mt-28 gap-4">
                  <div className="flex items-center gap-3 border-b border-border pb-3">
                    <Icon className="size-5 text-shell-gold" />
                    <h3 className="font-display text-lg font-bold text-navy sm:text-xl">{t(c.en)}</h3>
                    <span className="ms-auto text-xs text-text-body">{c.rows.length}</span>
                  </div>
                  <div className="grid gap-3 xl:grid-cols-2">
                    {c.rows.map((e) => <EntityRow key={e.id} entity={e} />)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </InnerPage>
  );
}
