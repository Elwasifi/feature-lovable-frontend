/**
 * Planned future integrations, as plain documented data.
 *
 * Nothing here performs a network call, holds credentials or points at a real
 * endpoint. It exists so a future real integration has one obvious place to land.
 */

export type IntegrationStatus = "not_connected" | "in_progress" | "connected";

export type IntegrationEntry = {
  key: string;
  name: string;
  description: string;
  status: IntegrationStatus;
  notes: string;
};

export const INTEGRATIONS: IntegrationEntry[] = [
  {
    key: "government_portal",
    name: "Government portal",
    description:
      "Planned link to an official government data portal for verifying listings and licence references.",
    status: "not_connected",
    notes:
      "Placeholder only. No endpoint, credentials or data exchange configured yet. Scope, data-sharing agreement and authority contact still to be confirmed.",
  },
  {
    key: "service_provider_api",
    name: "Service provider API",
    description:
      "Planned link to a service provider API for live availability and pricing from hotels, guides and operators.",
    status: "not_connected",
    notes:
      "Placeholder only. Provider not selected. Expected to be read-only at first, feeding the providers catalogue.",
  },
];

export const INTEGRATION_STATUS_LABEL: Record<IntegrationStatus, string> = {
  not_connected: "Not connected",
  in_progress: "In progress",
  connected: "Connected",
};
