import { ArrowLeft, ArrowRight, Bell, Heart, Menu, Search } from "lucide-react";
import { Link, useRouter } from "@tanstack/react-router";
import logo from "@/assets/egypt-one-logo.jpg.asset.json";
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
              EGYPT <span className="text-gold">ONE</span>
            </span>
            <span className="block truncate text-[10px] tracking-[0.1em] text-muted-foreground">
              {t(SITE.tagline)}
            </span>
          </span>
        </Link>


        <label className="relative hidden min-w-0 items-center md:flex" id="search">
          <Search className="pointer-events-none absolute left-4 size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder={t("Search destinations, attractions, hotels…")}
            className="h-11 w-full max-w-2xl rounded-full border border-border bg-card/70 pl-11 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold-line"
          />
        </label>
        <div className="md:hidden" />

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher compact />
          <CurrencySwitcher compact />
          <button
            type="button"
            aria-label={t("Search")}
            onClick={() => {
              const el = document.getElementById("mobile-search") as HTMLInputElement | null;
              el?.scrollIntoView({ block: "center", behavior: "smooth" });
              el?.focus();
            }}
            className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold md:hidden"
          >
            <Search className="size-4" />
          </button>
          <button
            aria-label={t("Wishlist")}
            className="hidden size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold sm:grid"
          >
            <Heart className="size-4" />
          </button>
          <button
            aria-label={t("Notifications")}
            className="relative hidden size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-gold sm:grid"
          >
            <Bell className="size-4" />
            <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-primary-foreground">
              3
            </span>
          </button>
          <AuthButtons />
        </div>
      </div>

      <label className="relative mx-3 mb-2 flex items-center md:hidden">
        <Search className="pointer-events-none absolute start-4 size-4 text-muted-foreground" />
        <input
          id="mobile-search"
          type="search"
          placeholder={t("Search Egypt One")}
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
        {topTabs.map((tab, i) => (
          <a
            key={tab}
            href="/#explore"
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors",
              i === 0
                ? "border-gold-line bg-gold-soft text-gold"
                : "border-border text-muted-foreground hover:border-gold-line hover:text-foreground",
            )}
          >
            {t(tab)}
          </a>
        ))}
      </div>
    </header>
  );
}
