import { Link } from "@tanstack/react-router";
import { Bot, Circle, X } from "lucide-react";
import { sidebarGroups } from "@/data/site";
import { cn } from "@/lib/utils";

function BadgePill({ kind }: { kind: "New" | "Hot" | "AI" }) {
  const styles = {
    New: "bg-success/20 text-success",
    Hot: "bg-hot/20 text-hot",
    AI: "bg-gold-soft text-gold",
  } as const;
  return (
    <span
      className={cn(
        "ms-auto rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide",
        styles[kind],
      )}
    >
      {kind}
    </span>
  );
}

export function AppSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          "fixed inset-y-0 start-0 z-50 w-[264px] overflow-y-auto border-e border-sidebar-border bg-sidebar transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full rtl:translate-x-full",
        )}
      >
        <div className="flex items-center gap-2 px-5 py-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-lg bg-gold-soft text-gold">
              <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
                <path d="M12 2 3 21h18L12 2Zm0 6.6L16.6 19H7.4L12 8.6Z" />
              </svg>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base tracking-[0.14em] text-gold">
                EGYPT ONE
              </span>
              <span className="block text-[10px] text-muted-foreground">
                One Egypt. One Journey.
              </span>
            </span>
          </Link>
          <button
            onClick={onClose}
            className="ms-auto rounded-md p-1 text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>

        <nav className="pb-6">
          {sidebarGroups.map((group) => (
            <div key={group.title} className="mt-4">
              <h2 className="px-5 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-gold/80">
                {group.title}
              </h2>
              <ul className="space-y-0.5 px-2">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <a
                      href="#"
                      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent hover:text-foreground"
                    >
                      <Circle className="size-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                      <span className="truncate">{item.label}</span>
                      {item.badge && <BadgePill kind={item.badge} />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="mx-3 mb-6 rounded-xl border border-gold-line bg-surface-2 p-4">
          <div className="flex items-center gap-2 text-gold">
            <Bot className="size-5" />
            <span className="text-xs font-semibold uppercase tracking-[0.14em]">AI Concierge</span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Your personal assistant for everything in Egypt.
          </p>
          <button className="mt-3 w-full rounded-lg border border-gold-line bg-gold-soft px-3 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-primary-foreground">
            Open AI Concierge
          </button>
        </div>
      </aside>
    </>
  );
}
