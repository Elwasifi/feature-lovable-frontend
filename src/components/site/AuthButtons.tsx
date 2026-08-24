import { Link } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/** Sign in / Create account controls — collapses to a dashboard link once signed in. */
export function AuthButtons({ className }: { className?: string }) {
  const { t } = useI18n();
  const { user, loading } = useAuth();

  if (loading) return <div className={cn("h-10 w-24", className)} />;

  if (user) {
    return (
      <Link
        to="/account"
        className={cn(
          "flex items-center gap-2 rounded-full border border-gold-line bg-gold-soft px-3.5 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-primary-foreground",
          className,
        )}
      >
        <LayoutDashboard className="size-4" />
        <span className="hidden sm:inline">{t("My dashboard")}</span>
      </Link>
    );
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link
        to="/auth"
        className="flex items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-gold-line hover:text-gold"
      >
        <LogIn className="size-4" />
        <span className="hidden sm:inline">{t("Sign in")}</span>
      </Link>
      <Link
        to="/auth"
        className="flex items-center gap-2 rounded-full bg-gold px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        <UserPlus className="size-4" />
        <span className="hidden sm:inline">{t("Create account")}</span>
      </Link>
    </div>
  );
}
