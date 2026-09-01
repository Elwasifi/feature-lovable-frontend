/**
 * Maintenance Mode — single switch for the whole site.
 *
 * true  = every visitor sees the "This Page Not Available" page.
 * false = the site works normally.
 *
 * Owner bypass: open the site with ?bypass=egyptone once. The bypass is stored
 * in the browser (localStorage key below) and a small "Maintenance Mode" badge
 * appears bottom-left so you know the site is still closed to the public.
 * Remove the bypass by opening the site with ?bypass=off.
 */
export const MAINTENANCE_MODE = false;

export const MAINTENANCE_BYPASS_KEY = "egypt-one:maintenance-bypass";
export const MAINTENANCE_BYPASS_TOKEN = "egyptone";
