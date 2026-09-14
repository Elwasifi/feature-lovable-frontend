import { createFileRoute } from "@tanstack/react-router";
import { CrmBoard } from "@/components/admin/CrmBoard";
import { adminHead } from "@/components/admin/AdminStates";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/admin/crm/properties")({
  ssr: false,
  head: () => adminHead(`Properties CRM — ${SITE.name}`, "Internal properties pipeline."),
  component: () => <CrmBoard itemType="property" heading="Properties CRM" />,
});
