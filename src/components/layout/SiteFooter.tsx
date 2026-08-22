import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { footerColumns } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="mt-6 border-t border-border bg-sidebar px-4 py-10">
      <div className="grid gap-8 lg:grid-cols-[1.3fr_repeat(5,1fr)]">
        <div>
          <div className="font-display text-lg tracking-[0.14em] text-gold">EGYPT ONE</div>
          <p className="mt-1 text-xs text-muted-foreground">
            One Egypt. One Journey. One Platform.
          </p>
          <div className="mt-4 flex gap-2">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid size-8 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold-line hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {footerColumns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold/80">
              {col.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
        <p className="text-xs text-muted-foreground">
          © 2026 Egypt One Platform. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
          <span className="rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground">
            App Store
          </span>
          <span className="rounded-lg border border-border px-3 py-2 text-[11px] text-muted-foreground">
            Google Play
          </span>
          <span className="rounded-lg border border-gold-line bg-gold-soft px-3 py-2 text-[11px] text-gold">
            Government Integration
          </span>
        </div>
      </div>
    </footer>
  );
}
