import { Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import { useState, type ComponentType, type SVGProps } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/egyptora-hub-logo.png.asset.json";
import { Container } from "@/components/site/Primitives";
import { useI18n } from "@/i18n";
import { SITE, mailto } from "@/config/site";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

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

/** Social order is fixed by the brand brief. LinkedIn has no official page yet. */
const socials: { label: string; href?: string; Icon: IconType }[] = [
  { label: "Facebook", href: SITE.social.facebook, Icon: Facebook },
  { label: "Instagram", href: SITE.social.instagram, Icon: Instagram },
  { label: "LinkedIn", Icon: Linkedin },
  { label: "YouTube", href: SITE.social.youtube, Icon: Youtube },
  { label: "X (Twitter)", href: SITE.social.x, Icon: XIcon },
  { label: "TikTok", href: SITE.social.tiktok, Icon: TikTokIcon },
];

type FLink = { label: string; to?: string; href?: string; soon?: boolean };

const exploreLinks: FLink[] = [
  { label: "Explore Egypt", to: "/encyclopedia" },
  { label: "Live in Egypt", to: "/properties" },
  { label: "Invest in Egypt", to: "/investment-opportunities" },
  { label: "Do Business", to: "/providers" },
  { label: "Visit Egypt", to: "/offers" },
  { label: "Government Directory", to: "/government-directory" },
];

const aboutLinks: FLink[] = [
  { label: "About Egyptora", to: "/legal" },
  { label: "Our Mission", soon: true },
  { label: "Vision & Values", soon: true },
  { label: "Contact Us", to: "/contact" },
  { label: "FAQ", soon: true },
  { label: "Terms of Use", to: "/legal/terms" },
  { label: "Privacy Policy", to: "/legal/privacy" },
  { label: "Press & Media", href: mailto("Egyptora Hub — Press & Media") },
];

const linkCls = "text-sm text-foreground/75 transition-colors hover:text-shell-gold";

function FooterLink({ link }: { link: FLink }) {
  const { t } = useI18n();
  if (link.to)
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- static route paths
      <Link to={link.to as any} className={linkCls}>
        {t(link.label)}
      </Link>
    );
  if (link.href)
    return (
      <a href={link.href} className={linkCls}>
        {t(link.label)}
      </a>
    );
  return (
    <span className="inline-flex items-center gap-2 text-sm text-foreground/50">
      {t(link.label)}
      <span className="rounded border border-border px-1.5 py-0.5 text-[9px] uppercase tracking-wide">
        {t("Coming soon")}
      </span>
    </span>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-base font-semibold text-foreground">{children}</h3>;
}

/** Decorative gold skyline: pyramids + tower line-art with script "Egypt". */
function Skyline() {
  const { t } = useI18n();
  return (
    <div aria-hidden className="hidden text-shell-gold xl:block">
      <svg viewBox="0 0 220 90" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-56">
        <path d="M4 84h212" />
        <path d="M14 84 44 44l30 40M52 84l30-46 30 46M100 84l18-24 18 24" />
        <path d="M44 44l-6 40M82 38l-8 46" opacity=".5" />
        <path d="M168 84V30l4-10 4 10v54M164 44h16M162 58h20M166 30h12" />
        <path d="M172 20v-10" />
        <path d="M150 84V66h8v18M186 84V70h10v14" opacity=".7" />
      </svg>
      <p className="mt-1 font-display text-3xl italic">{t("Egypt")}</p>
      <p className="text-[11px] tracking-wide text-foreground/70">{t("More Than a Destination")}</p>
      <p className="text-[11px] tracking-wide text-foreground/70">{t("A Brighter Tomorrow")}</p>
    </div>
  );
}

function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  return (
    <div>
      <ColumnTitle>{t("Stay Connected")}</ColumnTitle>
      <p className="mt-4 text-sm text-foreground/75">{t("Subscribe to our updates")}</p>
      <form
        className="mt-3 flex max-w-sm gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (!email.trim()) return;
          window.location.href = `${mailto("Newsletter subscription")}&body=${encodeURIComponent(
            `Please subscribe this address to Egyptora Hub updates: ${email.trim()}`,
          )}`;
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("Your email address")}
          aria-label={t("Your email address")}
          className="min-w-0 flex-1 rounded-lg bg-primary-foreground px-3 py-2.5 text-sm text-navy outline-none placeholder:text-text-body"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-gold-cta px-4 py-2.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t("Subscribe")}
        </button>
      </form>

      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-shell-gold">
        {t("Download the app")}
      </p>
      <ul className="mt-3 flex items-center gap-3">
        {[
          { label: "App Store", Icon: AppleIcon },
          { label: "Google Play", Icon: GooglePlayIcon },
        ].map(({ label, Icon }) => (
          <li key={label}>
            <span
              title={t(label)}
              aria-label={t(label)}
              className="grid size-11 place-items-center rounded-full border border-shell-gold/60 text-shell-gold"
            >
              <Icon className="size-5" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="on-dark bg-navy-deep text-foreground">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] xl:grid-cols-[1.5fr_1fr_1fr_1.4fr_auto] lg:gap-x-10">
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
                  EGYPTORA <span className="text-shell-gold">HUB</span>
                </span>
                <span className="block text-[10px] tracking-[0.12em] text-foreground/70">
                  {t(SITE.tagline)}
                </span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foreground/75">
              {t(
                "A private platform connecting the world to Egypt's opportunities, people and possibilities.",
              )}
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={label}
                      title={label}
                      className="grid size-9 place-items-center rounded-full border border-foreground/70 text-foreground transition-colors hover:border-shell-gold hover:text-shell-gold"
                    >
                      <Icon className="size-4" />
                    </a>
                  ) : (
                    <span
                      aria-label={`${label} — ${t("Coming soon")}`}
                      title={`${label} — ${t("Coming soon")}`}
                      className="grid size-9 place-items-center rounded-full border border-foreground/40 text-foreground/50"
                    >
                      <Icon className="size-4" />
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>{t("Explore")}</ColumnTitle>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink link={l} />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <ColumnTitle>{t("About")}</ColumnTitle>
            <ul className="mt-4 space-y-2.5">
              {aboutLinks.map((l) => (
                <li key={l.label}>
                  <FooterLink link={l} />
                </li>
              ))}
            </ul>
          </div>

          <Newsletter />
          <Skyline />
        </div>
      </Container>

      <div className="border-t border-border">
        <Container className="flex flex-col gap-2 py-5 text-xs text-foreground/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.parentCompany}. {t("All rights reserved.")}
          </p>
          <nav aria-label={t("Legal")} className="flex flex-wrap gap-x-4 gap-y-1">
            {[
              ["Legal Center", "/legal"],
              ["Cookie Policy", "/legal/cookies"],
              ["Accessibility", "/legal/accessibility"],
              ["Partner With Us", "/partners"],
            ].map(([label, to]) => (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any -- static route paths
              <Link key={to} to={to as any} className="hover:text-shell-gold">
                {t(label!)}
              </Link>
            ))}
          </nav>
          <p>
            {t("A Private Platform")} | {t("Your Gateway to Egypt")}
          </p>
        </Container>
      </div>
    </footer>
  );
}
