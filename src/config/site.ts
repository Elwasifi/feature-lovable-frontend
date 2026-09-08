/**
 * Single source of truth for Egyptora Hub's public identity.
 * Nothing else in the app should hardcode the domain or contact address.
 */
export const SITE = {
  name: "Egyptora Hub",
  tagline: "Everything Egypt. One Hub.",
  url: "https://www.egyptora-hub.com",
  domain: "www.egyptora-hub.com",
  email: "info@egyptora-hub.com",
  support: "info@egyptora-hub.com",
  marketingEmail: "marketing@egyptora-hub.com",
  // Egyptora Hub is the public brand; EGYPTORA is the registered legal/holding company
  // operating it. Single source of truth for all "operated by" copy.
  parentCompany: "EGYPTORA",
  locales: ["en", "ar"] as const,
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61594025470155",
    instagram: "https://www.instagram.com/egyptorahub/",
    tiktok: "https://www.tiktok.com/@user6696191367181",
    x: "https://x.com/EgyptoraHub",
  },
} as const;

export const mailto = (subject?: string, address: string = SITE.email) =>
  subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;

