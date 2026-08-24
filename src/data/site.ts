import eraPredynastic from "@/assets/era-predynastic.jpg";
import eraOldKingdom from "@/assets/era-old-kingdom.jpg";
import eraMiddleKingdom from "@/assets/era-middle-kingdom.jpg";
import eraNewKingdom from "@/assets/era-new-kingdom.jpg";
import eraPtolemaic from "@/assets/era-ptolemaic.jpg";
import eraRoman from "@/assets/era-roman.jpg";
import eraCoptic from "@/assets/era-coptic.jpg";
import eraIslamic from "@/assets/era-islamic.jpg";
import eraFatimid from "@/assets/era-fatimid.jpg";
import eraAyyubid from "@/assets/era-ayyubid.jpg";
import eraMamluk from "@/assets/era-mamluk.jpg";
import eraOttoman from "@/assets/era-ottoman.jpg";
import eraMuhammadAli from "@/assets/era-muhammad-ali.jpg";
import eraRepublic from "@/assets/era-republic.jpg";
import eraModern from "@/assets/era-modern.jpg";
import cardGovernorates from "@/assets/card-governorates.jpg";
import cardThroughTime from "@/assets/card-through-time.jpg";
import cardHeritage from "@/assets/card-heritage.jpg";
import cardMuseums from "@/assets/card-museums.jpg";
import cardNileSea from "@/assets/card-nile-sea.jpg";
import cardHidden from "@/assets/card-hidden.jpg";
import sectorEntertainment from "@/assets/sector-entertainment.jpg";
import sectorRealEstate from "@/assets/sector-realestate.jpg";
import sectorRural from "@/assets/sector-rural.jpg";
import promoHotel from "@/assets/promo-hotel.jpg";

export type SidebarGroup = {
  title: string;
  items: { label: string; badge?: "New" | "Hot" | "AI" }[];
};

