# Egyptora Hub — 8-page template system + dropdown navigation

## 1. What I see in the 9 references

All 9 opened and reviewed: Homepage, Explore Egypt (Tourism & Experiences), Live in Egypt, Invest in Egypt, Do Business, Visit Egypt, Government Directory, Digital Government Services, Real Estate.

**Important honesty note:** in all 9 images the dropdown menus are **closed** — only the `▾` arrow is visible, no menu panel is ever open. So I cannot "read" the sub-items; nobody can from these images. What I *can* read precisely is the sub-category tab row on each landing page, which is clearly the intended content of each dropdown. Below is what those rows actually say, which is my proposed dropdown content for your approval.

**Explore Egypt** — All Experiences, Cultural & Historical Tours, Nile Cruises, Diving & Marine Activities, Desert Safari & Adventure, Beaches & Water Sports, Cities & Destinations, Religious & Spiritual Tourism, Eco & Nature Tourism, Family Experiences, Events & Festivals.

**Live in Egypt** — All Living Options, Residency & Visas, Housing & Real Estate, Education & Schools, Healthcare & Medical Services, Work & Employment, Cost of Living, Safety & Security, Community & Lifestyle, Transportation & Mobility, Utilities & Services.

**Invest in Egypt** — All Sectors, Real Estate & New Cities, Industry & Manufacturing, Tourism & Hospitality, Energy & Renewable, Infrastructure & Transportation, Agriculture & Food Security, ICT & Innovation, Healthcare & Pharmaceuticals, Education & Research, Financial Services.

**Do Business** — All Business Services, Start a Business, Licenses & Permits, Investment Incentives, Tenders & Projects, Trade & Export, Regulations & Laws, Business Support, SMEs & Entrepreneurship, Industrial Zones, Free Zones, Contact Authorities.

**Visit Egypt** — All Experiences, Historical Sites, Beaches & Islands, Nile Cruises, Cities & Culture, Desert & Adventure, Diving & Marine Life, Local Experiences, Events & Festivals, Museums & Galleries, Food & Cuisine, Wellness & Retreats.

Non-dropdown items: Home, Government Directory, About. Plus search icon, EN switcher, Login button.

## 2. Shared interior template (images 02–09)

Every dedicated page uses the same skeleton:

```text
breadcrumb + full-bleed hero (title, subtitle, one search bar, right-side "Egypt" script mark)
horizontal sub-category tab row (white cards, first one active/gold)
main column                              | right sidebar
  "Featured [X]" card row + View All     |   quick tools / resource list
  "Explore by [Y]" grid                  |   dark navy stat or CTA widget
  supporting band / success stories      |   app-download or contact widget
full footer (brand blurb + socials | Explore | About | Stay Connected + newsletter | legal strip)
```

I would build this once as `PageTemplate` + `HeroSearch`, `CategoryTabs`, `FeaturedRow`, `ExploreGrid`, `SidebarWidgets` so all 8 pages stay identical and RTL-safe.

## 3. Mapping to what already exists

| Reference page | Today | Action |
|---|---|---|
| Real Estate (09) | `/properties` — 81 live listings | restyle into template, keep data |
| Invest in Egypt (04) | `/investment-opportunities` — 81 records | restyle into template |
| Government Directory (07) | `/government-directory` — 60 entities live | restyle into template + sidebar |
| Explore Egypt (02) | scattered: `/heritage-sites`, `/museums`, `/events`, `/encyclopedia`, governorates | new landing page that aggregates these |
| Visit Egypt (06) | homepage destinations + Travelpayouts booking widget | new landing page; booking widget moves here |
| Do Business (05) | `/providers` (389), `/partners` | new landing page on top of providers |
| Live in Egypt (03) | nothing | new page; mostly informational content needed |
| Digital Gov Services (08) | nothing | new page; needs a services dataset |
| Homepage (01) | current long homepage | slim down to hero + tiles + 4 preview rows + Why Egyptora + directory banner |

## 4. Build order

1. **Nav + footer shell** — 8-item top nav with 5 dropdowns (desktop menu, mobile accordion), search icon, EN switcher, Login; footer already close to the reference.
2. **Interior template components** — built and proven on **Real Estate (`/properties`)**, since it has the richest real data.
3. **Government Directory** — second page through the template (real data, priority page).
4. **Invest in Egypt** — third, again real data.
5. **Explore Egypt + Visit Egypt** — aggregation pages over heritage/museums/events/governorates; Travelpayouts booking moves to Visit Egypt.
6. **Do Business** — over providers/partners.
7. **Homepage slim-down** — once the section pages exist to link to.
8. **Live in Egypt + Digital Government Services** — last, because they need new content.
9. **Arabic/RTL + mobile pass** across all of it.

## 5. Risks and open questions to settle before coding

- **Content gaps are the real cost, not the code.** Live in Egypt, Digital Government Services, and much of Do Business have no data behind them. Options: write static curated content, add small tables, or ship them with honest "Coming soon" sections. Your call per page.
- **Sub-category tabs need something to filter.** Our tables mostly lack a category column (e.g. properties have no "Residential / Commercial / Coastal" field). Either the tabs filter on what exists, or we add category fields and classify rows — that is a data job.
- **Homepage slim-down deletes nothing but hides a lot.** Around 14 current sections (Discover, Sectors, Offers, Through Time, Egypt right now, Research, Film, Marketplace, Programmes…) must move to section pages or the homepage stops matching the reference. I need your decision on where each lands.
- **Travelpayouts widgets** keep their colours inside the widget URLs; the Attractions/Klook one stays default orange-white. Moving them to Visit Egypt is fine, restyling them is not possible.
- **Dropdown nav in RTL** must mirror (menus open right-aligned); mobile becomes a full-screen accordion, not hover menus.
- **Anchor links break** when the homepage is restructured (`#explore`, `#invest`, `#government-directory` are used today by tiles and the directory banner). They become real page links.
- **Admin, partner and government dashboards** stay on the plain layout — no marketing hero or sidebar there.
- **Search bars in every hero**: today the homepage bar feeds the AI assistant. Simplest consistent behaviour is the same everywhere (scoped question to the assistant) unless you want real per-section filtering, which is more work.
- **The "Egypt" script mark**, app-store badges, phone mockups and news/insights cards in the references are assets/content we do not have. I will use type and existing photos instead of inventing links; app-store badges stay non-linking until you have real apps.
- **Logo untouched**, no changes to data, bookings, auth or the AI assistant.

## 6. Effort

Roughly 8–11 focused prompts. The expensive ones are the template build (step 2) and the homepage slim-down (step 7); the pages that reuse the template after that are quick.
