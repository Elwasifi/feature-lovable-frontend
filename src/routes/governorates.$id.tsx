import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Landmark, MapPin, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeader, GoldButton, GhostButton } from "@/components/site/Primitives";
import { useI18n } from "@/i18n";
import { mailto, SITE } from "@/config/site";
import { governorates } from "@/data/governorates";
import { governorateProfiles, type Bilingual } from "@/data/governorate-profiles";
import { supabase } from "@/integrations/supabase/client";

// Real place records for the "#places" section below, loaded from Supabase (public.destinations).
// This is separate from `governorates.ts`'s own `sites` array, which stays as-is and keeps
// powering the interactive map on the homepage (see src/components/site/EgyptMap.tsx) — that
// map is untouched by this change.
type GovernorateDestination = {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string | null;
  lat: number | null;
  lng: number | null;
};

export const Route = createFileRoute("/governorates/$id")({
  loader: async ({ params }) => {
    const gov = governorates.find((g) => g.id === params.id);
    const profile = governorateProfiles[params.id];
    if (!gov || !profile) throw notFound();

    // Wrapped in try/catch on purpose: never fail the page render over this — a thrown
    // exception from the client (network failure, cold connection, lazy init) would
    // otherwise crash the whole route to the generic error boundary.
    let destinations: GovernorateDestination[] = [];
    try {
      const { data, error } = await supabase
        .from("destinations")
        .select("id, slug, name, category, summary, lat, lng")
        .eq("governorate_slug", gov.id)
        .order("name");

      if (error) {
        console.error(
          `[governorates.$id] failed to load destinations for ${gov.id}:`,
          error.message,
        );
      } else {
        destinations = (data ?? []) as GovernorateDestination[];
      }
    } catch (err) {
      console.error(`[governorates.$id] unexpected error loading destinations for ${gov.id}:`, err);
    }

    return {
      name: gov.name,
      tagline: profile.tagline.en,
      story: profile.story.en,
      id: gov.id,
      destinations,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Governorate unavailable | Egypt One" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.name} — ${loaderData.tagline} | Egypt One`;
    const description = loaderData.story.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE.url}/governorates/${loaderData.id}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE.url}/governorates/${loaderData.id}` }],
    };
  },
  notFoundComponent: GovernorateNotFound,
  component: GovernoratePage,
});

function GovernorateNotFound() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Section className="py-24 text-center">
        <h1 className="font-display text-3xl text-gold">{t("Governorate not found")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          <Link to="/" className="text-gold underline">
            {t("Back to the national gateway")}
          </Link>
        </p>
      </Section>
      <SiteFooter />
    </div>
  );
}

function GovernoratePage() {
  const { id } = Route.useParams();
  const { destinations } = Route.useLoaderData();
  const { t, lang } = useI18n();
  const gov = governorates.find((g) => g.id === id)!;
  const profile = governorateProfiles[id]!;
  const pick = (b: Bilingual) => (lang === "ar" ? b.ar : b.en);

  const neighbours = governorates.filter((g) => g.region === gov.region && g.id !== gov.id).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <section className="relative">
          <img
            src={profile.image}
            alt={`${gov.name} — ${profile.tagline.en}`}
            width={1280}
            height={720}
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
                {t(gov.region)} · {t("Capital")}: {t(gov.capital)}
              </p>
              <h1 className="font-display text-3xl leading-tight text-foreground sm:text-4xl lg:text-6xl">
                {t(gov.name)}
              </h1>
              <p className="mt-2 text-sm text-gold/90 lg:text-base">{pick(profile.tagline)}</p>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/85 lg:text-base">
                {pick(profile.story)}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <GoldButton href={mailto(`Plan a trip to ${gov.name}`)}>{t("Plan a visit")}</GoldButton>
                <GhostButton href="#places">{t("See top places")}</GhostButton>
              </div>
            </div>
          </div>
        </section>

        <Section className="py-10 lg:py-14">
          <div className="grid gap-3 sm:grid-cols-3">
            {profile.highlights.map((h) => (
              <div key={h.en} className="rounded-2xl border border-gold-line bg-card p-5">
                <Sparkles className="size-4 text-gold" />
                <div className="mt-2 text-sm text-foreground/90">{pick(h)}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-border/70 bg-surface-2 p-6">
            <h2 className="font-display text-xl text-gold">{t("A short history")}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/85">
              {pick(profile.history)}
            </p>
          </div>
        </Section>

        <Section id="places" className="py-10 lg:py-14">
          <SectionHeader
            eyebrow={t("Where to go")}
            title={`${t("Famous places in")} ${t(gov.name)}`}
            description={t("Archaeological, touristic and leisure landmarks mapped for your itinerary.")}
          />
          {destinations.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinations.map((dest) => (
                <article
                  key={dest.id}
                  className="group overflow-hidden rounded-2xl border border-border/70 bg-card"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={profile.image}
                      alt={dest.name}
                      loading="lazy"
                      width={1280}
                      height={720}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/85 to-transparent" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-foreground">
                      <Landmark className="size-4 shrink-0 text-gold" /> {t(dest.name)}
                    </div>
                    {dest.summary ? (
                      <p className="mt-1 text-[11px] text-muted-foreground">{t(dest.summary)}</p>
                    ) : dest.lat != null && dest.lng != null ? (
                      <p className="mt-1 text-[11px] text-muted-foreground">
                        {dest.lat.toFixed(3)}°N · {dest.lng.toFixed(3)}°E
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">
              {t("Places for this governorate are being added — check back soon.")}
            </p>
          )}
        </Section>

        <Section className="py-10 lg:py-16">
          <SectionHeader eyebrow={t("Nearby")} title={t("More in this region")} />
          <div className="mt-5 flex flex-wrap gap-2">
            {neighbours.map((g) => (
              <Link
                key={g.id}
                to="/governorates/$id"
                params={{ id: g.id }}
                className="rounded-full border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-gold-line hover:text-gold"
              >
                {t(g.name)}
              </Link>
            ))}
          </div>
          <div className="mt-6">
            <Link
              to="/"
              hash="explore"
              className="inline-flex items-center gap-2 rounded-xl border border-gold-line bg-gold-soft px-4 py-2 text-sm font-semibold text-gold"
            >
              <MapPin className="size-4" /> {t("Back to the 27 governorates map")}{" "}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