export const sidebarGroups: SidebarGroup[] = [
  {
    title: "Plan your trip",
    items: [
      { label: "Smart Trip Planner", badge: "AI" },
      { label: "Hotels & Stays" },
      { label: "Flights", badge: "New" },
      { label: "Transport" },
      { label: "Attractions & Tours" },
      { label: "Nile & Sea Experiences" },
      { label: "Guides & Assistants" },
      { label: "Food & Restaurants" },
      { label: "Events & Festivals" },
    ],
  },
  {
    title: "Discover Egypt",
    items: [
      { label: "27 Governorates" },
      { label: "Egypt Through Time" },
      { label: "Rulers of Egypt" },
      { label: "Heritage Sites", badge: "New" },
      { label: "Museums & Exhibitions" },
      { label: "Hidden Heritage" },
      { label: "Egyptian Heritage Worldwide" },
      { label: "Ancient Egypt Academy" },
      { label: "Document Center" },
    ],
  },
  {
    title: "Invest & Business",
    items: [
      { label: "Invest in Egypt" },
      { label: "Entertainment Investment", badge: "Hot" },
      { label: "Real Estate & Live in Egypt" },
      { label: "Business & Marketplace" },
      { label: "Corporate & MICE" },
      { label: "Projects & Opportunities" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Visa & Entry" },
      { label: "Health & Medical Tourism" },
      { label: "Safety Center" },
      { label: "Egypt One Pass" },
      { label: "Loyalty & Rewards" },
    ],
  },
];

export const quickCategories = [
  "Hotels",
  "Flights",
  "Attractions",
  "Nile Cruises",
  "Guides",
  "Transport",
  "Food",
  "Events",
  "Shopping",
  "Health",
  "Invest",
  "More",
] as const;

export const discoverCards = [
  {
    title: "27 Governorates",
    subtitle: "Explore all regions",
    image: cardGovernorates,
  },
  {
    title: "Egypt Through Time",
    subtitle: "Journey across eras",
    image: cardThroughTime,
  },
  {
    title: "Heritage Sites",
    subtitle: "Thousands of sites",
    image: cardHeritage,
    badge: "New",
  },
  { title: "Museums", subtitle: "Discover our treasures", image: cardMuseums },
  { title: "Nile & Sea", subtitle: "Rivers, seas & yachts", image: cardNileSea },
  {
    title: "Hidden Heritage",
    subtitle: "Beyond the crowds",
    image: cardHidden,
    badge: "New",
  },
];

export const eras = [
  { name: "Predynastic", years: "c. 6000 – 3100 BC", image: eraPredynastic },
  { name: "Old Kingdom", years: "2686 – 2181 BC", image: eraOldKingdom },
  { name: "Middle Kingdom", years: "2055 – 1650 BC", image: eraMiddleKingdom },
  { name: "New Kingdom", years: "1550 – 1069 BC", image: eraNewKingdom },
  { name: "Ptolemaic", years: "332 – 30 BC", image: eraPtolemaic },
  { name: "Roman Egypt", years: "30 BC – 395 AD", image: eraRoman },
  { name: "Coptic & Byzantine", years: "395 – 641 AD", image: eraCoptic },
  { name: "Islamic Egypt", years: "641 – 969 AD", image: eraIslamic },
  { name: "Fatimid", years: "969 – 1171", image: eraFatimid },
  { name: "Ayyubid", years: "1171 – 1250", image: eraAyyubid },
  { name: "Mamluk", years: "1250 – 1517", image: eraMamluk },
  { name: "Ottoman", years: "1517 – 1805", image: eraOttoman },
  { name: "Muhammad Ali Era", years: "1805 – 1952", image: eraMuhammadAli },
  { name: "Republic", years: "1953 – 1970", image: eraRepublic },
  { name: "Modern Egypt", years: "1970 – Now", image: eraModern },
];

export const partners = [
  "Booking.com",
  "airbnb",
  "Uber",
  "careem",
  "GetYourGuide",
  "Klook",
  "Discover Cars",
  "amazon.eg",
  "EgyptAir",
  "vodafone",
];

export const sectorCards = [
  {
    title: "Invest in Entertainment",
    body: "Theme parks, water parks, marinas, sports & events.",
    cta: "Explore Opportunities",
    image: sectorEntertainment,
  },
  {
    title: "Real Estate in Egypt",
    body: "Buy, rent or invest in residential, commercial & hotel property.",
    cta: "Explore Properties",
    image: sectorRealEstate,
  },
  {
    title: "Rural Egypt",
    body: "Discover authentic rural life, farms, handicrafts & more.",
    cta: "Explore Rural Egypt",
    image: sectorRural,
  },
];

export const promoCards = [
  {
    title: "Special Offers",
    body: "Up to 40% off on selected hotels & experiences.",
    cta: "View Deals",
  },
  {
    title: "One More Night",
    body: "Extend your trip and get special benefits.",
    cta: "Extend Now",
    image: promoHotel,
  },
  {
    title: "Stopover Egypt",
    body: "Make the most of your transit time in Egypt.",
    cta: "Explore Stopovers",
  },
  {
    title: "Visit All 27 Challenge",
    body: "Can you discover all 27 governorates?",
    cta: "Start Challenge",
  },
  {
    title: "Egypt One Pass",
    body: "Unlock rewards, discounts & exclusive benefits.",
    cta: "Join Now",
  },
];

export const trustItems = [
  { title: "Secure Payments", body: "100% secure & trusted" },
  { title: "Licensed & Verified", body: "All providers are verified" },
  { title: "24/7 Support", body: "We are here for you" },
  { title: "Best Price Guarantee", body: "Get the best deals" },
  { title: "Trusted by Travelers", body: "4.8/5 average rating" },
];

export const topCountries = [
  { name: "Saudi Arabia", flag: "🇸🇦", share: 18 },
  { name: "Germany", flag: "🇩🇪", share: 12 },
  { name: "USA", flag: "🇺🇸", share: 10 },
  { name: "UK", flag: "🇬🇧", share: 7 },
  { name: "France", flag: "🇫🇷", share: 5 },
];

export const topGovernorates = [
  { name: "Cairo", value: 92 },
  { name: "Red Sea", value: 78 },
  { name: "Luxor", value: 64 },
  { name: "Alexandria", value: 52 },
  { name: "South Sinai", value: 44 },
  { name: "Aswan", value: 36 },
  { name: "Others", value: 24 },
];

export const primaryNav = [
  { label: "Explore Egypt", href: "#explore" },
  { label: "Governorates", href: "#governorates" },
  { label: "Through Time", href: "#through-time" },
  { label: "Plan Your Trip", href: "#plan" },
  { label: "Invest", href: "#invest" },
  { label: "Film & Culture", href: "#film" },
  { label: "Contact", href: "/contact" },
];

export type FooterLink = { label: string; to?: string; href?: string };

export const footerColumns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: "#explore" },
      { label: "27 Governorates", href: "#governorates" },
      { label: "Heritage & Museums", href: "#explore" },
      { label: "Egypt Through Time", href: "#through-time" },
    ],
  },
  {
    title: "Plan",
    links: [
      { label: "Smart Trip Planner", href: "#plan" },
      { label: "AI Concierge", href: "#ai-concierge" },
      { label: "Programmes", href: "#programmes" },
      { label: "Search Egypt One", href: "#search" },
    ],
  },
  {
    title: "Invest",
    links: [
      { label: "Investment Sectors", href: "#invest" },
      { label: "Opportunities", href: "#invest" },
      { label: "Partner With Us" },
      { label: "Press & Media" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact Us", to: "/contact" },
      { label: "Help Centre", to: "/contact" },
      { label: "Report an Issue" },
      { label: "Accessibility" },
    ],
  },
];

