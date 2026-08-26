declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID = import.meta.env[
  "VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY"
] as string | undefined;

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/** Inline bootstrap injected into <head> before the app mounts. */
export const GA_INLINE_SNIPPET = GA_MEASUREMENT_ID
  ? `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`
  : "";

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;
  gtag("event", "page_view", { page_path: path, page_location: window.location.href });
}
