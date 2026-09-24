import { createFileRoute } from "@tanstack/react-router";
import {
  LayoutDashboard, Rocket, FileCheck2, Scale, BadgePercent, PieChart, LifeBuoy, Factory, Gavel,
  Globe2, TrendingUp, Users, Gift, Building2, Landmark, BookOpen, ClipboardList, BadgeCheck, LineChart,
  ChevronRight, ArrowRight, Download, Headphones, FileText,
} from "lucide-react";
import { toast } from "sonner";
import hero from "@/assets/inner/business-hero.jpg";
import solar from "@/assets/home/tenders.jpg";
import land from "@/assets/home/biz-opps.jpg";
import tourism from "@/assets/gov/red-sea.jpg";
import residential from "@/assets/sector-realestate.jpg";
import agri from "@/assets/sector-rural.jpg";
import {
  InnerPage, SectionHead, PhotoCard, IconCard, SidePanel, LinkList, NavyPromo, GoldButton,
  type CardItem, type Chip,
} from "@/components/layout/InnerPage";
import { SITE } from "@/config/site";
import { useI18n } from "@/i18n";

const title = "Do Business in Egypt — Start, Expand & Succeed | Egyptora Hub";
const description = "Start, expand and succeed in Egypt: procedures, licences, incentives, sectors and business opportunities in one place.";

