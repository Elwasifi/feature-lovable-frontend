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
  { name: "Ancient Egypt", years: "3100 BC – 332 BC" },
  { name: "Greek & Roman", years: "332 BC – 395 AD" },
  { name: "Coptic & Christian", years: "395 – 641 AD" },
  { name: "Islamic Egypt", years: "641 – 1517 AD" },
  { name: "Ottoman Era", years: "1517 – 1805 AD" },
  { name: "Modern Egypt", years: "1805 – Now" },
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

export const footerColumns = [
  {
    title: "About",
    links: ["About Us", "Careers", "Press", "Partners"],
  },
  {
    title: "Travel",
    links: ["Plan Your Trip", "Destinations", "Travel Guides", "Visa Information"],
  },
  {
    title: "Invest",
    links: ["Invest in Egypt", "Opportunities", "Why Egypt", "Success Stories"],
  },
  {
    title: "Legal",
    links: ["Terms & Conditions", "Privacy Policy", "Cookie Policy", "Data Protection"],
  },
  {
    title: "Support",
    links: ["Help Center", "Contact Us", "Safety Center", "Report an Issue"],
  },
];
