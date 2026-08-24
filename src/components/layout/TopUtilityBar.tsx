import { LifeBuoy, Mail } from "lucide-react";
import { CurrencySwitcher } from "@/components/site/CurrencySwitcher";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { useI18n } from "@/i18n";
import { Container } from "@/components/site/Primitives";
import { SITE, mailto } from "@/config/site";

export function TopUtilityBar() {
  const { t } = useI18n();
  return (
    <div className="hidden border-b border-border/60 bg-sidebar text-[11px] text-muted-foreground md:block">
      <Container className="flex h-9 items-center justify-between">
        <div className="flex items-center gap-4">
          <LanguageSwitcher compact />
          <CurrencySwitcher compact />
          <span className="hidden lg:inline">{t("Visiting from: Worldwide")}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={mailto("Egypt One — support request")}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <Mail className="size-3.5" />
            <span dir="ltr">{SITE.email}</span>
          </a>
          <a href="#support" className="flex items-center gap-1.5 transition-colors hover:text-gold">
            <LifeBuoy className="size-3.5" />
            {t("Support")}
          </a>
        </div>
      </Container>
    </div>
  );
}
