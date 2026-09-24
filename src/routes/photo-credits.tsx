import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeader } from "@/components/site/Primitives";
import credits from "@/data/photo-credits.json";
import { useI18n } from "@/i18n";

type Credit = { title: string; page: string; license: string; author: string };

export const Route = createFileRoute("/photo-credits")({
  head: () => ({
    meta: [
      { title: "Photo Credits — Egyptora Hub" },
      { name: "description", content: "Sources, authors and licences for the photographs used across Egyptora Hub." },
      { property: "og:title", content: "Photo Credits — Egyptora Hub" },
      { property: "og:description", content: "Sources, authors and licences for the photographs used across Egyptora Hub." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PhotoCredits,
});

function PhotoCredits() {
  const { t } = useI18n();
  const rows = Object.values(credits as Record<string, Credit>);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Section>
        <SectionHeader
          title="Photo Credits"
          description="Photographs are sourced from Wikimedia Commons under the licences shown. Logos remain the property of their owners."
        />
        <ul className="divide-y divide-border rounded-xl border border-border">
          {rows.map((c) => (
            <li key={c.page} className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <a href={c.page} target="_blank" rel="noreferrer noopener" className="font-medium text-navy hover:text-shell-gold">
                {c.title.replace(/^File:/, "").replace(/\.\w+$/, "")}
              </a>
              <span className="text-xs text-muted-foreground">
                {c.author ? `${c.author} · ` : ""}
                {c.license} · {t("Wikimedia Commons")}
              </span>
            </li>
          ))}
        </ul>
      </Section>
      <SiteFooter />
    </div>
  );
}
