# Egypt One — Frontend Architecture & Design Plan (Planning Only)

Audit performed against the live repository `Elwasifi/egyptoneprototype` (branch `main`, 429 files, updated 2026-08-24) via read-only GitHub access. No files were changed, nothing was installed, no branch was touched.

---

## 0. Blocking environment finding (REQUIRES USER DECISION)

You chose "connect this project to the GitHub repo first". You must know exactly what that gives you before we implement:

- The repo is a **pnpm + Turborepo monorepo** (`apps/web` Next.js App Router, 13 packages). Lovable's build environment runs **one Vite/TanStack app** at the repository root.
- If this project is Git-synced to that repo, I can **read and write files** in `apps/web` and `packages/ui`, but the Lovable preview **cannot render or build it**, and the automatic build/type checks will not validate the monorepo. Implementation would be "blind": correctness comes from careful typing plus your local `pnpm build`.
- No Lovable-only dependency will be introduced; everything stays portable to Hostinger.

Everything below is written for the **monorepo target** (`apps/web` + `packages/ui`), not for this sandbox app.

Legend used throughout: **IMPLEMENTED / VERIFIED / EXISTING / DEMO / PLANNED / MISSING / BLOCKED / DECISION**.

---

## 1. Repository audit (EXISTING)

```text
apps/web/src/app/[locale]/…   ~70 route folders, all rendering demo data
apps/web/src/app/api/         search | trip/build | ai/concierge   ← only 3 routes
packages/ui                   primitives, data, discovery, media, brand, layout
packages/database             db.* repository, DEMO_MODE = !DATABASE_URL, 17 JSON packs
packages/types                domain types + DataClass + SourceStatus taxonomies
packages/security             decide(), RBAC_MATRIX, CEILING, audit()  (IMPLEMENTED)
packages/agents               16-agent registry + orchestrator + composeGuard
packages/mcp                  15 servers / 30 tools, all SANDBOX or PLANNED
packages/integrations         11 adapter contracts — 3 SANDBOX, 17 PLANNED
packages/auth                 EMPTY  → no authentication exists (BLOCKED)
packages/analytics            EMPTY  → all metrics are SIMULATED
packages/i18n, skills, config, config/revenue.ts
```

Key facts confirmed from `BACKEND_FREEZE.md`: no running database, no migrations, no auth, no RLS, no live MCP server, no live integration, no film domain model at all (only `EventRecord.category = 'Film'`).

## 2. Existing frontend architecture (EXISTING)

Next.js App Router, `[locale]` segment with middleware doing locale routing only. Pages are Server Components importing `@egypt-one/database` directly — that is why a decoupled frontend has no data path. Live Leaflet/CARTO map (`EgyptMap`) over the 27-governorate pack is real and should be preserved.

## 3. Design-system audit (EXISTING — reuse, do not replace)

`packages/ui` already exports: `Button` (gold variant), `Card`, `Badge`, `Input`, `Select`, `Textarea`, `Switch`, `Skeleton`, `Progress`, `Tabs`, `Stat`; `SourceBadge`, `DataClassBadge`, `AccessBadge`, `EmptyState`, `ErrorState`, `OfflineState`, `PermissionDenied`, `IntegrationUnavailable`, `LoadingState`, `BarStrip`, `Donut`, `Trend`, `DataTable`; `SectionHeader`, `PageHeader`, `Breadcrumbs`, `CarouselRow`, `DiscoveryCard`, `GovernorateCard`, `HeritageCard`, `ProviderCard`, `BentoGrid`, `FilterRail`; `SmartImage`, `CinematicHero`, `subjectFor`; `Logo`, `PortalShell`.

Tokens already exist in `apps/web/src/app/globals.css` (`@theme`): surfaces `void/base/raised/panel/elevated`, a 7-step gold ramp, accents `nile/turquoise/bronze/sandstone/royal/emerald/sunset`, ink scale, status colours, `--radius-card: 16px`, fonts Plus Jakarta Sans / IBM Plex Sans Arabic / Cormorant Garamond, reduced-motion handling.

