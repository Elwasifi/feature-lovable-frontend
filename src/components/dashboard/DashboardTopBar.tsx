import { ArrowLeft, ArrowRight, Heart, Menu, Search } from "lucide-react";
import { NotificationsBell } from "@/components/site/NotificationsBell";
import { useAuth } from "@/hooks/use-auth";
import { Link, useRouter } from "@tanstack/react-router";
import logo from "@/assets/egyptora-hub-logo.png.asset.json";
import { SITE } from "@/config/site";
import { AuthButtons } from "@/components/site/AuthButtons";
import { CurrencySwitcher } from "@/components/site/CurrencySwitcher";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { useI18n } from "@/i18n";
import { topTabs } from "@/data/site";
import { cn } from "@/lib/utils";

export function DashboardTopBar({
  onMenu,
  showBack = false,
}: {
  onMenu: () => void;
  showBack?: boolean;
}) {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const router = useRouter();
  const BackIcon = lang === "ar" ? ArrowRight : ArrowLeft;
  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.history.back();
    else router.navigate({ to: "/" });
  };
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-3 py-3 sm:gap-3 sm:px-4 lg:px-6">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-2.5">
          <img
            src={logo.url}
            alt={`${SITE.name} logo`}
            width={40}
            height={40}
            className="size-9 shrink-0 rounded-full ring-1 ring-gold-line sm:size-10"
          />
          <span className="hidden min-w-0 leading-tight lg:block">
            <span className="block truncate font-display text-sm tracking-[0.22em] text-foreground">
              EGYPTORA <span className="text-gold">HUB</span>
            </span>
            <span className="block truncate text-[10px] tracking-[0.1em] text-muted-foreground">
              {t(SITE.tagline)}
            </span>
          </span>
        </Link>


        {/* Search field hidden until a real search feature exists. */}
        <div />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher compact />
          <CurrencySwitcher compact />
          {user && (
            <Link
              to="/saved"
              aria-label={t("Saved items")}
              className="hidden size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold sm:grid"
            >
              <Heart className="size-4" />
            </Link>
          )}
          <NotificationsBell className="hidden sm:block" />
          <AuthButtons />
        </div>
      </div>

      <label className="relative mx-3 mb-2 flex items-center md:hidden">
        <Search className="pointer-events-none absolute start-4 size-4 text-muted-foreground" />
        <input
          id="mobile-search"
          type="search"
          placeholder={t("Search Egyptora Hub")}
          className="h-10 w-full rounded-full border border-border bg-card/70 ps-11 pe-4 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold-line"
        />
      </label>

      <div className="flex items-center gap-2 overflow-x-auto px-4 pb-3 lg:px-6 [scrollbar-width:none]">
        <button
          onClick={onMenu}
          aria-label={t("Open menu")}
          className="grid size-9 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold-line hover:text-gold"
        >
          <Menu className="size-4" />
        </button>
        {showBack && (
          <button
            type="button"
            onClick={goBack}
            aria-label={t("Back")}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-gold-line bg-gold-soft px-3 py-2 text-xs font-medium text-gold transition-colors hover:bg-gold-soft/80"
          >
            <BackIcon className="size-4" />
            <span className="hidden sm:inline">{t("Back")}</span>
          </button>
        )}
        {topTabs.map((tab, i) => {
          const className = cn(
            "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors",
            i === 0
              ? "border-gold-line bg-gold-soft text-gold"
              : "border-border text-muted-foreground hover:border-gold-line hover:text-foreground",
          );
          // Real routes navigate client-side; in-page anchors stay plain links.
          return tab.to ? (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any -- static, typed route paths
            <Link key={tab.label} to={tab.to as any} className={className}>
              {t(tab.label)}
            </Link>
          ) : (
            <a key={tab.label} href={tab.href} className={className}>
              {t(tab.label)}
            </a>
          );
        })}
      </div>
    </header>
  );
}
