import {
  Building2,
  CalendarDays,
  Compass,
  CreditCard,
  Gem,
  Headphones,
  Landmark,
  MapPinned,
  Plane,
  Ship,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";
import { sidebarGroups } from "@/data/site";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const groupIcons = [Plane, Compass, Building2, Headphones];

const itemIcons = [
  Sparkles,
  Landmark,
  Plane,
  MapPinned,
  Compass,
  Ship,
  Gem,
  Utensils,
  CalendarDays,
  CreditCard,
];

const badgeStyles: Record<string, string> = {
  AI: "border-info/40 bg-info/10 text-info",
  New: "border-success/40 bg-success/10 text-success",
  Hot: "border-hot/40 bg-hot/10 text-hot",
};

export function AppRail({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();
  return (
    <>
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm",
          open ? "block" : "hidden",
        )}
      />
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-50 w-[272px] shrink-0 overflow-y-auto border-e border-border/70 bg-sidebar transition-transform duration-300",
          open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full",
        )}
      >
        <div className="flex items-center gap-3 border-b border-sidebar-border px-4 py-4">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold/70">
            {t("Menu")}
          </span>
          <button
            onClick={onClose}
            aria-label={t("Close menu")}
            className="ms-auto grid size-8 shrink-0 place-items-center rounded-full border border-sidebar-border text-muted-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="px-3 py-4">
          {sidebarGroups.map((group, gi) => {
            const GroupIcon = groupIcons[gi % groupIcons.length]!;
            return (
              <div key={t(group.title)} className="mb-5">
                <p className="mb-2 flex items-center gap-2 px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold/70">
                  <GroupIcon className="size-3.5" />
                  {t(group.title)}
                </p>
                <ul className="grid gap-0.5">
                  {group.items.map((item, ii) => {
                    const Icon = itemIcons[(gi * 3 + ii) % itemIcons.length]!;
                    return (
                      <li key={item.label}>
                        <a
                          href="#explore"
                          onClick={onClose}
                          className="group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent hover:text-foreground"
                        >
                          <Icon className="size-4 shrink-0 text-muted-foreground group-hover:text-gold" />
                          <span className="min-w-0 flex-1 truncate">{t(item.label)}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                "shrink-0 rounded-full border px-1.5 py-0.5 text-[9px] font-semibold uppercase",
                                badgeStyles[item.badge],
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          <div className="mt-2 rounded-xl border border-gold-line bg-gold-soft p-4">
            <p className="font-display text-sm text-gold">{t("Egypt One Pass")}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {t("One digital pass for attractions, rewards and partner benefits.")}
            </p>
            <a
              href="#programmes"
              onClick={onClose}
              className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-gold px-3 py-2 text-xs font-semibold text-primary-foreground"
            >
              {t("Explore Pass")}
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
