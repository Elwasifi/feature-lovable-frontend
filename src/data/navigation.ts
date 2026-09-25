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
    to: "/explore-egypt",
    items: [
      { label: "All Experiences", to: "/explore-egypt" },
      { label: "27 Governorates", to: "/governorates" },
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
    to: "/live-in-egypt",
    items: [
      { label: "All Living Options", to: "/live-in-egypt" },
      { label: "Residency & Visas", soon: true },
      { label: "Housing & Real Estate", to: "/real-estate" },
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
    to: "/invest-in-egypt",
    items: [
      { label: "All Sectors", to: "/invest-in-egypt" },
      { label: "Real Estate & New Cities", to: "/real-estate" },
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
    to: "/do-business",
    items: [
      { label: "All Business Services", to: "/do-business" },
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
    to: "/visit-egypt",
    items: [
      { label: "All Experiences", to: "/visit-egypt" },
      { label: "Travel & Tourism Services", to: "/visit-egypt/travel-and-tourism" },
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
  { label: "Governorates", to: "/governorates" },
  { label: "Government Directory", to: "/government-directory" },
  {
    label: "About",
    to: "/legal",
    items: [
      { label: "About Egyptora", to: "/legal" },
      { label: "Our Mission", soon: true },
      { label: "Vision & Values", soon: true },
      { label: "Contact Us", to: "/contact" },
      { label: "FAQ", soon: true },
    ],
  },
];
