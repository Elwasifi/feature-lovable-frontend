import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Building2,
  Clapperboard,
  Landmark,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import heroImage from "@/assets/hero-egypt.jpg";
import filmImage from "@/assets/card-through-time.jpg";
import mapImage from "@/assets/card-governorates.jpg";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import {
  Container,
  GhostButton,
  GoldButton,
  Section,
  SectionHeader,
  SourceBadge,
} from "@/components/site/Primitives";
import {
  discoverCards,
  eras,
  investSectors,
  pillars,
  programmes,
  sectorCards,
  trustItems,
} from "@/data/site";
import { SITE, mailto } from "@/config/site";

const title = "Egypt One — One Egypt. One Journey. One Platform.";
const description =
  "Egypt One is a unified digital gateway to Egypt: destinations, 27 governorates, heritage, culture, events and investment — presented through one intelligent platform.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: SITE.url },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${SITE.url}/` }],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TopUtilityBar />
      <SiteHeader />
      <main>
        <Hero />
        <Pillars />
        <Explore />
        <Governorates />
        <ThroughTime />
        <Plan />
        <Concierge />
        <Invest />
        <Film />
        <Programmes />
        <Trust />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={heroImage}
        alt="The Pyramids of Giza and the Nile at golden hour"
        className="absolute inset-0 size-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      <Container className="relative py-20 lg:py-32">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold/85">
            The national digital gateway to Egypt
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            One Egypt.
            <br />
            One Journey.
            <br />
            <span className="text-gold">One Platform.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground lg:text-lg">
            A destination, a civilisation, a living culture and an investment ecosystem — brought
            together in a single intelligent experience.
          </p>

          <div id="search" className="mt-8 max-w-xl scroll-mt-28">
            <div className="flex items-center gap-2 rounded-full border border-gold-line bg-card/85 p-2 backdrop-blur">
              <Search className="ms-3 size-4 shrink-0 text-gold" />
              <input
                type="search"
                placeholder="Search destinations, heritage, experiences…"
                aria-label="Search Egypt One"
                className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <span className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground">
                Search
              </span>
            </div>
            <p className="mt-2 ps-4 text-[11px] text-muted-foreground">
              Search is wired to the Egypt One search service. Results are demonstration data.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <GoldButton href="#explore">
              Explore Egypt <ArrowRight className="size-4" />
            </GoldButton>
            <GhostButton href="#plan">Plan your trip</GhostButton>
            <GhostButton href="#ai-concierge">
              <Sparkles className="size-4" /> Ask Egypt One AI
            </GhostButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Pillars() {
  return (
    <Section className="border-t border-border/60">
      <div className="grid gap-6 lg:grid-cols-3">
        {pillars.map((p) => (
          <a
            key={p.title}
            href={p.href}
            className="group relative isolate overflow-hidden rounded-2xl border border-border transition-colors hover:border-gold-line"
          >
            <img
              src={p.image}
              alt=""
              loading="lazy"
              className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="font-display text-xl text-foreground">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold">
                {p.cta} <ArrowRight className="size-4" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </Section>
  );
}

function Explore() {
  return (
    <Section id="explore" className="bg-sidebar/40">
      <SectionHeader
        eyebrow="Discover"
        title="Egypt, section by section"
        description="Every part of the country — regions, sites, museums, waterways and the places most visitors never reach."
        action={<SourceBadge status="DEMO" />}
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {discoverCards.map((c) => (
          <article
            key={c.title}
            className="group relative isolate overflow-hidden rounded-2xl border border-border"
          >
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
              <div>
                <h3 className="font-display text-lg text-foreground">{c.title}</h3>
                <p className="text-xs text-muted-foreground">{c.subtitle}</p>
              </div>
              {c.badge && <SourceBadge status="DEMO" />}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function Governorates() {
  return (
    <Section id="governorates">
      <SectionHeader
        eyebrow="27 Governorates"
        title="One country, twenty-seven identities"
        description="From the Delta to Upper Egypt and the Red Sea coast — each governorate carries its own landscape, heritage and economy."
        action={<SourceBadge status="DEMO" />}
      />
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative overflow-hidden rounded-2xl border border-border">
          <img
            src={mapImage}
            alt="Map view of Egypt's governorates"
            loading="lazy"
            className="h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-center gap-3 p-6">
            <MapPin className="size-5 text-gold" />
            <p className="text-sm text-muted-foreground">
              Interactive governorate map — full map experience on the governorates page.
            </p>
          </div>
        </div>
        <div className="grid gap-4">
          {[
            { label: "Governorates", value: "27" },
            { label: "Heritage sites catalogued", value: "2,400+" },
            { label: "Historical eras covered", value: "15" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6">
              <div className="font-display text-3xl text-gold">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
          <div className="rounded-2xl border border-gold-line bg-gold-soft p-6">
            <p className="text-sm text-foreground">
              Figures shown across this preview are demonstration data, not live national
              statistics.
            </p>
            <SourceBadge status="SIMULATED" className="mt-3" />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ThroughTime() {
  return (
    <Section id="through-time" className="bg-sidebar/40">
      <SectionHeader
        eyebrow="Egypt Through Time"
        title="Seven thousand years, one continuous story"
        description="A timeline from the Predynastic period to modern Egypt, with sources and verification levels attached to historical claims."
        action={<SourceBadge status="DEMO" />}
      />
      <div className="-mx-5 overflow-x-auto px-5 pb-2 lg:mx-0 lg:px-0">
        <ol className="flex min-w-max gap-4">
          {eras.map((era, i) => (
            <li
              key={era.name}
              className="w-56 shrink-0 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-gold-line"
            >
              <span className="font-display text-sm text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg leading-snug text-foreground">{era.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{era.years}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-5 text-xs text-muted-foreground">
        Historical imagery used elsewhere on the platform is labelled by evidence type. Any
        reconstruction is marked: visual reconstruction based on historical sources — not an
        original historical document.
      </p>
    </Section>
  );
}

function Plan() {
  return (
    <Section id="plan">
      <SectionHeader
        eyebrow="Plan your journey"
        title="An itinerary built around what you actually want"
        description="Choose a destination, a duration and a travel style — Egypt One assembles a day-by-day plan you can refine."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          { step: "01", title: "Tell us the shape of your trip", body: "Destination, dates, pace and interests." },
          { step: "02", title: "Get a structured itinerary", body: "Day-by-day plan with sites, timings and context." },
          { step: "03", title: "Refine and keep it", body: "Adjust days and save the plan as a draft." },
        ].map((s) => (
          <div key={s.step} className="rounded-2xl border border-border bg-card p-7">
            <span className="font-display text-sm tracking-[0.2em] text-gold">{s.step}</span>
            <h3 className="mt-3 font-display text-xl text-foreground">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-sidebar p-5">
        <SourceBadge status="PLANNED" />
        <p className="text-sm text-muted-foreground">
          Itineraries are generated drafts. Booking, payment and availability are not connected —
          no reservation is created.
        </p>
      </div>
    </Section>
  );
}

function Concierge() {
  return (
    <Section id="ai-concierge" className="bg-sidebar/40">
      <div className="grid gap-8 rounded-3xl border border-gold-line bg-card p-7 lg:grid-cols-[1fr_1.1fr] lg:p-12">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold/85">
            Egypt One AI Concierge
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight lg:text-4xl">
            Ask anything about Egypt
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
            Routed through the current Egypt One intelligence layer. It answers with cited cards
            drawn from the platform&apos;s own content, and it tells you when it cannot help.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            The concierge currently uses deterministic routing over demonstration content — it is
            not an autonomous language model.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <GoldButton href="#search">
              <Sparkles className="size-4" /> Open the concierge
            </GoldButton>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-background p-5">
          <div className="space-y-3">
            {[
              "What can I see in Luxor in two days?",
              "Which governorates are on the Red Sea?",
              "Show heritage sites from the Fatimid period",
            ].map((q) => (
              <div
                key={q}
                className="rounded-xl border border-border px-4 py-3 text-sm text-muted-foreground"
              >
                {q}
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-full border border-border px-4 py-3">
            <Sparkles className="size-4 text-gold" />
            <span className="text-sm text-muted-foreground">Ask Egypt One…</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Invest() {
  return (
    <Section id="invest">
      <SectionHeader
        eyebrow="Invest in Egypt"
        title="A growing economy, presented clearly"
        description="Sectors, projects and the ecosystem behind them — with a direct line to the Egypt One team."
        action={<SourceBadge status="DEMO" />}
      />
      <div className="flex flex-wrap gap-2">
        {investSectors.map((s) => (
          <span
            key={s}
            className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {sectorCards.map((c) => (
          <article
            key={c.title}
            className="group overflow-hidden rounded-2xl border border-border bg-card"
          >
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="h-44 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="p-6">
              <h3 className="font-display text-lg text-foreground">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
              <a
                href={mailto(`Investment enquiry — ${c.title}`)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-foreground"
              >
                Enquire by email <ArrowRight className="size-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
        <Building2 className="size-4 text-gold" />
        Investment content is illustrative. Egypt One does not publish licences, approvals or
        official government opportunities.
      </p>
    </Section>
  );
}

function Film() {
  return (
    <Section id="film" className="bg-sidebar/40">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-border">
          <img
            src={filmImage}
            alt="Egyptian architecture used as a filming location"
            loading="lazy"
            className="h-[360px] w-full object-cover"
          />
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold/85">
            Film, screen & creative economy
          </p>
          <h2 className="mt-3 font-display text-3xl leading-tight lg:text-4xl">
            Egypt has always been a location
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
            A century of Egyptian cinema, international productions shot along the Nile, studios
            and the screen tourism they create. Presented here as editorial storytelling.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <SourceBadge status="PLANNED" />
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clapperboard className="size-4 text-gold" />
              A structured film catalogue is not yet part of the platform data model.
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Programmes() {
  return (
    <Section id="programmes">
      <SectionHeader eyebrow="Programmes" title="National initiatives across the platform" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {programmes.map((p) => (
          <div
            key={p.title}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-gold-line"
          >
            <Landmark className="size-5 text-gold" />
            <h3 className="mt-4 font-display text-lg text-foreground">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            <SourceBadge status="PLANNED" className="mt-4" />
          </div>
        ))}
      </div>
    </Section>
  );
}

const trustIcons = [ShieldCheck, Landmark, Users, Sparkles, MapPin];

function Trust() {
  return (
    <section id="support" className="scroll-mt-24 border-y border-border bg-sidebar py-10">
      <Container className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {trustItems.map((t, i) => {
          const Icon = trustIcons[i % trustIcons.length] ?? ShieldCheck;
          return (
            <div key={t.title} className="flex items-start gap-3">
              <Icon className="mt-0.5 size-5 shrink-0 text-gold" />
              <div>
                <div className="text-sm font-semibold text-foreground">{t.title}</div>
                <div className="text-xs text-muted-foreground">{t.body}</div>
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}

function Newsletter() {
  return (
    <Section>
      <div className="rounded-3xl border border-border bg-card p-8 lg:p-12">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl leading-tight lg:text-3xl">
              Stay with the platform as it grows
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Updates on new sections, heritage releases and platform milestones. Replies go to{" "}
              <a
                href={mailto("Egypt One — newsletter")}
                className="text-gold hover:text-foreground"
                dir="ltr"
              >
                {SITE.email}
              </a>
              .
            </p>
          </div>
          <div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="h-12 min-w-0 flex-1 rounded-full border border-input bg-background px-5 text-sm outline-none placeholder:text-muted-foreground focus:border-gold-line"
              />
              <a
                href={mailto("Egypt One — subscribe")}
                className="inline-flex h-12 items-center justify-center rounded-full bg-gold px-6 text-sm font-semibold text-primary-foreground"
              >
                Subscribe by email
              </a>
            </div>
            <p className="mt-2 ps-4 text-[11px] text-muted-foreground">
              Automated sign-up is planned — for now the button opens an email to our team.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
