export type LangCode = "en" | "ar" | "fr" | "de" | "es" | "it" | "ru" | "zh" | "hi";

export type Language = {
  code: LangCode;
  label: string;
  native: string;
  flag: string;
  dir: "ltr" | "rtl";
};

/** The 9 primary global languages supported by Egypt One. */
export const LANGUAGES: Language[] = [
  { code: "en", label: "English", native: "English", flag: "🇬🇧", dir: "ltr" },
  { code: "ar", label: "Arabic", native: "العربية", flag: "🇪🇬", dir: "rtl" },
  { code: "fr", label: "French", native: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", label: "German", native: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "es", label: "Spanish", native: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "it", label: "Italian", native: "Italiano", flag: "🇮🇹", dir: "ltr" },
  { code: "ru", label: "Russian", native: "Русский", flag: "🇷🇺", dir: "ltr" },
  { code: "zh", label: "Chinese", native: "中文", flag: "🇨🇳", dir: "ltr" },
  { code: "hi", label: "Hindi", native: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
];

export const DEFAULT_LANG: LangCode = "en";
