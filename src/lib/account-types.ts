/**
 * Descriptive account classification stored on `profiles.account_type`.
 * This is informational metadata only — it grants no permissions and is never
 * read by has_role/checkRole/canAccess/isAdmin or any RLS policy.
 */
export const ACCOUNT_TYPES = ["individual", "government", "investor", "service_provider"] as const;

export type AccountType = (typeof ACCOUNT_TYPES)[number];

/** English source strings — pass through `t()` at render time. */
export const ACCOUNT_TYPE_LABEL: Record<AccountType, string> = {
  individual: "Individual traveller",
  government: "Government entity",
  investor: "Investor",
  service_provider: "Service provider",
};

export function toAccountType(value: unknown): AccountType {
  return ACCOUNT_TYPES.includes(value as AccountType) ? (value as AccountType) : "individual";
}
