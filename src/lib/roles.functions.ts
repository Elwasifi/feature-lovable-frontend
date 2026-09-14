import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AppRole = "admin" | "crm_properties" | "crm_investment" | "government_viewer";

export type MyRoles = {
  admin: boolean;
  crmProperties: boolean;
  crmInvestment: boolean;
};

export async function checkRole(
  context: { supabase: any; userId: string },
  role: AppRole,
): Promise<boolean> {
  const { data, error } = await context.supabase.rpc("has_role", {
    check_user_id: context.userId,
    check_role: role,
  });
  return !error && data === true;
}

/** Roles of the signed-in user. Admin implies both CRM roles. */
export const getMyRoles = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<MyRoles> => {
    const [admin, crmProperties, crmInvestment] = await Promise.all([
      checkRole(context, "admin"),
      checkRole(context, "crm_properties"),
      checkRole(context, "crm_investment"),
    ]);
    return {
      admin,
      crmProperties: admin || crmProperties,
      crmInvestment: admin || crmInvestment,
    };
  });
