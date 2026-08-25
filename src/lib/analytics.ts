declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export const GA_MEASUREMENT_ID = import.meta.env
  .VITE_LOVABLE_CONNECTOR_GOOGLE_ANALYTICS_API_KEY as string | undefined;

export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

let initialized = false;

export function initAnalytics() {
  if (initialized || typeof window === "undefined") return;
  if (!GA_MEASUREMENT_ID) return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

export function trackPageView(path: string) {
  if (!GA_MEASUREMENT_ID) return;
  gtag("event", "page_view", { page_path: path, page_location: window.location.href });
}