**Verdict: no second design system, no UI framework, no new palette.** Gaps to add *inside* `packages/ui`: `Container`, `Section`, `TopUtilityBar`, `MegaMenu`, `MobileNav`, `AICommandBar`, `TimelineRail`, `EvidenceBadge`, `ProgrammeCard`, `InvestmentCard`, `EventCard`, `FilmCard`, `MediaFrame`, `TrustBar`, `Newsletter`.

## 4. Visual reference analysis (from your logo + 3 screenshots)

Extracted language, not copied layout: circular gold ankh/sphinx seal on near-black; wordmark in white + gold with the "One Egypt. One Journey. One Platform." rule line. Deep navy-black surfaces, thin 1px gold-alpha borders, 16px radii, cinematic warm-hour photography with a bottom black gradient carrying the label. Dense dashboard rhythm on the right rail; icon tiles in muted gold circles; small pill badges (New/Hot/AI).

Direction: keep the cinematic gold-on-navy, **reduce gold to accents and hairlines** (the screenshots over-gild), increase whitespace and section rhythm, drop the crowded above-the-fold. Editorial serif (Cormorant) only for hero and section titles; Plus Jakarta Sans for everything else; IBM Plex Sans Arabic at equal weight for RTL. No pharaonic clip-art, no fake seals, no fake government/partner logos.

## 5–6. Proposed homepage structure (progressive disclosure)

```text
TopUtilityBar   language (EN/AR) · currency · country gateway · support
Header          Logo · primary nav + MegaMenu · universal search · AI Concierge entry
Hero            cinematic image · one headline · one search · one AI CTA        [fold]
—— below fold ——
ThreePillars    Explore Egypt | Plan Your Trip | Invest in Egypt
FeaturedExperiences   carousel, DEMO badged
Sectors         12 tiles: destinations, 27 governorates, heritage, Egypt Through Time,
                nile, beaches, adventure, food, events, medical, real estate, education
Governorates    live Leaflet map + top-governorate rail
EgyptThroughTime  horizontal era timeline preview → /egypt-through-time
Programmes      Egypt One Pass · Visit All 27 · Stopover Egypt · One More Night
AIConciergeBand real /api/ai/concierge demo box (deterministic, labelled)
Investment      sector strip + intelligence teaser (SIMULATED badge) + inquiry CTA
FilmScreen      film-location storytelling  (MISSING domain → editorial only)
Research        programmes + sources
TrustBar        honest claims only: data-classification, source labelling, support
Newsletter
Footer          5 columns · apps · gateway links
```

No fake user chrome anywhere ("Welcome, Ahmed", "Gold Member", bookings) until auth exists.

## 7. Sitemap / route map

Existing top-level segments (~70) stay. Work items:

- **MISSING index routes to add**: `/attractions`, `/cities`, `/destinations`, `/villages`.
- **Detail routes** to verify/complete: `governorates/[slug]`, `heritage/[slug]`, `museums/[slug]`, `investment-opportunities/[slug]`, `rulers-of-egypt/[slug]`, `egypt-195/[slug]`.
- **Portals**: `/account`, `/provider`, `/partner`, `/government`, `/admin`, `/ai` — keep `PortalShell`, mark every write path PLANNED.
- Every section gets the same skeleton: landing → listing (+filters) → detail → related → CTA → AI assist → source badge.

## 8. API-to-screen mapping (never invent endpoints)

| Screen | Data | API | Status | Fallback | Badge |
|---|---|---|---|---|---|
| Universal search | cross-entity hits | `GET /api/search` | REAL (A) | empty-state, no fabrication | per-hit `sourceStatus` |
| Trip Planner | day plan | `POST /api/trip/build` | REAL (A) | error state | DEMO + `bookingState: DRAFT` |
| AI Concierge | turn+cards+citations | `POST /api/ai/concierge` | REAL (A), deterministic router | render `denied:true` as normal message | per-citation |
| Governorates / heritage / museums / providers / events / offers / products / investment / rulers / eras / research / countries / integrations / metrics | content | none | **MISSING (E)** — server-render via `db.*` in `apps/web`; a decoupled client cannot reach them | server component, no client fetch | DEMO / SIMULATED |
| Any booking, payment, availability, review submit | — | none | **BLOCKED (F)** | disabled CTA + "planned" note | PLANNED_INTEGRATION |
| Account / bookings / member tier | — | none (`packages/auth` empty) | **BLOCKED (F)** | sign-in screens rendered as PLANNED | — |

