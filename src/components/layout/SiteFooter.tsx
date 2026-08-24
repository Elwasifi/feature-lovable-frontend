import { Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/egypt-one-logo.jpg.asset.json";
import { Container } from "@/components/site/Primitives";
import { footerColumns, govIntegrations } from "@/data/site";
import { useI18n } from "@/i18n";
import { SITE, mailto } from "@/config/site";
import { SocialBar } from "@/components/layout/SocialBar";


const legalLinks = [
  { label: "Terms & Conditions", to: "/legal/terms" },
  { label: "Privacy Policy", to: "/legal/privacy" },
  { label: "Cookie Policy", to: "/legal/cookies" },
  { label: "Data Protection", to: "/legal/data-protection" },
  { label: "Accessibility", to: "/legal/accessibility" },
  { label: "Legal Disclaimer", to: "/legal/disclaimer" },
];

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-sidebar">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(5,1fr)] lg:gap-x-10">
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
            <ul className="mt-4 flex flex-nowrap items-center gap-2">
              {[
                { label: "App Store", Icon: AppleIcon },
                { label: "Google Play", Icon: GooglePlayIcon },
              ].map(({ label, Icon }) => (
                <li key={label}>
                  <span
                    title={t(label)}
                    aria-label={t(label)}
                    className="group grid size-9 place-items-center rounded-full border border-gold-line/60 bg-card/70 text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-line hover:bg-gold hover:text-background hover:shadow-[0_10px_24px_-14px_color-mix(in_oklab,var(--gold)_60%,transparent)]"
                  >
                    <Icon className="size-[15px]" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <SocialBar />

      <div className="border-t border-border/70 bg-background/40">
        <Container className="py-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {SITE.name}. {t("All rights reserved.")}
            </p>
            <nav aria-label={t("Legal")}>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {legalLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-xs text-muted-foreground transition-colors hover:text-gold"
                    >
                      {t(l.label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground/80">
            {t("Content shown on this preview is demonstration data unless labelled otherwise.")}{" "}
            {t(
              "All legal documents are drafts pending review by qualified Egyptian legal counsel and do not guarantee compliance with Egyptian or international law.",
            )}
          </p>
        </Container>
      </div>
    </footer>
  );
}
