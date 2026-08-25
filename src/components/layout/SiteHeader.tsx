import { useState } from "react";
import { AppRail } from "@/components/dashboard/AppRail";
import { DashboardTopBar } from "@/components/dashboard/DashboardTopBar";
import { useI18n } from "@/i18n";

/**
 * Unified site header: renders the exact same dashboard top bar used on the
 * homepage, so navigation looks and behaves identically on every sub page.
 * On sub pages the side menu opens as an overlay drawer.
 */
export function SiteHeader() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {menuOpen && (
        <>
          <button
            type="button"
            aria-label={t("Close menu")}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 start-0 z-50 shadow-2xl">
            <AppRail open onClose={() => setMenuOpen(false)} />
          </div>
        </>
      )}

      <DashboardTopBar onMenu={() => setMenuOpen(true)} showBack />
    </>
  );
}
