import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeader, GoldButton, SourceBadge } from "@/components/site/Primitives";
import { encChapters, type EncChapter } from "@/data/encyclopedia";
import { SITE, mailto } from "@/config/site";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const title = "Visual Encyclopedia of Egypt — dress, food, flags, epics & science | Egypt One";
const description =
  "A visual encyclopedia of Egypt: traditional dress in all 27 governorates, the Egyptian table, flags and state symbols, epic battles, ancient provinces, crafts, the genetic map and Egyptian cinema.";

export const Route = createFileRoute("/encyclopedia")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/encyclopedia` },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `${SITE.url}/og-image.jpg` },
      { name: "twitter:image", content: `${SITE.url}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/encyclopedia` }],
  }),
  component: EncyclopediaPage,
});

const heroChapter = encChapters[0]!;

function EncyclopediaPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-gold-line">
          <img
            src={heroChapter.cover}
            alt={t("Traditional Egyptian dress of all 27 governorates")}
            width={1600}
            height={900}
            className="h-[42vh] min-h-[300px] w-full object-cover opacity-70"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, var(--background) 8%, color-mix(in oklab, var(--background) 80%, transparent) 50%, color-mix(in oklab, var(--background) 45%, transparent) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0">
            <div className="mx-auto w-full max-w-[1360px] px-5 pb-8 lg:px-10 lg:pb-12">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                {t("Visual encyclopedia")}
              </p>
              <h1 className="max-w-3xl font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
                {t("Egypt through the ages — people, dress, food, symbols and science")}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/85 lg:text-base">
                {t(
                  "Eight illustrated chapters that turn a national archive into something you can browse, plan a trip around and invest in. Every plate is documented, every era is placed, and every chapter connects to a live part of the platform.",
                )}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {encChapters.map((c) => (
                  <a
                    key={c.id}
                    href={`#${c.id}`}
                    className="rounded-full border border-gold-line bg-card/70 px-3 py-1.5 text-xs text-foreground/85 backdrop-blur transition-colors hover:bg-gold-soft"
                  >
                    {t(c.eyebrow)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {encChapters.map((chapter, i) => (
          <Chapter key={chapter.id} chapter={chapter} index={i} />
        ))}

        <Section className="pb-20 pt-4">
          <div className="rounded-3xl border border-gold-line bg-card p-8 text-center lg:p-12">
            <h2 className="font-display text-2xl text-foreground lg:text-3xl">
              {t("Bring a chapter to life with us")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {t(
                "Museums, producers, studios and investors can license, extend or sponsor any chapter of the visual encyclopedia.",
              )}
            </p>
            <div className="mt-6 flex justify-center">
              <GoldButton href={mailto("Visual Encyclopedia partnership")}>
                {t("Talk to the heritage desk")}
              </GoldButton>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Chapter({ chapter, index }: { chapter: EncChapter; index: number }) {
  const { t } = useI18n();

  return (
    <Section
      id={chapter.id}
      className={cn("py-12 lg:py-16", index % 2 === 1 && "bg-surface-2/40")}
    >
      <SectionHeader
        eyebrow={t(chapter.eyebrow)}
        title={t(chapter.title)}
        description={t(chapter.tagline)}
        action={<SourceBadge status={chapter.api.startsWith("REAL") ? "VERIFIED" : "PLANNED"} />}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        <p className="text-sm leading-relaxed text-foreground/85 lg:text-base">{t(chapter.story)}</p>
        <div className="grid content-start gap-3">
          {chapter.stats.map((s) => (
            <div
              key={s.label}
              className="flex items-baseline justify-between gap-4 rounded-2xl border border-gold-line bg-card px-4 py-3"
            >
              <span className="font-display text-xl text-gold">{t(s.value)}</span>
              <span className="text-right text-xs text-muted-foreground">{t(s.label)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {chapter.plates.map((plate) => (
          <figure
            key={plate.caption}
            className={cn(
              "group overflow-hidden rounded-2xl border border-border/70 bg-card",
              plate.wide && "md:col-span-2",
            )}
          >
            <img
              src={plate.image}
              alt={t(plate.alt)}
              loading="lazy"
              width={1200}
              height={600}
              className="w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <figcaption className="border-t border-border/60 px-4 py-3">
              <div className="text-sm font-semibold text-foreground">{t(plate.caption)}</div>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{t(plate.note)}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <ArrowRight className="h-3.5 w-3.5 text-gold" aria-hidden />
        {chapter.api}
      </div>
    </Section>
  );
}
