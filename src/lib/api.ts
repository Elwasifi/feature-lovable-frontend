/**
 * Frontend → backend endpoint map for Egypt One.
 *
 * Every data-driven section on the site declares the endpoint it will consume
 * once the backend exposes it. `status` documents integration honesty:
 *  - REAL     : endpoint exists and is wired
 *  - PLANNED  : endpoint agreed in the API contract, UI ready, not yet wired
 *  - DEMO     : section renders demonstration content until an endpoint exists
 */
export type EndpointStatus = "REAL" | "PLANNED" | "DEMO";

export type Endpoint = {
  path: string;
  method: "GET" | "POST";
  status: EndpointStatus;
  section: string;
};

export const API: Record<string, Endpoint> = {
  search: { path: "/api/search", method: "GET", status: "REAL", section: "Hero search" },
  tripBuild: { path: "/api/trip/build", method: "POST", status: "REAL", section: "Smart Trip Planner" },
  concierge: { path: "/api/ai/concierge", method: "POST", status: "REAL", section: "AI Concierge" },

  destinations: { path: "/api/destinations", method: "GET", status: "PLANNED", section: "Popular destinations" },
  governorates: { path: "/api/governorates", method: "GET", status: "PLANNED", section: "27 Governorates" },
  eras: { path: "/api/eras", method: "GET", status: "PLANNED", section: "Egypt through time" },
  sectors: { path: "/api/sectors", method: "GET", status: "PLANNED", section: "Egypt sectors" },
  offers: { path: "/api/offers", method: "GET", status: "PLANNED", section: "Offers & programmes" },
  experiences: { path: "/api/experiences/trending", method: "GET", status: "PLANNED", section: "Trending experiences" },
  marketplace: { path: "/api/marketplace", method: "GET", status: "PLANNED", section: "Marketplace & crafts" },
  film: { path: "/api/film", method: "GET", status: "PLANNED", section: "Film & culture" },
  research: { path: "/api/research", method: "GET", status: "PLANNED", section: "Research & continuity" },
  intelligence: { path: "/api/intelligence/tourism", method: "GET", status: "PLANNED", section: "Tourism intelligence" },
  weather: { path: "/api/weather", method: "GET", status: "PLANNED", section: "Weather & currency strip" },
};
