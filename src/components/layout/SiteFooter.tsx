import { Mail } from "lucide-react";
import type { SVGProps } from "react";

function AppleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.8-3.5.8s-1.8-.8-3-.8c-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .8 1.1 1.7 2.3 2.9 2.2 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.2 0 2-1.1 2.8-2.2.9-1.3 1.2-2.5 1.2-2.6-.1 0-2.4-.9-2.4-3.4ZM14.2 5.9c.6-.8 1-1.9.9-3-.9 0-2 .6-2.7 1.4-.6.7-1.1 1.8-.9 2.9 1 .1 2-.5 2.7-1.3Z" />
    </svg>
  );
}

function GooglePlayIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.6 2.3Zm11.1 6.5L5.5 3.5l8.4 8.4.8-.8.9-.9-1-.9.1-.5Zm.9 3.9-.9-.9-8.4 8.4 9.2-5.3.1-2.2Zm3.9-2.9-2.6-1.5-1.1 1.1 1.6 1.6-1.6 1.6 1.1 1.1 2.6-1.5c.8-.4.8-1.6 0-2.4Z" />
    </svg>
  );
}

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
            <p className="mt-2 text-xs text-muted-foreground/80">
              {t("Egypt One is a brand operated by")} {SITE.parentCompany}.
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
          <div className="text-start">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold/80">
              {t("Download the app")}
            </h3>
            <ul className="mt-4 flex flex-nowrap items-center justify-start gap-3">
              {[
                { label: "App Store", Icon: AppleIcon },
                { label: "Google Play", Icon: GooglePlayIcon },
              ].map(({ label, Icon }) => (
                <li key={label}>
                  <span
                    title={t(label)}
                    aria-label={t(label)}
                    className="group grid size-14 place-items-center rounded-full border border-gold-line/60 bg-card/70 text-gold transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-line hover:bg-gold hover:text-background hover:shadow-[0_10px_24px_-14px_color-mix(in_oklab,var(--gold)_60%,transparent)]"
                  >
                    <Icon className="size-7" />
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
              © {new Date().getFullYear()} {SITE.parentCompany}. {t("All rights reserved.")}{" "}
              <span className="text-muted-foreground/80">
                {t("Egypt One is a brand of")} {SITE.parentCompany}.
              </span>
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
