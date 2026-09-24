import { useNavigate } from "@tanstack/react-router";

/** Sends a query to the site-wide search results page (/search?q=...). */
export function useSiteSearch() {
  const navigate = useNavigate();
  return (q: string) => {
    const query = q.trim();
    if (!query) return;
    void navigate({ to: "/search", search: { q: query } });
  };
}
