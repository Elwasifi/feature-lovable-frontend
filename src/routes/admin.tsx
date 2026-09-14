import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const LINKS = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/bookings", label: "Bookings", exact: false },
  { to: "/admin/content", label: "Content", exact: false },
  { to: "/admin/users", label: "Users", exact: false },
] as const;

function AdminLayout() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">
            {SITE.name} · {t("Admin")}
          </span>
          <nav className="flex flex-wrap items-center gap-1">
            {LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.exact }}
                activeProps={{ className: "border-gold/60 bg-gold/10 text-gold" }}
                inactiveProps={{ className: "border-transparent text-muted-foreground hover:text-foreground" }}
                className="rounded-full border px-3.5 py-1.5 text-sm transition-colors"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>
          <Link
            to="/"
            className="ms-auto flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-gold"
          >
            <ExternalLink className="size-3.5" />
            {t("View site")}
          </Link>
        </div>
      </header>

      <Outlet />
    </div>
  );
}
