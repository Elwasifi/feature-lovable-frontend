import { createFileRoute } from "@tanstack/react-router";
import { Globe, Mail } from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Section, SectionHeader } from "@/components/site/Primitives";
import { SITE, mailto } from "@/config/site";
import { useI18n } from "@/i18n";

const title = "Contact Egyptora Hub — Talk to the platform team";
const description =
  "Reach the Egyptora Hub team about travel, heritage content, partnerships, investment enquiries and press. Email info@egyptora-hub.com.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${SITE.url}/contact` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: `${SITE.url}/og-image.jpg` },
      { name: "twitter:image", content: `${SITE.url}/og-image.jpg` },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/contact` }],
  }),
  component: Contact,
});

const topics: { label: string; subject: string; address?: string }[] = [
  { label: "General enquiry", subject: "Egyptora Hub — general enquiry" },
  { label: "Partnerships", subject: "Egyptora Hub — partnership enquiry" },
  { label: "Investment", subject: "Egyptora Hub — investment enquiry" },
  {
    label: "Press & media",
    subject: "Egyptora Hub — press enquiry",
    address: SITE.marketingEmail,
  },
  {
    label: "Marketing & advertising",
    subject: "Egyptora Hub — marketing enquiry",
    address: SITE.marketingEmail,
  },
  { label: "Content correction", subject: "Egyptora Hub — content correction" },
  { label: "Report an issue", subject: "Egyptora Hub — report an issue" },
];


function Contact() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Section>
          <SectionHeader
            eyebrow={t("Contact")}
            title={t("Talk to the Egyptora Hub team")}
            description={t("One address handles every enquiry while the platform is in build. We reply from the same team that maintains the content.")}
          />
          <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
            <div className="rounded-2xl border border-gold-line bg-card p-7">
              <Mail className="size-5 text-gold" />
              <a
                href={mailto("Egyptora Hub — general enquiry")}
                className="mt-4 block font-display text-2xl text-foreground hover:text-gold"
                dir="ltr"
              >
                {SITE.email}
              </a>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("Marketing & press")}:{" "}
                <a
                  href={mailto("Egyptora Hub — marketing enquiry", SITE.marketingEmail)}
                  className="text-gold hover:text-foreground"
                  dir="ltr"
                >
                  {SITE.marketingEmail}
                </a>
              </p>
              <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="size-4 text-gold" />
                <span dir="ltr">{SITE.domain}</span>
              </p>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                {t("No phone line or office address is published yet. We will add them here once they are confirmed rather than list placeholders.")}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {topics.map((topic) => (
                <a
                  key={topic.label}
                  href={mailto(topic.subject, topic.address ?? SITE.email)}
                  className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-gold-line"
                >
                  <div className="text-sm font-semibold text-foreground">{t(topic.label)}</div>
                  <div className="mt-1 text-xs text-muted-foreground" dir="ltr">
                    {topic.address ?? SITE.email}
                  </div>
                </a>
              ))}

            </div>
          </div>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}
