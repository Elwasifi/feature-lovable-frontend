import { useI18n } from "@/i18n";

export function AdminChecking() {
  const { t } = useI18n();
  return (
    <div className="grid min-h-[60vh] place-items-center bg-background px-5">
      <p className="text-sm text-muted-foreground">{t("Checking your access…")}</p>
    </div>
  );
}

export function AdminDenied() {
  const { t } = useI18n();
  return (
    <div className="grid min-h-[60vh] place-items-center bg-background px-5">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card/60 p-8 text-center">
        <h1 className="font-display text-3xl text-foreground">{t("Not authorized")}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("You do not have permission to view this page.")}
        </p>
      </div>
    </div>
  );
}

export function adminHead(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}
