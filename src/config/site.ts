/**
 * Single source of truth for Egyptora Hub's public identity.
 * Nothing else in the app should hardcode the domain or contact address.
 */
export const SITE = {
  name: "Egyptora Hub",
  tagline: "One Egypt. One Journey. One Platform.",
  url: "https://www.egyptora-hub.com",
  domain: "www.egyptora-hub.com",
  email: "info@egyptora-hub.com",
  support: "info@egyptora-hub.com",
  // Egyptora Hub is the public brand; EGYPTORA is the registered legal/holding company
  // operating it. Single source of truth for all "operated by" copy.
  parentCompany: "EGYPTORA",
  locales: ["en", "ar"] as const,
  social: {
    facebook: "https://www.facebook.com/egyptone",
    instagram: "https://www.instagram.com/egyptone",
    tiktok: "https://www.tiktok.com/@egyptone",
    x: "https://x.com/egyptone",
    youtube: "https://www.youtube.com/@egyptone",
    linkedin: "https://www.linkedin.com/company/egyptone",
  },
} as const;

export const mailto = (subject?: string) =>
  subject ? `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}` : `mailto:${SITE.email}`;
