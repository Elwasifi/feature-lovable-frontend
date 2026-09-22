import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, ExternalLink, Landmark } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
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
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
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

function GovernmentDirectoryPage() {
  const { entities } = Route.useLoaderData();
  const { t } = useI18n();

  const categories = useMemo(() => {
    const map = new Map<string, { en: string; ar: string; rows: GovEntity[] }>();
    for (const e of entities) {
      const existing = map.get(e.category_en);
      if (existing) existing.rows.push(e);
      else map.set(e.category_en, { en: e.category_en, ar: e.category_ar, rows: [e] });
    }
    return Array.from(map.values());
  }, [entities]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto grid w-full max-w-[1360px] gap-10 px-4 py-12 lg:px-8">
        <header className="grid gap-3">
          <h1 className="font-display text-3xl leading-tight text-foreground lg:text-4xl">
            {t("Egypt Official Government Directory")}
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {t(
              "Access Egyptian government entities, ministries, authorities and services in one place.",
            )}
          </p>
          <p className="text-xs text-muted-foreground">
            {entities.length} {t("entities")}
          </p>
        </header>

        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("No entries yet.")}</p>
        ) : (
          categories.map((c) => (
            <section key={c.en} id={slugifyCategory(c.en)} className="grid gap-4 scroll-mt-28">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <Landmark className="size-5 text-gold" />
                <h2 className="font-display text-xl text-foreground lg:text-2xl">{c.en}</h2>
                <span className="text-xs text-muted-foreground" dir="rtl">
                  {c.ar}
                </span>
                <span className="ms-auto text-xs text-muted-foreground">{c.rows.length}</span>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {c.rows.map((e) => (
                  <EntityRow key={e.id} entity={e} />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
