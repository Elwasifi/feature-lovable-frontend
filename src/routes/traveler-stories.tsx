import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeader, SourceBadge } from "@/components/site/Primitives";
import { GovernanceBanner, type GovernanceStatus } from "@/components/site/GovernanceBanner";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

type TravellerStory = {
  id: string;
  slug: string;
  name: string;
  country: string | null;
  group_type: string | null;
  rating: number | null;
  summary: string | null;
  moderation_state: string | null;
  governance_status: GovernanceStatus;
};

// The exact raw `moderation_state` string stored by the moderation workflow wasn't
// available to verify at write time, so this check is intentionally tolerant of
// casing/wording variants ("Published", "published", "APPROVED", "Approved", ...)
// rather than an exact-match `.eq()` filter that could silently hide every row if the
// real value doesn't match what we guessed. Tighten this to an exact match once the
// real enum value is confirmed.
const isPublished = (state: string | null) =>
  typeof state === "string" && /publish|approved/i.test(state);

const title = "Traveller Stories — real trips across Egypt | Egypt One";
const description =
  "Traveller stories and reviews from real trips across Egypt, by country of origin and traveller group.";

export const Route = createFileRoute("/traveler-stories")({
  loader: async () => {
    // Wrapped in try/catch on purpose: a *thrown* exception from the client (a network
    // failure, a cold Supabase connection) is not caught by only checking `error`, and
    // would crash the whole route to the generic "This page didn't load" error boundary
    // instead of just rendering with an empty list.
    let stories: TravellerStory[] = [];
    try {
      const { data, error } = await supabase
        .from("traveller_stories")
        .select(
          "id, slug, name, country, group_type, rating, summary, moderation_state, governance_status",
        )
        .order("name");

      if (error) {
        console.error("[traveler-stories] failed to load traveller_stories:", error.message);
      } else {
        stories = ((data ?? []) as TravellerStory[]).filter((s) => isPublished(s.moderation_state));
      }
    } catch (err) {
      console.error("[traveler-stories] unexpected error loading traveller_stories:", err);
    }
    return { stories };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE.url}/traveler-stories` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/traveler-stories` }],
  }),
  component: TravelerStoriesPage,
});

function Stars({ rating }: { rating: number | null }) {
  if (rating === null) return null;
  const rounded = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn("size-3.5", n <= rounded ? "fill-gold text-gold" : "text-muted-foreground")}
        />
      ))}
    </span>
  );
}

function TravelerStoriesPage() {
  const { stories } = Route.useLoaderData();
  const { t } = useI18n();
  const [groupType, setGroupType] = useState<string | null>(null);

  const groupTypes = useMemo(
    () =>
      Array.from(new Set(stories.map((s) => s.group_type).filter((v): v is string => !!v))).sort(),
    [stories],
  );
  const filtered = groupType ? stories.filter((s) => s.group_type === groupType) : stories;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Section>
        <SectionHeader
          eyebrow="Plan your trip"
          title="Traveller stories"
          description="Traveller stories and reviews from real trips across Egypt."
        />

        <div className="mb-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setGroupType(null)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs transition-colors",
              groupType === null
                ? "border-gold-line bg-gold-soft text-gold"
                : "border-border/60 text-muted-foreground hover:border-gold-line hover:text-gold",
            )}
          >
            {t("All travellers")}
          </button>
          {groupTypes.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroupType(g)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs transition-colors",
                groupType === g
                  ? "border-gold-line bg-gold-soft text-gold"
                  : "border-border/60 text-muted-foreground hover:border-gold-line hover:text-gold",
              )}
            >
              {t(g)}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((story) => (
              <article
                key={story.id}
                className="rounded-2xl border border-border/60 bg-card/60 p-5 transition-colors hover:border-gold-line"
              >
                <GovernanceBanner status={story.governance_status} className="mb-3" />
                <div className="flex items-start justify-between gap-3">
                  <h2 className="flex items-center gap-2 font-display text-base text-foreground">
                    <Quote className="size-4 shrink-0 text-gold" />
                    {t(story.name)}
                  </h2>
                  <SourceBadge status="DEMO" />
                </div>

                <p className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {story.country && t(story.country)}
                  {story.group_type && (
                    <>
                      {story.country && "·"}
                      {t(story.group_type)}
                    </>
                  )}
                  <Stars rating={story.rating} />
                </p>

                {story.summary && (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {t(story.summary)}
                  </p>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border/60 bg-card/40 p-8 text-center text-sm text-muted-foreground">
            {t("No traveller stories match this filter yet.")}
          </p>
        )}
      </Section>
      <SiteFooter />
    </div>
  );
}