## 9. Missing API list (proposal only, additive, not built now)

`/api/governorates[/slug]`, `/api/heritage[/slug]`, `/api/museums`, `/api/providers`, `/api/investment-opportunities[/slug]`, `/api/events`, `/api/products`, `/api/offers`, `/api/rulers`, `/api/eras`, `/api/research-programs`, `/api/countries`, `/api/integrations`, `/api/metrics`. Also: export the concierge `Card`/turn types from `packages/agents` (today the frontend must re-declare them — documented contract gap, not silently patched).

## 10. Component architecture

```text
AppShell
├── TopUtilityBar ├── Header ├── MegaMenu ├── UniversalSearch ├── MobileNav
├── Hero / CinematicHero
├── Section + Container + SectionHeader
├── DiscoveryGrid · BentoGrid · CarouselRow · FilterRail
├── DestinationCard · GovernorateCard · HeritageCard · ProviderCard
│   · ProgrammeCard* · InvestmentCard* · EventCard* · FilmCard* · ResearchCard*
├── TimelineRail* · EvidenceBadge* · MediaFrame*
├── AIConcierge (Launcher · ChatPanel · SuggestedPrompts · AgentRouteIndicator
│                · CardRenderer · CitationList · States)
├── SourceBadge · DataClassBadge · AccessBadge · TrustBar · Newsletter
└── Footer                                            (* = new in packages/ui)
```

## 11. Design tokens

Reuse `@theme` as-is. Add only: spacing rhythm (`--space-section: 96px` desktop / 56px mobile), `--radius-pill`, elevation `--shadow-1/2/3` (soft black, never gold glow), motion (`--ease-cinema: cubic-bezier(.2,.7,.2,1)`, 180/240/420ms), breakpoints 390 / 768 / 1024 / 1280 / 1536, icon sizes 16/20/24, image ratios 21:9 hero, 16:9 card, 4:5 portrait, 1:1 tile, card variants `flat | raised | gold | media`, badge variants from the existing `SourceStatus` set.

## 12. Image/visual strategy (capability checked, not assumed)

Available in this environment **now**: AI image generation (multiple quality tiers, up to 1920px), AI image editing, transparent-PNG output, SVG authoring by hand, and use of your uploaded assets — no credentials, no extra tooling required. `SmartImage`/`subjectFor` already exist and stay the single presentation layer.

Plan: generate a coherent cinematic set (hero 21:9, 27 governorates, heritage, museums, nile, beaches, food, events, investment, film, research, programmes) into `apps/web/public/media/…` with a fixed warm-hour, dark-navy grade; keep your logo as the only brand asset. Historical imagery must be tagged `Historical source | Licensed | Illustration | AI reconstruction`, and any reconstruction renders the literal line: "Visual reconstruction based on historical sources — not an original historical document." Optional external stock/image APIs are marked **OPTIONAL / REQUIRES CREDENTIALS**; no secrets hardcoded.

## 13. AI Concierge UX

One surface, three entries (header button, hero CTA, mobile FAB). Chat panel with: suggested prompts per context, agent-routing indicator (`agentLabel` from the response), tool/activity strip, citation list with `SourceBadge`, `denied:true` rendered as a normal refusal message, loading/empty/error states, full-height mobile sheet, RTL mirrored. A visible, permanent note that the Concierge is **deterministic routing over demo data, not an LLM**. Transport is abstracted behind one `conciergeClient` so a future LLM/streaming backend needs no UI change. History is client-side only (no conversation API exists).

## 14. Responsive & RTL

Designed per breakpoint, not scaled: desktop mega-menu → tablet grouped drawer → mobile bottom nav (Explore · Search · AI · Trips · More) + AI FAB. Filters become a bottom sheet; tables become stacked cards; maps get a fixed-height mobile mode with a list toggle; carousels are scroll-snap with real overflow. RTL is a first-class layout (logical properties, mirrored icons, Arabic numerals policy, `IBM Plex Sans Arabic`), tested per screen, not an afterthought.

## 15. Admin / portals

