import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

/**
 * Mirrors the `governance_status` column present on every migrated
 * Supabase content table: governorates, destinations, heritage_sites, museums, events, eras,
 * rulers, heritage_worldwide, research_programs, traveller_stories, properties, offers,
 * countries, investment_opportunities, providers.
 *
 *   PUBLIC_CONTENT          -> pure reference/editorial content, always safe to show fully.
 *   PENDING_GOVERNMENT_LINK -> a real-world entity (hotel, guide, investment opportunity...)
 *                              whose licensing/booking integration with the competent
 *                              authority is not connected yet.
 *   LIVE                    -> connected to a verified, government-approved or licensed source.
 *
 * When a real integration goes live for a table, flip its rows to 'LIVE' in Supabase — the
 * banner and the `isTransactable` gate below both react automatically, no code change needed.
 */
export type GovernanceStatus = "PUBLIC_CONTENT" | "PENDING_GOVERNMENT_LINK" | "LIVE" | string;

const PENDING_MESSAGE =
  "Pending approval from the competent authority and connection with the relevant entity. Figures shown here are indicative demo content, not a live offer.";

/**
 * Renders nothing for PUBLIC_CONTENT or LIVE rows — only PENDING_GOVERNMENT_LINK gets the banner.
 * Place this at the top of any card, list item, or page section that reads from a table carrying
 * `governance_status`.
 */
export function GovernanceBanner({
  status,
  className,
}: {
  status: GovernanceStatus;
  className?: string;
}) {
  const { t } = useI18n();
  if (status !== "PENDING_GOVERNMENT_LINK") return null;

  return (
    <div
      role="note"
      className={cn(
        "flex items-start gap-2.5 rounded-xl border border-hot/30 bg-hot/10 px-3.5 py-2.5",
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-hot" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-foreground/85 lg:text-[13px]">
        {t(PENDING_MESSAGE)}
      </p>
    </div>
  );
}

/**
 * Gate for any purchase/booking/payment action tied to a row with a governance_status.
 * Only 'LIVE' rows may expose a real transaction — PENDING_GOVERNMENT_LINK and
 * PUBLIC_CONTENT (which shouldn't have transactional actions to begin with) both return false.
 * Use this instead of re-deriving the same condition inline at each call site.
 */
export function isTransactable(status: GovernanceStatus): boolean {
  return status === "LIVE";
}
