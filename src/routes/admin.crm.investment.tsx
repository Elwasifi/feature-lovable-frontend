import { createFileRoute } from "@tanstack/react-router";
import { CrmBoard } from "@/components/admin/CrmBoard";
import { adminHead } from "@/components/admin/AdminStates";
import { SITE } from "@/config/site";

export const Route = createFileRoute("/admin/crm/investment")({
  ssr: false,
  head: () => adminHead(`Investment CRM — ${SITE.name}`, "Internal investment pipeline."),
  component: () => <CrmBoard itemType="investment_opportunity" heading="Investment CRM" />,
});
