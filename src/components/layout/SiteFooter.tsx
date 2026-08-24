import { Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/egypt-one-logo.jpg.asset.json";
import { Container } from "@/components/site/Primitives";
import { footerColumns, govIntegrations } from "@/data/site";
import { useI18n } from "@/i18n";
import { SITE, mailto } from "@/config/site";
import { SocialBar } from "@/components/layout/SocialBar";


export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-sidebar">
      <SocialBar />
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-x-10">
          <div>
            <div className="flex items-center gap-3">
              <img
                src={logo.url}
                alt={`${SITE.name} logo`}
                width={44}
                height={44}
                className="size-11 rounded-full ring-1 ring-gold-line"
              />
              <span>
                <span className="block font-display text-base tracking-[0.2em] text-foreground">
                  EGYPT <span className="text-gold">ONE</span>
                </span>
                <span className="block text-[10px] tracking-[0.12em] text-muted-foreground">
                  {t(SITE.tagline)}
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t(
                "A unified digital gateway presenting Egypt's destinations, heritage, culture and investment landscape through one platform.",
              )}
            </p>
            <a
              href={mailto("Egypt One — general enquiry")}
              className="mt-4 inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
              <span dir="ltr">{SITE.email}</span>
            </a>
            <p className="mt-1 text-xs text-muted-foreground" dir="ltr">
              {SITE.domain}
            </p>
          </div>


          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80">
                {t(col.title)}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t(link.label)}
                      </Link>
                    ) : (
                      <a
                        href={link.href ?? mailto(`Egypt One — ${link.label}`)}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {t(link.label)}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80">
              {t("Government integration")}
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {govIntegrations.map((g) => (
                <li
                  key={g}
                  className="rounded-full border border-border/70 bg-card px-3 py-1.5 text-[11px] text-muted-foreground"
                >
                  {t(g)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80">
              {t("Download the app")}
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {["App Store", "Google Play", "AppGallery"].map((store) => (
                <span
                  key={store}
                  className="rounded-xl border border-border/70 bg-card px-4 py-2.5 text-xs text-muted-foreground"
                >
                  {t(store)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. {t("All rights reserved.")}
          </p>
          <p className="text-xs text-muted-foreground">
            {t("Content shown on this preview is demonstration data unless labelled otherwise.")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
