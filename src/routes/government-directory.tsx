import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Briefcase,
  Building2,
  ChevronDown,
  ExternalLink,
  Info,
  Landmark,
  LayoutGrid,
  MapPin,
  Mail,
  Plane,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  BlockHeader,
  CategoryTabs,
  FeaturedRow,
  HeroSearch,
  PageTemplate,
  type CategoryTab,
} from "@/components/layout/PageTemplate";
import {
  SidebarContactCard,
  SidebarLinkCard,
  SidebarPromoCard,
} from "@/components/layout/SidebarWidgets";
import heroImage from "@/assets/gov/cairo.jpg";
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

function FeaturedEntityCard({ entity }: { entity: GovEntity }) {
  const { t } = useI18n();
  const Icon = categoryIcon(entity.category_en);
  return (
    <article className="grid content-start gap-2 rounded-2xl border border-border bg-card p-5">
      <Icon className="size-5 text-gold" />
      <h3 className="font-display text-base leading-snug text-foreground">
        {entity.entity_name_en}
      </h3>
      {entity.entity_name_ar ? (
        <p className="text-xs text-muted-foreground" dir="rtl">
          {entity.entity_name_ar}
        </p>
      ) : null}
      {entity.description_en ? (
        <p className="line-clamp-3 text-xs leading-relaxed text-muted-foreground">
          {entity.description_en}
        </p>
      ) : null}
      {entity.official_url ? (
        <a
          href={entity.official_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-gold"
        >
          {t("Visit Official Website")} <ExternalLink className="size-3.5" />
        </a>
      ) : null}
    </article>
  );
}

function GovernmentDirectoryPage() {
  const { entities } = Route.useLoaderData();
  const { t } = useI18n();
  const [active, setActive] = useState("ALL");

  const categories = useMemo(() => {
    const map = new Map<string, { en: string; ar: string; slug: string; rows: GovEntity[] }>();
    for (const e of entities) {
      const existing = map.get(e.category_en);
      if (existing) existing.rows.push(e);
      else
        map.set(e.category_en, {
          en: e.category_en,
          ar: e.category_ar,
          slug: slugifyCategory(e.category_en),
          rows: [e],
        });
    }
    return Array.from(map.values());
  }, [entities]);

  /* Homepage links land here with a #category hash — honour it. */
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && categories.some((c) => c.slug === hash)) setActive(hash);
  }, [categories]);

  const tabs: CategoryTab[] = [
    { id: "ALL", label: "All Categories", labelAr: "جميع الفئات", icon: LayoutGrid },
    ...categories.map((c) => ({
      id: c.slug,
      label: c.en,
      labelAr: c.ar,
      icon: categoryIcon(c.en),
    })),
  ];

  const visible = active === "ALL" ? categories : categories.filter((c) => c.slug === active);
  const featured = entities
    .filter((e) => e.verification_status === "Verified" && e.official_url)
    .slice(0, 6);

  return (
    <PageTemplate
      hero={
        <HeroSearch
          title="Egypt Official Government Directory"
          subtitle="Your direct access to official government entities and information."
          description="One place. All official links. A more connected Egypt."
          image={heroImage}
          imageAlt={t("Cairo government district")}
          placeholder="Search for a government entity, service or keyword..."
          breadcrumb={[{ label: "Home", to: "/" }, { label: "Government Directory" }]}
          sideNote={["People", "Services", "A stronger tomorrow"]}
        />
      }
      tabs={<CategoryTabs tabs={tabs} active={active} onSelect={setActive} />}
      sidebar={
        <>
          <SidebarPromoCard
            title="All government links in one place"
            description="Every entity below links straight to its own official website."
            stats={[
              { label: "Entities", value: String(entities.length) },
              { label: "Categories", value: String(categories.length) },
              { label: "Verified", value: String(entities.filter((e) => e.verification_status === "Verified").length) },
            ]}
          />
          <SidebarLinkCard
            title="Popular government services"
            description="Direct routes to the services people ask about most."
            links={[
              { label: "Passports & Immigration", icon: Plane, soon: true },
              { label: "Tax Services", icon: Briefcase, soon: true },
              { label: "Civil Status", icon: ShieldCheck, soon: true },
              { label: "Real Estate Registration", icon: Building2, soon: true },
              { label: "Business Licensing", icon: Landmark, soon: true },
            ]}
          />
          <SidebarLinkCard
            title="Find your way around Egypt"
            links={[
              { label: "Governorates", icon: MapPin, to: "/governorates" },
              { label: "Invest in Egypt", icon: Briefcase, to: "/investment-opportunities" },
              { label: "Real Estate", icon: Building2, to: "/properties" },
            ]}
          />
          <SidebarContactCard
            title="Need help finding an entity?"
            description="Tell us what you are looking for and we will point you to the right official body."
            actionLabel="Contact us"
            actionTo="/contact"
          />
        </>
      }
    >
      {featured.length > 0 && (
        <section>
          <BlockHeader
            title="Featured Government Entities"
            description="Quick access to the most important government entities in Egypt."
          />
          <FeaturedRow>
            {featured.map((e) => (
              <FeaturedEntityCard key={e.id} entity={e} />
            ))}
          </FeaturedRow>
        </section>
      )}

      <section>
        <BlockHeader
          title="Browse by Category"
          description="Explore all government entities by category."
        />
        {visible.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("No entries yet.")}</p>
        ) : (
          <div className="grid gap-10">
            {visible.map((c) => {
              const Icon = categoryIcon(c.en);
              return (
                <div key={c.en} id={c.slug} className="grid scroll-mt-28 gap-4">
                  <div className="flex items-center gap-3 border-b border-border pb-3">
                    <Icon className="size-5 text-gold" />
                    <h3 className="font-display text-lg text-foreground sm:text-xl">{c.en}</h3>
                    <span className="text-xs text-muted-foreground" dir="rtl">
                      {c.ar}
                    </span>
                    <span className="ms-auto text-xs text-muted-foreground">{c.rows.length}</span>
                  </div>
                  <div className="grid gap-3 xl:grid-cols-2">
                    {c.rows.map((e) => (
                      <EntityRow key={e.id} entity={e} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 size-5 shrink-0 text-gold" />
          <div className="grid gap-1.5">
            <h2 className="font-display text-base text-foreground">{t("Important Notice")}</h2>
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t(
                "Egyptora Hub is an independent private platform and is not a governmental entity. Links to government entities and official services are provided for information and accessibility purposes only. Users are redirected to the relevant official government websites, subject to the applicable terms, conditions, laws and regulations.",
              )}
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-1 inline-flex w-fit items-center gap-1.5 text-xs font-semibold text-gold"
            >
              <Mail className="size-3.5" /> {SITE.email}
            </a>
          </div>
        </div>
      </section>
    </PageTemplate>
  );
}