export const Route = createFileRoute("/do-business")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: `${SITE.url}/do-business` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/do-business` }],
  }),
  component: DoBusiness,
});

const IO = "/investment-opportunities";
const chips: Chip[] = [
  { label: "Business Overview", Icon: LayoutDashboard },
  { label: "Start a Business", Icon: Rocket, to: "/government-directory" },
  { label: "Licenses & Permits", Icon: FileCheck2, to: "/government-directory" },
  { label: "Laws & Regulations", Icon: Scale, to: "/legal" },
  { label: "Investment Incentives", Icon: BadgePercent, to: IO },
  { label: "Sectors & Opportunities", Icon: PieChart, to: IO },
  { label: "Business Support", Icon: LifeBuoy, to: "/providers" },
  { label: "Industrial Zones", Icon: Factory, to: IO },
  { label: "Public Procurement", Icon: Gavel },
];

const why: CardItem[] = [
  { title: "Strategic Location", desc: "A gateway to Africa, the Middle East and global markets.", Icon: Globe2, to: IO },
  { title: "Growing Economy", desc: "Diverse and resilient economy with high growth potential.", Icon: TrendingUp, to: IO },
  { title: "Young & Skilled Workforce", desc: "A talented and competitive talent pool.", Icon: Users, to: IO },
  { title: "Investment Incentives", desc: "Attractive incentives and free zones.", Icon: Gift, to: IO },
  { title: "Mega Projects", desc: "New cities and national projects create vast opportunities.", Icon: Building2, to: IO },
  { title: "Supportive Government", desc: "Reforms and digital services to make business easier.", Icon: Landmark, to: IO },
];

const steps = [
  { Icon: BookOpen, title: "Learn", desc: "Understand the requirements and choose your activity." },
  { Icon: ClipboardList, title: "Register", desc: "Complete registration procedures online or in person." },
  { Icon: BadgeCheck, title: "Obtain Licenses", desc: "Get the necessary permits and approvals." },
  { Icon: LineChart, title: "Operate & Grow", desc: "Start your business and access support services." },
];

const opps: CardItem[] = [
  { title: "Solar Energy Project", meta: ["Benban, Aswan"], desc: "Renewable energy investment opportunities.", img: solar, to: IO },
  { title: "Industrial Land", meta: ["10th of Ramadan"], desc: "Ready-to-develop industrial plots.", img: land, to: IO },
  { title: "Tourism Development", meta: ["Red Sea"], desc: "Hotel and resort development opportunities.", img: tourism, to: IO },
  { title: "Residential Project", meta: ["New Administrative Capital"], desc: "Mixed-use real estate development.", img: residential, to: "/properties" },
  { title: "Agri-Food Processing", meta: ["Beheira"], desc: "Investment in food processing and export.", img: agri, to: IO },
];

const keySectors = [
  "Energy (Oil, Gas & Renewables)", "Manufacturing & Industrial", "Real Estate & Construction", "Tourism & Hospitality",
  "Agriculture & Food Processing", "ICT & Digital Economy", "Healthcare & Pharmaceuticals", "Transport & Logistics",
  "Education & Training", "Financial Services", "Creative Industries", "Green & Sustainable Projects",
];

function DoBusiness() {
  const { t } = useI18n();
  return (
    <InnerPage
      pageName="Do Business"
      hero={{
        image: hero,
        title: "Do Business in Egypt",
        subtitle: "Your Partner for Growth",
        body: "Start, expand and succeed in Egypt. Find the information, resources and partners you need — all in one place.",
        placeholder: "Search business opportunities, procedures, sectors, or partners…",
        tagline: ["Opportunities", "People", "Partnerships", "A brighter tomorrow"],
      }}
      chips={chips}
      moreTo="/providers"
      sidebar={
        <>
          <NavyPromo>
            <h3 className="font-display text-xl font-bold">{t("Invest. Partner. Grow.")}</h3>
            <p className="mt-1 text-sm text-foreground/80">{t("Connect with opportunities across Egypt's key sectors.")}</p>
            <div className="mt-4">
              <GoldButton to={IO}>
                {t("Explore Opportunities")} <ArrowRight className="size-4 rtl:rotate-180" />
              </GoldButton>
            </div>
          </NavyPromo>
          <SidePanel title="Key Sectors">
            <LinkList items={keySectors.map((s) => ({ label: s, to: IO }))} />
            <div className="mt-3">
              <GoldButton to={IO}>
                {t("View All Sectors")} <ChevronRight className="size-4 rtl:rotate-180" />
              </GoldButton>
            </div>
          </SidePanel>
        </>
      }
      bottom={
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { Icon: FileText, t: "Business Resources", d: "Access guides, forms, templates and useful links.", b: "Explore Resources", to: "/legal" },
            { Icon: Headphones, t: "Need Assistance?", d: "Get support from our business advisory team.", b: "Contact Us", to: "/contact" },
          ].map((c) => (
            <section key={c.t} className="rounded-[10px] border border-border bg-bg-band p-6">
              <c.Icon className="size-7 text-shell-gold" />
              <h3 className="mt-3 font-display text-lg font-bold text-navy">{t(c.t)}</h3>
              <p className="mt-1 text-sm text-text-body">{t(c.d)}</p>
              <div className="mt-4">
                <GoldButton to={c.to}>
                  {t(c.b)} <ArrowRight className="size-4 rtl:rotate-180" />
                </GoldButton>
              </div>
            </section>
          ))}
          <section className="on-dark rounded-[10px] bg-navy p-6">
            <Download className="size-7 text-shell-gold" />
            <h3 className="mt-3 font-display text-lg font-bold text-foreground">{t("Download Business Guide")}</h3>
            <p className="mt-1 text-sm text-foreground/80">{t("Your complete guide to doing business in Egypt.")}</p>
            <button
              type="button"
              onClick={() => toast(t("Coming soon"))}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary-foreground px-5 py-2.5 text-sm font-semibold text-navy"
            >
              {t("Download PDF")} <Download className="size-4" />
            </button>
          </section>
        </div>
      }
    >
      <section>
        <SectionHead title="Why Do Business in Egypt?" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {why.map((c) => <IconCard key={c.title} c={c} cta={false} />)}
        </div>
      </section>
      <section>
        <SectionHead title="Start Your Business Journey" body="Simple steps to establish and grow your business in Egypt." to="/government-directory" toLabel="View Full Guide" />
        <ol className="grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative grid justify-items-center gap-2 rounded-[10px] border border-border bg-card p-5 text-center shadow-sm">
              <span className="grid size-14 place-items-center rounded-full bg-gold-cta text-primary-foreground">
                <s.Icon className="size-6" />
              </span>
              <span className="font-display text-2xl font-bold text-navy">{i + 1}</span>
              <h3 className="text-sm font-bold text-navy">{t(s.title)}</h3>
              <p className="text-xs text-text-body">{t(s.desc)}</p>
              {i < steps.length - 1 && (
                <ChevronRight className="absolute -end-4 top-1/2 z-10 hidden size-6 -translate-y-1/2 text-shell-gold md:block rtl:rotate-180" />
              )}
            </li>
          ))}
        </ol>
      </section>
      <section>
        <SectionHead title="Featured Business Opportunities" body="Discover current opportunities across key sectors." to={IO} toLabel="View All Opportunities" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {opps.map((c) => <PhotoCard key={c.title} c={c} h="h-32" />)}
        </div>
      </section>
    </InnerPage>
  );
}