Public = cinematic. Portals = dense, operational, same tokens: `PortalShell` + left rail + data tables + `DataClassBadge` + audit views. Every write action visibly disabled and labelled PLANNED until auth exists. Admin reads real registries (RBAC matrix, MCP tools, agents) — that stays honest and unchanged.

## 16. Performance / 17. Accessibility / 18. SEO

Server Components by default, client islands only for map, chat, filters, carousels; `next/image` via `SmartImage` with AVIF/WebP + blur; route-level code splitting; `font-display: swap` and self-hosted subsets (Latin + Arabic); LCP target <2.5s, CLS <0.1, INP <200ms.
WCAG 2.2 AA: semantic landmarks, visible focus rings, ≥4.5:1 contrast (gold-on-navy audited — several current gold-on-dark pairs fail and will be shifted to `gold-300`), keyboard-operable mega-menu/sheet/chat, alt text from the media layer, `prefers-reduced-motion` respected (already in globals.css).
SEO: per-route metadata, canonical, OpenGraph/Twitter, JSON-LD (`TouristDestination`, `LandmarksOrHistoricalBuildings`, `Event`, `Museum`, `BreadcrumbList`), sitemap + robots, `hreflang` en/ar, Arabic-first copy for AR routes.

## 19. Implementation phases & complexity

| Phase | Scope | Complexity |
|---|---|---|
| 1 | Design-system audit + token/component additions in `packages/ui` | M |
| 2 | AppShell, header, mega-menu, mobile nav, search entry | L |
| 3 | Homepage | L |
| 4 | Discovery: destinations/cities/attractions/villages indexes + detail | XL |
| 5 | Trip Planner (real API) | M |
| 6 | AI Concierge (real API) | L |
| 7 | Investment | L |
| 8 | Egypt Through Time + heritage + visual encyclopedia | XL |
| 9 | Events / Film / Research | L |
| 10–11 | Portals, Admin | L |
| 12–15 | RTL, a11y, performance, QA | L |

## 20. Files that would change during implementation

`packages/ui/src/**` (extend, additive), `apps/web/src/app/globals.css` (token additions only), `apps/web/src/app/[locale]/**` page/layout/component files, `apps/web/src/components/**`, `apps/web/public/media/**` (new imagery), `apps/web/next.config.mjs` (images config only, if needed). **Never touched:** `packages/database`, `packages/security`, `packages/agents`, `packages/mcp`, `packages/integrations`, `packages/types`, `packages/config/src/revenue.ts`, the three API route handlers, `main`.

## 21. Risks

Blind implementation (no preview/build in Lovable) · monorepo drift if you edit locally in parallel · 13 missing content APIs cap any decoupled frontend · no auth blocks all personalised UX · gold-on-navy contrast failures · large image set weight · Arabic content coverage unknown · Film domain does not exist in the data model.

## 22. Dependencies

Git sync connected to the repo · your local `pnpm build` as the real verification loop · decision on the missing-API PR · Arabic copy source · confirmation that generated imagery is acceptable brand-wise.

## 23. Questions requiring your decision

1. Should Phase 0 be the additive **missing-API PR** (14 read-only routes) so the frontend is not permanently server-coupled?
2. Do you accept AI-generated imagery for the cinematic set, or will you supply licensed photography?
3. Arabic: full parity from Phase 3, or English-first with AR following in Phase 12?
4. Should I remove the fake "Welcome, Ahmed / Gold Member" chrome from the existing homepage as part of Phase 2/3?
5. Confirm you will run builds locally, given Lovable cannot build the monorepo.

## 24. Status summary

- **IMPLEMENTED/VERIFIED**: 3 API routes, RBAC/ABAC engine, agent + MCP registries, governorate map, design tokens, `packages/ui` component set, data-honesty taxonomies.
- **EXISTING**: ~70 route folders rendering demo content.
- **DEMO/SIMULATED**: all content domains, all metrics, investment listings, heritage/history/research packs.
- **PLANNED**: database, migrations, CMS, partners, payments, notifications, media management, reviews.
- **MISSING**: 14 content APIs, 4 index routes, film domain model, concierge type exports.
- **BLOCKED**: authentication, personalised UX, bookings, live integrations, real analytics.
- **DECISION**: the five questions above.
