import { createFileRoute, notFound } from "@tanstack/react-router";
import { Quote, Star } from "lucide-react";
import { Section, SourceBadge } from "@/components/site/Primitives";
import { GovernanceBanner, type GovernanceStatus } from "@/components/site/GovernanceBanner";
import {
  BackLink,
  ChipList,
  DetailNotFound,
  DetailShell,
  Fact,
  FactGrid,
  ImageStrip,
} from "@/components/site/DetailPrimitives";
import { SaveButton } from "@/components/site/SaveButton";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { useLocalizedRow } from "@/lib/localized-content";

type TravellerStory = {
  id: string;
  slug: string;
  name: string;
  country: string | null;
  group_type: string | null;
  destinations: string[] | null;
  rating: number | null;
  positives: string[] | null;
  negatives: string[] | null;
  suggestions: string[] | null;
  media_type: string | null;
  moderation_state: string | null;
  summary: string | null;
  description: string | null;
  images: string[] | null;
  tags: string[] | null;
  governance_status: GovernanceStatus;
};

// Same tolerant check the list page uses, so a story that is visible in the list is
// also reachable on its own page (and an unpublished one is not).
const isPublished = (state: string | null) =>
  typeof state === "string" && /publish|approved/i.test(state);

export const Route = createFileRoute("/traveler-stories_/$id")({
  loader: async ({ params }) => {
    // Wrapped in try/catch on purpose: a thrown exception (network failure, cold
    // connection) would otherwise crash the route to the generic error boundary.
    let story: TravellerStory | null = null;
    try {
      const { data, error } = await supabase
        .from("traveller_stories")
        .select(
          "id, slug, name, country, group_type, destinations, rating, positives, negatives, suggestions, media_type, moderation_state, summary, description, images, tags, governance_status",
        )
        .eq("id", params.id)
        .maybeSingle();

      if (error) {
        console.error(`[traveler-stories.$id] failed to load ${params.id}:`, error.message);
      } else {
        const row = (data as TravellerStory | null) ?? null;
        story = row && isPublished(row.moderation_state) ? row : null;
      }
    } catch (err) {
      console.error(`[traveler-stories.$id] unexpected error loading ${params.id}:`, err);
    }

    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Story unavailable | Egyptora Hub" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { story } = loaderData;
    const title = `${story.name} | Egyptora Hub`;
    const description = (story.summary ?? story.description ?? story.name).slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `${SITE.url}/traveler-stories/${story.id}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${SITE.url}/traveler-stories/${story.id}` }],
    };
  },
  notFoundComponent: StoryNotFound,
  component: StoryDetailPage,
});

function StoryNotFound() {
  const { t } = useI18n();
  return <DetailNotFound backTo="/traveler-stories" backLabel={t("Back to traveller stories")} />;
}

function Stars({ rating }: { rating: number | null }) {
  if (rating === null) return null;
  const rounded = Math.round(rating);
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={cn("size-4", n <= rounded ? "fill-gold text-gold" : "text-muted-foreground")}
        />
      ))}
    </span>
  );
}

function StoryDetailPage() {
  const { story: storySource } = Route.useLoaderData();
  const story = useLocalizedRow("traveller_stories", storySource);
  const { t } = useI18n();

  return (
    <DetailShell>
      <Section className="py-10 lg:py-14">
        <BackLink to="/traveler-stories" label={t("Back to traveller stories")} />

        <GovernanceBanner status={story.governance_status} className="mt-5" />

        <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
          <h1 className="flex items-center gap-2.5 font-display text-3xl text-foreground lg:text-4xl">
            <Quote className="size-6 shrink-0 text-gold" />
            {t(story.name)}
          </h1>
          <SourceBadge status="DEMO" />
        </div>

        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          {story.country && t(story.country)}
          {story.group_type && (
            <>
              {story.country && "·"}
              {t(story.group_type)}
            </>
          )}
          <Stars rating={story.rating} />
        </p>

        <ImageStrip images={story.images} alt={story.name} />

        <SaveButton
          className="mt-6"
          itemType="traveller_story"
          itemId={story.id}
          itemName={story.name}
          itemImage={story.images?.[0] ?? null}
        />

        {story.summary && (
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground/85">
            {t(story.summary)}
          </p>
        )}
        {story.description && (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {t(story.description)}
          </p>
        )}

        <FactGrid>
          <Fact label={t("Country")} value={story.country ? t(story.country) : null} />
          <Fact label={t("Travellers")} value={story.group_type ? t(story.group_type) : null} />
          <Fact label={t("Rating")} value={story.rating !== null ? `${story.rating}/5` : null} />
          <Fact label={t("Media")} value={story.media_type ? t(story.media_type) : null} />
        </FactGrid>

        <ChipList label={t("Destinations")} items={story.destinations} />
        <ChipList label={t("What worked well")} items={story.positives} />
        <ChipList label={t("What could be better")} items={story.negatives} />
        <ChipList label={t("Suggestions")} items={story.suggestions} />
        <ChipList label={t("Tags")} items={story.tags} />
      </Section>
    </DetailShell>
  );
}