export const pillars = [
  {
    title: "Explore Egypt",
    body: "Destinations, 27 governorates, heritage sites, museums and living culture.",
    cta: "Start exploring",
    href: "#explore",
    image: cardGovernorates,
  },
  {
    title: "Plan Your Journey",
    body: "Build an itinerary day by day with the Egypt One trip planner and AI concierge.",
    cta: "Plan a trip",
    href: "#plan",
    image: cardNileSea,
  },
  {
    title: "Invest in Egypt",
    body: "Sectors, projects and the business ecosystem behind a growing economy.",
    cta: "See sectors",
    href: "#invest",
    image: sectorRealEstate,
  },
];

export const investSectors = [
  "Real Estate",
  "Tourism & Hospitality",
  "Technology",
  "Healthcare",
  "Creative Economy",
  "Education",
  "Industry",
  "Entertainment",
];

export const programmes = [
  { title: "Egypt One Pass", body: "One digital pass for attractions, rewards and benefits." },
  { title: "Visit All 27", body: "A national challenge across every Egyptian governorate." },
  { title: "Stopover Egypt", body: "Turn a transit stop into a curated short journey." },
  { title: "One More Night", body: "Extend a stay and unlock added value with partners." },
];

// ---------------------------------------------------------------------------
// Dashboard shell data (matches the Egypt One reference layout)
// ---------------------------------------------------------------------------

import destCairo from "@/assets/dest-cairo.jpg";
import destLuxor from "@/assets/dest-luxor.jpg";
import destAswan from "@/assets/dest-aswan.jpg";
import destSharm from "@/assets/dest-sharm.jpg";
import destHurghada from "@/assets/dest-hurghada.jpg";
import destAlexandria from "@/assets/dest-alexandria.jpg";
import promoSummer from "@/assets/promo-summer.jpg";
import promoCruise from "@/assets/promo-cruise.jpg";
import promoAdventure from "@/assets/promo-adventure.jpg";

export const topTabs = [
  "Home",
  "Explore",
  "Experiences",
  "Stay",
  "Events",
  "Transport",
  "Services",
  "eSIM & Connectivity",
] as const;

export const searchTabs = ["Experiences", "Hotels", "Flights", "Packages", "Attractions"] as const;

export const popularDestinations = [
  { name: "Cairo", note: "The Timeless Capital", rating: 4.8, reviews: "3,245", image: destCairo },
  { name: "Luxor", note: "World's Greatest Open Air Museum", rating: 4.9, reviews: "2,150", image: destLuxor },
  { name: "Aswan", note: "Nubian Charm & Timeless Beauty", rating: 4.7, reviews: "1,842", image: destAswan },
  { name: "Sharm El Sheikh", note: "Red Sea Paradise", rating: 4.6, reviews: "1,523", image: destSharm },
  { name: "Hurghada", note: "Sun. Sea. Adventure.", rating: 4.5, reviews: "1,234", image: destHurghada },
  { name: "Alexandria", note: "Mediterranean Elegance", rating: 4.6, reviews: "987", image: destAlexandria },
];

export const promoBanners = [
  {
    kicker: "Summer Escapes",
    title: "Up to 30% off on selected hotels",
    cta: "Book Now",
    image: promoSummer,
  },
  {
    kicker: "Nile Cruise Special",
    title: "Save up to 25% on cruise itineraries",
    cta: "Explore Cruises",
    image: promoCruise,
  },
  {
    kicker: "Egypt Adventure",
    title: "Desert safari, dives & balloon rides",
    cta: "Discover Experiences",
    image: promoAdventure,
  },
];

export const trendingExperiences = [
  { name: "Pyramids of Giza Tour", rating: 4.9, reviews: "2,845", from: "$65", image: destCairo },
  { name: "Nile Dinner Cruise", rating: 4.7, reviews: "1,543", from: "$75", image: promoCruise },
  { name: "Abu Simbel Day Trip", rating: 4.8, reviews: "1,234", from: "$90", image: destAswan },
];

