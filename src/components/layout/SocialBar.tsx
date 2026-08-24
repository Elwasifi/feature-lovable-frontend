import { Facebook, Instagram, Youtube } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { Container } from "@/components/site/Primitives";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M16.5 3c.3 2.1 1.6 3.6 3.7 3.9v2.5c-1.4.1-2.7-.3-3.9-1.1v5.4c0 3.6-2.6 5.9-5.7 5.9-3 0-5.6-2.4-5.6-5.6 0-3.4 2.9-6 6.4-5.5v2.7c-.4-.1-.8-.2-1.2-.2-1.6 0-2.9 1.3-2.9 3s1.3 3 2.9 3c1.6 0 3-1.2 3-2.9V3h3.3Z" />
    </svg>
  );
}

function XIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.5 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.7 21H2.6l7-8L2.4 3h6.2l4.2 5.6L17.5 3Zm-1.1 16.1h1.7L7.7 4.8H5.9l10.5 14.3Z" />
    </svg>
  );
}

type Social = {
  label: string;
  handle: string;
  href: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const socials: Social[] = [
  { label: "Facebook", handle: "@egyptone", href: SITE.social.facebook, Icon: Facebook },
  { label: "TikTok", handle: "@egyptone", href: SITE.social.tiktok, Icon: TikTokIcon },
  { label: "Instagram", handle: "@egyptone", href: SITE.social.instagram, Icon: Instagram },
  { label: "X", handle: "@egyptone", href: SITE.social.x, Icon: XIcon },
  { label: "YouTube", handle: "@egyptone", href: SITE.social.youtube, Icon: Youtube },
];

export function SocialBar() {
  const { t } = useI18n();
  return (
    <section className="relative overflow-hidden border-t border-gold-line/40 bg-sidebar/60 py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
      />
      <Container>
        <div className="flex flex-col items-center gap-7 lg:flex-row lg:justify-between">
          <div className="text-center lg:text-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold/80">
              {t("Follow Egypt One")}
            </p>
            <h2 className="mt-2 font-display text-xl text-foreground">
              {t("One nation, every channel")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {t("Daily stories, live journeys and cultural moments across our official platforms.")}
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-center gap-3">
            {socials.map(({ label, handle, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${label} — ${handle}`}
                  className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-border/70 bg-card/70 px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-line hover:shadow-[0_14px_36px_-18px_color-mix(in_oklab,var(--gold)_55%,transparent)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(120px 60px at 20% 0%, color-mix(in oklab, var(--gold) 16%, transparent), transparent 70%)",
                    }}
                  />
                  <span className="relative grid size-10 place-items-center rounded-full border border-gold-line/60 bg-background/70 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-background">
                    <Icon className="size-[18px]" />
                  </span>
                  <span className="relative hidden leading-tight sm:block">
                    <span className="block text-sm font-medium text-foreground">{label}</span>
                    <span className="block text-[11px] text-muted-foreground" dir="ltr">
                      {handle}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
