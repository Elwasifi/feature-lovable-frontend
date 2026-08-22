import {
  Bell,
  Compass,
  Globe,
  Heart,
  Home,
  LifeBuoy,
  Map,
  Menu,
  Search,
  Sparkles,
  Tag,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", icon: Home, active: true },
  { label: "Discover", icon: Compass },
  { label: "Map", icon: Map },
  { label: "AI Concierge", icon: Sparkles },
  { label: "Deals", icon: Tag },
  { label: "Events", icon: Ticket },
  { label: "Support", icon: LifeBuoy },
];

export function TopBar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={onMenu}
          className="rounded-md p-2 text-muted-foreground hover:text-foreground lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="size-5" />
        </button>

        <label className="relative hidden min-w-0 flex-1 max-w-sm items-center sm:flex">
          <Search className="pointer-events-none absolute start-3 size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Explore Egypt..."
            className="h-10 w-full rounded-full border border-input bg-card ps-9 pe-4 text-sm outline-none placeholder:text-muted-foreground focus:border-gold-line focus:ring-2 focus:ring-ring"
          />
        </label>

        <nav className="hidden flex-1 items-center justify-center gap-1 xl:flex">
          {navItems.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors",
                active
                  ? "bg-gold-soft text-gold"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <Icon className="size-4" />
              {label}
            </a>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-1">
          <button className="flex items-center gap-1 rounded-full px-2 py-2 text-xs text-muted-foreground hover:text-foreground">
            <Globe className="size-4" /> EN
          </button>
          <button
            className="rounded-full p-2 text-muted-foreground hover:text-foreground"
            aria-label="Wishlist"
          >
            <Heart className="size-4" />
          </button>
          <button
            className="relative rounded-full p-2 text-muted-foreground hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="size-4" />
            <span className="absolute end-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-hot text-[9px] font-bold text-foreground">
              12
            </span>
          </button>
          <div className="ms-2 hidden items-center gap-2 md:flex">
            <div className="text-end leading-tight">
              <div className="text-xs font-medium">Welcome, Ahmed</div>
              <div className="text-[10px] text-gold">Gold Member</div>
            </div>
            <div className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-gold to-hot text-xs font-bold text-primary-foreground">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
