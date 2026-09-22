/**
 * Main site navigation: 8 top-level entries, five of which open a dropdown.
 * Sub-items point at a real route where one exists today; the rest are marked
 * `soon` and render as non-navigating "Coming soon" entries until their page
 * is built.
 */
export type NavLeaf = {
  label: string;
  /** Existing route path. Omitted when the destination does not exist yet. */
  to?: string;
  soon?: boolean;
};

export type NavEntry = {
  label: string;
  to?: string;
  items?: NavLeaf[];
};

export const mainNav: NavEntry[] = [
  { label: "Home", to: "/" },
  {
    label: "Explore Egypt",
    items: [
      { label: "All Experiences", to: "/encyclopedia" },
      { label: "Cultural & Historical Tours", to: "/heritage-sites" },
      { label: "Nile Cruises", soon: true },
      { label: "Diving & Marine Activities", soon: true },
      { label: "Desert Safari & Adventure", soon: true },
      { label: "Beaches & Water Sports", soon: true },
      { label: "Cities & Destinations", to: "/countries" },
      { label: "Religious & Spiritual Tourism", soon: true },
      { label: "Eco & Nature Tourism", soon: true },
      { label: "Family Experiences", soon: true },
      { label: "Events & Festivals", to: "/events" },
    ],
  },
  {
    label: "Live in Egypt",
    items: [
      { label: "All Living Options", soon: true },
      { label: "Residency & Visas", soon: true },
      { label: "Housing & Real Estate", to: "/properties" },
      { label: "Education & Schools", to: "/research-programs" },
      { label: "Healthcare & Medical Services", soon: true },
      { label: "Work & Employment", soon: true },
      { label: "Cost of Living", soon: true },
      { label: "Safety & Security", soon: true },
      { label: "Community & Lifestyle", soon: true },
      { label: "Transportation & Mobility", soon: true },
      { label: "Utilities & Services", soon: true },
    ],
  },
  {
    label: "Invest in Egypt",
    items: [
      { label: "All Sectors", to: "/investment-opportunities" },
      { label: "Real Estate & New Cities", to: "/properties" },
      { label: "Industry & Manufacturing", soon: true },
      { label: "Tourism & Hospitality", soon: true },
      { label: "Energy & Renewable", soon: true },
      { label: "Infrastructure & Transportation", soon: true },
      { label: "Agriculture & Food Security", soon: true },
      { label: "ICT & Innovation", soon: true },
      { label: "Healthcare & Pharmaceuticals", soon: true },
      { label: "Education & Research", to: "/research-programs" },
      { label: "Financial Services", soon: true },
    ],
  },
  {
    label: "Do Business",
    items: [
      { label: "All Business Services", to: "/providers" },
      { label: "Start a Business", soon: true },
      { label: "Licenses & Permits", soon: true },
      { label: "Investment Incentives", to: "/investment-opportunities" },
      { label: "Tenders & Projects", soon: true },
      { label: "Trade & Export", to: "/products" },
      { label: "Regulations & Laws", to: "/legal" },
      { label: "Business Support", to: "/providers" },
      { label: "SMEs & Entrepreneurship", soon: true },
      { label: "Industrial Zones", soon: true },
      { label: "Free Zones", soon: true },
      { label: "Contact Authorities", to: "/government-directory" },
    ],
  },
  {
    label: "Visit Egypt",
    items: [
      { label: "All Experiences", to: "/offers" },
      { label: "Historical Sites", to: "/heritage-sites" },
      { label: "Beaches & Islands", soon: true },
      { label: "Nile Cruises", soon: true },
      { label: "Cities & Culture", to: "/countries" },
      { label: "Desert & Adventure", soon: true },
      { label: "Diving & Marine Life", soon: true },
      { label: "Local Experiences", to: "/traveler-stories" },
      { label: "Events & Festivals", to: "/events" },
      { label: "Museums & Galleries", to: "/museums" },
      { label: "Food & Cuisine", soon: true },
      { label: "Wellness & Retreats", soon: true },
    ],
  },
  { label: "Government Directory", to: "/government-directory" },
  { label: "About", to: "/legal" },
];
