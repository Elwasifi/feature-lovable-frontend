import { useMemo, useState } from "react";
import { MapPin, Landmark, ArrowRight } from "lucide-react";
import { useI18n } from "@/i18n";
import {
  governorates,
  egyptOutline,
  nileCourse,
  projectX,
  projectY,
  type Governorate,
} from "@/data/governorates";

const toPath = (pts: [number, number][], close: boolean) =>
  pts
    .map(([lon, lat], i) => `${i === 0 ? "M" : "L"}${projectX(lon).toFixed(2)} ${projectY(lat).toFixed(2)}`)
    .join(" ") + (close ? " Z" : "");

export function EgyptMap() {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState<string>("cairo");
  const [hoverId, setHoverId] = useState<string | null>(null);

  const outlinePath = useMemo(() => toPath(egyptOutline, true), []);
  const nilePath = useMemo(() => toPath(nileCourse, false), []);
  const active = governorates.find((g) => g.id === activeId) as Governorate;
  const labelled = hoverId ?? activeId;
  const labelGov = governorates.find((g) => g.id === labelled) as Governorate;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)]">
      <div className="relative overflow-hidden rounded-2xl border border-border/70 bg-surface-2">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 0%, var(--gold-soft), transparent 60%), radial-gradient(90% 80% at 20% 100%, oklch(0.24 0.03 255 / 70%), transparent 70%)",
          }}
        />
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label={t("Interactive map of Egypt's 27 governorates")}
          className="relative h-[420px] w-full"
        >
          <defs>
            <linearGradient id="egLand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.3 0.03 255)" />
              <stop offset="100%" stopColor="oklch(0.21 0.025 255)" />
            </linearGradient>
            <filter id="egGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="1.1" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="egGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M5 0H0V5" fill="none" stroke="var(--gold-line)" strokeWidth="0.12" opacity="0.35" />
            </pattern>
          </defs>

          <rect width="100" height="100" fill="url(#egGrid)" opacity="0.5" />

          <path d={outlinePath} fill="url(#egLand)" stroke="var(--gold-line)" strokeWidth="0.55" />
          <path d={outlinePath} fill="url(#egGrid)" opacity="0.5" />
          <path
            d={nilePath}
            fill="none"
            stroke="oklch(0.65 0.12 220 / 70%)"
            strokeWidth="0.6"
            strokeLinecap="round"
          />

          {governorates.map((g) => {
            const isActive = g.id === activeId;
            const isHover = g.id === hoverId;
            return (
              <g
                key={g.id}
                className="cursor-pointer"
                onMouseEnter={() => setHoverId(g.id)}
                onMouseLeave={() => setHoverId((h) => (h === g.id ? null : h))}
                onClick={() => setActiveId(g.id)}
              >
                <circle cx={projectX(g.lon)} cy={projectY(g.lat)} r="2.6" fill="transparent" />
                {isActive && (
                  <circle
                    cx={projectX(g.lon)}
                    cy={projectY(g.lat)}
                    r="2.2"
                    fill="none"
                    stroke="var(--gold)"
                    strokeWidth="0.3"
                    opacity="0.7"
                  />
                )}
                <circle
                  cx={projectX(g.lon)}
                  cy={projectY(g.lat)}
                  r={isActive ? 1.1 : isHover ? 0.95 : 0.7}
                  fill={isActive || isHover ? "var(--gold)" : "oklch(0.82 0.09 85 / 65%)"}
                  filter={isActive ? "url(#egGlow)" : undefined}
                />
              </g>
            );
          })}

          {active.sites.map((s) => (
            <g key={s.name} pointerEvents="none">
              <circle
                cx={projectX(s.lon)}
                cy={projectY(s.lat)}
                r="0.55"
                fill="oklch(0.72 0.15 155)"
              />
              <circle
                cx={projectX(s.lon)}
                cy={projectY(s.lat)}
                r="1.5"
                fill="none"
                stroke="oklch(0.72 0.15 155 / 45%)"
                strokeWidth="0.18"
              />
            </g>
          ))}

          <g pointerEvents="none">
            <text
              x={Math.min(projectX(labelGov.lon) + 2.2, 82)}
              y={projectY(labelGov.lat) - 1.6}
              fill="var(--gold)"
              fontSize="2.6"
              className="font-semibold"
            >
              {t(labelGov.name)}
            </text>
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-gold" /> {t("Governorate")}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-success" /> {t("Tourist site")}
          </span>
        </div>
      </div>

      <div className="grid content-start gap-3 rounded-2xl border border-border/70 bg-card p-5">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {t(active.region)}
          </p>
          <h3 className="font-display text-xl text-gold">{t(active.name)}</h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {t("Capital")}: {t(active.capital)}
          </p>
        </div>

        <ul className="grid gap-2">
          {active.sites.map((s) => (
            <li
              key={s.name}
              className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface-2 px-3 py-2 text-xs text-foreground/85"
            >
              <Landmark className="size-3.5 shrink-0 text-gold" />
              {t(s.name)}
            </li>
          ))}
        </ul>

        <div className="max-h-40 overflow-y-auto rounded-xl border border-border/60 p-2">
          <div className="flex flex-wrap gap-1.5">
            {governorates.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveId(g.id)}
                onMouseEnter={() => setHoverId(g.id)}
                onMouseLeave={() => setHoverId(null)}
                className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                  g.id === activeId
                    ? "border-gold-line bg-gold-soft text-gold"
                    : "border-border/60 text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(g.name)}
              </button>
            ))}
          </div>
        </div>

        <a
          href="#explore"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gold-line bg-gold-soft px-4 py-2 text-sm font-semibold text-gold"
        >
          <MapPin className="size-4" /> {t("Browse governorates")} <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
