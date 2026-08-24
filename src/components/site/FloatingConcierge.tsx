import { useCallback, useEffect, useRef, useState } from "react";
import { Send, Sparkles, X } from "lucide-react";
import avatar from "@/assets/concierge-avatar.jpg";
import { mailto } from "@/config/site";
import { useI18n } from "@/i18n";

type Pos = { x: number; y: number };

const STORAGE_KEY = "egypt-one:concierge-pos";
const SIZE = 68;
const MARGIN = 16;

/**
 * Floating, draggable AI Concierge launcher.
 * Sits bottom-end by default; the user can drag it anywhere on screen.
 */
export function FloatingConcierge() {
  const { t } = useI18n();
  const [pos, setPos] = useState<Pos | null>(null);
  const [open, setOpen] = useState(false);
  const dragging = useRef(false);
  const moved = useRef(false);
  const offset = useRef<Pos>({ x: 0, y: 0 });

  // Default placement (bottom-right) + restore any saved position.
  useEffect(() => {
    const clamp = (p: Pos): Pos => ({
      x: Math.min(Math.max(p.x, MARGIN), window.innerWidth - SIZE - MARGIN),
      y: Math.min(Math.max(p.y, MARGIN), window.innerHeight - SIZE - MARGIN),
    });
    let start: Pos = {
      x: window.innerWidth - SIZE - 24,
      y: window.innerHeight - SIZE - 24,
    };
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) start = JSON.parse(raw) as Pos;
    } catch {
      /* ignore malformed storage */
    }
    setPos(clamp(start));

    const onResize = () => setPos((p) => (p ? clamp(p) : p));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    dragging.current = true;
    moved.current = false;
    const rect = e.currentTarget.getBoundingClientRect();
    offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragging.current) return;
    moved.current = true;
    const next: Pos = {
      x: Math.min(
        Math.max(e.clientX - offset.current.x, MARGIN),
        window.innerWidth - SIZE - MARGIN,
      ),
      y: Math.min(
        Math.max(e.clientY - offset.current.y, MARGIN),
        window.innerHeight - SIZE - MARGIN,
      ),
    };
    setPos(next);
  }, []);

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!dragging.current) return;
      dragging.current = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
      if (pos) {
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
        } catch {
          /* storage unavailable */
        }
      }
      if (!moved.current) setOpen((v) => !v);
    },
    [pos],
  );

  if (!pos) return null;

  const panelOnLeft = pos.x > window.innerWidth / 2;
  const panelAbove = pos.y > window.innerHeight / 2;

  return (
    <div className="pointer-events-none fixed inset-0 z-[60]" aria-live="polite">
      {open && (
        <div
          dir="auto"
          className="pointer-events-auto absolute w-[min(340px,calc(100vw-32px))] overflow-hidden rounded-2xl border border-gold-line bg-popover shadow-[var(--shadow-card)]"
          style={{
            left: panelOnLeft ? undefined : pos.x,
            right: panelOnLeft ? window.innerWidth - pos.x - SIZE : undefined,
            top: panelAbove ? undefined : pos.y + SIZE + 12,
            bottom: panelAbove ? window.innerHeight - pos.y + 12 : undefined,
          }}
        >
          <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 bg-gold-soft px-4 py-3">
            <img
              src={avatar}
              alt=""
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover ring-1 ring-gold-line"
            />
            <span className="min-w-0">
              <span className="block truncate font-display text-sm text-gold">
                {t("AI Concierge")}
              </span>
              <span className="block truncate text-[11px] text-muted-foreground">
                {t("Your personal assistant for everything Egypt")}
              </span>
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label={t("Close")}
              className="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </header>

          <div className="grid gap-2 p-4">
            <p className="text-xs leading-relaxed text-muted-foreground">
              {t(
                "Ask for a 7-day itinerary, a Nile cruise window or a quiet heritage route — the concierge drafts it, you refine it.",
              )}
            </p>
            <div className="mt-1 grid gap-1.5">
              {[
                "Plan 5 days in Cairo & Luxor",
                "Best time for a Nile cruise",
                "Family-friendly Red Sea stays",
              ].map((q) => (
                <a
                  key={q}
                  href={mailto(`Egypt One — AI Concierge: ${q}`)}
                  className="rounded-lg border border-border/70 bg-card px-3 py-2 text-[11px] text-muted-foreground transition-colors hover:border-gold-line hover:text-foreground"
                >
                  {t(q)}
                </a>
              ))}
            </div>
            <a
              href={mailto("Egypt One — AI Concierge access")}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-xs font-semibold text-primary-foreground"
            >
              <Send className="size-3.5" /> {t("Open AI Concierge")}
            </a>
            <p className="mt-2 text-[10px] leading-relaxed text-muted-foreground/80">
              {t(
                "You are talking to an AI system, not a human agent or a government official. Its answers are not legal, medical or investment advice and never replace official emergency services — for emergencies contact the official authorities.",
              )}{" "}
              <Link to="/legal/ai-transparency" className="text-gold hover:underline">
                {t("AI Transparency Policy")}
              </Link>
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={t("AI Concierge")}
        aria-expanded={open}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ left: pos.x, top: pos.y, width: SIZE, height: SIZE }}
        className="pointer-events-auto absolute grid touch-none place-items-center rounded-full border-2 border-gold bg-background shadow-[0_10px_30px_-8px_rgba(0,0,0,0.9)] transition-transform hover:scale-105 active:scale-95"
      >
        <span className="absolute inset-0 animate-ping rounded-full border border-gold/40" />
        <img
          src={avatar}
          alt=""
          width={68}
          height={68}
          className="size-full rounded-full object-cover"
        />
        <span className="absolute -top-1 -end-1 grid size-6 place-items-center rounded-full bg-gold text-primary-foreground">
          <Sparkles className="size-3.5" />
        </span>
      </button>
    </div>
  );
}