export const visitorPurpose = [
  { label: "Leisure", value: 62 },
  { label: "Culture", value: 21 },
  { label: "Business", value: 9 },
  { label: "Other", value: 8 },
];

export const monthlyVisitors = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 48 },
  { month: "Mar", value: 55 },
  { month: "Apr", value: 63 },
  { month: "May", value: 74 },
  { month: "Jun", value: 100 },
];

// ---------------------------------------------------------------------------
// Sector strip, offers, research & marketplace (reference-mockup parity)
// ---------------------------------------------------------------------------

import secEntertainment from "@/assets/sec-entertainment.jpg";
import secWellness from "@/assets/sec-wellness.jpg";
import secMarina from "@/assets/sec-marina.jpg";
import secDesert from "@/assets/sec-desert.jpg";
import secEducation from "@/assets/sec-education.jpg";
import secMice from "@/assets/sec-mice.jpg";
import secSports from "@/assets/sec-sports.jpg";
import secFamily from "@/assets/sec-family.jpg";
import offerDeals from "@/assets/offer-deals.jpg";
import offerStopover from "@/assets/offer-stopover.jpg";
import offerVisit27 from "@/assets/offer-visit27.jpg";
import offerClub from "@/assets/offer-club.jpg";
import researchGenome from "@/assets/research-genome.jpg";
import filmEgypt from "@/assets/film-egypt.jpg";
import marketCrafts from "@/assets/market-crafts.jpg";

export const heroImages = { film: filmEgypt, research: researchGenome, market: marketCrafts };

export const egyptSectors = [
  { title: "Entertainment & Leisure", note: "Parks, shows & nightlife", image: secEntertainment },
  { title: "Wellness & Retreats", note: "Spas, springs & healing", image: secWellness },
  { title: "Yachts & Marinas", note: "Red Sea & Mediterranean", image: secMarina },
  { title: "Desert & Oases", note: "Safari, dunes & stargazing", image: secDesert },
  { title: "Education & Study", note: "Universities & academies", image: secEducation },
  { title: "Conferences & MICE", note: "Expos, summits & venues", image: secMice },
  { title: "Sports & Celebrations", note: "Stadiums, races & festivals", image: secSports },
  { title: "Families & Kids", note: "Journeys for every age", image: secFamily },
];

export const offerCards = [
  {
    title: "Special Offers",
    body: "Up to 40% off selected hotels and experiences.",
    cta: "View Deals",
    image: offerDeals,
    tag: "Save 40%",
  },
  {
    title: "One More Night",
    body: "Extend your stay and unlock partner benefits.",
    cta: "Extend Now",
    image: promoHotel,
    tag: "Free night",
  },
  {
    title: "Stopover Egypt",
    body: "Turn your transit time into a curated short journey.",
    cta: "Explore Stopovers",
    image: offerStopover,
    tag: "Transit",
  },
  {
    title: "Visit All 27 Challenge",
    body: "Collect every governorate and earn national badges.",
    cta: "Start Challenge",
    image: offerVisit27,
    tag: "Challenge",
  },
  {
    title: "ONE CLUB GOLD",
    body: "Membership tiers with lounge, upgrade and priority perks.",
    cta: "Join the Club",
    image: offerClub,
    tag: "Members",
  },
];

export const researchItems = [
  { title: "Ancient & modern genome studies", note: "Peer-reviewed continuity research" },
  { title: "Linguistic continuity", note: "From Ancient Egyptian to Coptic to Arabic" },
  { title: "Craft & tradition lineage", note: "Living practices traced across millennia" },
  { title: "Document & archive centre", note: "Digitised records open to researchers" },
];

export const marketplaceItems = [
  { title: "Egyptian Cotton", note: "Certified mills & ateliers" },
  { title: "Handmade Crafts", note: "Artisans across 27 governorates" },
  { title: "Wear Egypt", note: "Modern design, ancient roots" },
  { title: "Local Producers", note: "Farms, spices & Nile harvests" },
];

export const weatherStrip = [
  { city: "Cairo", temp: "28°", state: "Clear" },
  { city: "Alexandria", temp: "24°", state: "Breezy" },
  { city: "Luxor", temp: "34°", state: "Sunny" },
  { city: "Sharm El Sheikh", temp: "31°", state: "Sunny" },
];

export const govIntegrations = [
  "Ministry of Tourism & Antiquities",
  "Ministry of Civil Aviation",
  "Egyptian Tourism Authority",
  "Supreme Council of Antiquities",
  "Invest in Egypt (GAFI)",
];
