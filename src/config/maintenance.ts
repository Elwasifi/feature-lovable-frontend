/**
 * Maintenance Mode.
 *
 * The real switch now lives in the database and is controlled from the
 * owner panel at /admin/maintenance — no code change or redeploy needed.
 *
 * MAINTENANCE_MODE below is only a hard override: true = force the site
 * closed regardless of the panel. Leave it false for normal operation.
 *
 * Owner bypass while closed: open the site once with ?bypass=egyptone
 * (remove it with ?bypass=off).
 */
export const MAINTENANCE_MODE = false;

export const MAINTENANCE_BYPASS_KEY = "egypt-one:maintenance-bypass";
export const MAINTENANCE_BYPASS_TOKEN = "egyptone";
