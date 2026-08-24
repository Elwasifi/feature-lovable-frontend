import { useCallback, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BadgeCheck,
  CalendarDays,
  Gem,
  LifeBuoy,
  Loader2,
  LogOut,
  MapPin,
  Phone,
  Plus,
  Radio,
  Settings,
  Star,
  Ticket,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/i18n";
import { mailto } from "@/config/site";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { Container } from "@/components/site/Primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "My Egypt One dashboard — trips, rewards & support" },
      {
        name: "description",
        content:
          "Track live booking status, review past journeys, manage account settings and follow your Egypt One Pass points and benefits.",
      },
      { property: "og:title", content: "My Egypt One dashboard" },
      {
        property: "og:description",
        content: "Live trip tracking, rewards balance, emergency assistance and traveller settings.",
      },
    ],
  }),
  component: AccountPage,
});

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  whatsapp: string | null;
  country: string | null;
  emergency_contact: string | null;
  points: number;
  tier: string;
};

type Trip = {
  id: string;
  reference: string;
  title: string;
  destination: string;
  start_date: string | null;
  end_date: string | null;
  status: string;
  live_stage: string | null;
  progress: number;
  travellers: number;
  price_usd: number;
  points_earned: number;
};

type Review = { id: string; trip_id: string; rating: number; comment: string | null };

const INPUT =
  "h-11 rounded-lg border border-border bg-background/60 px-3 text-sm text-foreground outline-none focus:border-gold-line";

const LIVE_STAGES = [
  "Booking confirmed",
  "Guide assigned",
  "Transfer scheduled",
  "Trip in progress",
  "Completed",
];

function AccountPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<"live" | "past" | "settings">("live");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  const load = useCallback(async (uid: string) => {
    const [p, tr, rv] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", uid).maybeSingle(),
      supabase.from("trips").select("*").eq("user_id", uid).order("start_date", { ascending: false }),
      supabase.from("trip_reviews").select("id, trip_id, rating, comment").eq("user_id", uid),
    ]);
    if (p.data) setProfile(p.data as Profile);
    setTrips((tr.data ?? []) as Trip[]);
    setReviews((rv.data ?? []) as Review[]);
  }, []);

  useEffect(() => {
    if (!user) return;
    void load(user.id);
    const channel = supabase
      .channel("account-trips")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "trips", filter: `user_id=eq.${user.id}` },
        () => void load(user.id),
      )
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [user, load]);

  const live = useMemo(() => trips.filter((x) => x.status !== "completed" && x.status !== "cancelled"), [trips]);
  const past = useMemo(() => trips.filter((x) => x.status === "completed"), [trips]);

  async function saveProfile(patch: Partial<Profile>) {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update(patch).eq("id", user.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success(t("Settings saved"));
      void load(user.id);
    }
  }

  async function addSampleTrip() {
    if (!user) return;
    const { error } = await supabase.from("trips").insert({
      user_id: user.id,
      title: "Nile Heritage Journey",
      destination: "Luxor & Aswan",
      start_date: new Date(Date.now() + 6 * 864e5).toISOString().slice(0, 10),
      end_date: new Date(Date.now() + 11 * 864e5).toISOString().slice(0, 10),
      status: "in_progress",
      live_stage: "Guide assigned",
      progress: 40,
      travellers: 2,
      price_usd: 1480,
      points_earned: 740,
    });
    if (error) toast.error(error.message);
    else toast.success(t("Booking added to your dashboard"));
  }

  async function saveReview(tripId: string, rating: number, comment: string) {
    if (!user) return;
    const { error } = await supabase
      .from("trip_reviews")
      .upsert({ trip_id: tripId, user_id: user.id, rating, comment }, { onConflict: "trip_id,user_id" });
    if (error) toast.error(error.message);
    else {
      toast.success(t("Thank you for your review"));
      void load(user.id);
    }
  }

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-background">
        <Loader2 className="size-6 animate-spin text-gold" />
      </div>
    );
  }

  const name = profile?.full_name || user.email?.split("@")[0] || t("Traveller");

  return (
    <div className="min-h-screen bg-background">
      <TopUtilityBar />
      <SiteHeader />

      <Container className="py-8 lg:py-12">
        {/* Identity header */}
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-gold-line/50 bg-gold-soft p-5 lg:p-6">
          <div className="grid size-16 place-items-center rounded-full bg-gold text-xl font-bold text-primary-foreground">
            {name.slice(0, 1).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.24em] text-gold/80">{t("My profile")}</p>
            <h1 className="truncate font-display text-2xl text-foreground lg:text-3xl">{name}</h1>
            <p className="truncate text-sm text-muted-foreground" dir="ltr">
              {profile?.email || user.email}
            </p>
          </div>
          <div className="ms-auto flex flex-wrap items-center gap-2">
            <a
              href={mailto("Egypt One — emergency assistance during my trip")}
              className="flex items-center gap-2 rounded-full bg-hot px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-hot/20"
            >
              <LifeBuoy className="size-4" />
              {t("Emergency help")}
            </a>
            <button
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <LogOut className="size-4" />
              {t("Sign out")}
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard icon={Gem} label={t("Egypt One Pass points")} value={String(profile?.points ?? 0)} hint={t("1 point = 1 EGP of partner value")} />
          <StatCard icon={BadgeCheck} label={t("Membership tier")} value={t(profile?.tier ?? "Explorer")} hint={t("Unlock Gold at 5,000 points")} />
          <StatCard icon={Radio} label={t("Active bookings")} value={String(live.length)} hint={t("Live status updates in real time")} />
          <StatCard icon={Ticket} label={t("Completed journeys")} value={String(past.length)} hint={t("Rate them to earn bonus points")} />
        </div>

        {/* Tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {([
            ["live", t("Current trips")],
            ["past", t("Past trips")],
            ["settings", t("Account & settings")],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors",
                tab === key
                  ? "border-gold-line bg-gold-soft text-gold"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {label}
            </button>
          ))}
          <button
            onClick={addSampleTrip}
            className="ms-auto flex items-center gap-2 rounded-full border border-gold-line px-4 py-2 text-sm text-gold"
          >
            <Plus className="size-4" />
            {t("Add a booking")}
          </button>
        </div>

        <div className="mt-6 grid gap-5">
          {tab === "live" &&
            (live.length ? (
              live.map((trip) => <LiveTripCard key={trip.id} trip={trip} />)
            ) : (
              <EmptyState text={t("No active bookings yet. Start planning your Egyptian journey.")} />
            ))}

          {tab === "past" &&
            (past.length ? (
              past.map((trip) => (
                <PastTripCard
                  key={trip.id}
                  trip={trip}
                  review={reviews.find((r) => r.trip_id === trip.id)}
                  onSave={saveReview}
                />
              ))
            ) : (
              <EmptyState text={t("Your completed journeys will appear here.")} />
            ))}

          {tab === "settings" && (
            <SettingsPanel profile={profile} saving={saving} onSave={saveProfile} email={user.email ?? ""} />
          )}
        </div>
      </Container>

      <SiteFooter />
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: typeof Gem;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-5">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        <Icon className="size-4 text-gold" />
        {label}
      </div>
      <p className="mt-3 font-display text-3xl text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
      {text}
    </div>
  );
}

function LiveTripCard({ trip }: { trip: Trip }) {
  const { t } = useI18n();
  const stageIndex = Math.max(0, LIVE_STAGES.indexOf(trip.live_stage ?? ""));
  return (
    <article className="rounded-2xl border border-border bg-card/60 p-5 lg:p-6">
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.2em] text-gold/80">{trip.reference}</p>
          <h3 className="font-display text-xl text-foreground">{t(trip.title)}</h3>
          <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {t(trip.destination)}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5" /> {trip.start_date} → {trip.end_date}
            </span>
          </p>
        </div>
        <span className="ms-auto flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1.5 text-xs font-semibold text-success">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {t(trip.live_stage ?? "Booking confirmed")}
        </span>
      </div>

      <div className="mt-5">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
          <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${trip.progress}%` }} />
        </div>
        <ol className="mt-3 grid gap-2 text-xs sm:grid-cols-5">
          {LIVE_STAGES.map((stage, i) => (
            <li
              key={stage}
              className={cn(
                "rounded-lg border px-2.5 py-2 text-center",
                i <= stageIndex ? "border-gold-line bg-gold-soft text-gold" : "border-border text-muted-foreground",
              )}
            >
              {t(stage)}
            </li>
          ))}
        </ol>
      </div>
    </article>
  );
}

function PastTripCard({
  trip,
  review,
  onSave,
}: {
  trip: Trip;
  review?: Review | undefined;
  onSave: (tripId: string, rating: number, comment: string) => void;
}) {
  const { t } = useI18n();
  const [rating, setRating] = useState(review?.rating ?? 5);
  const [comment, setComment] = useState(review?.comment ?? "");

  return (
    <article className="grid gap-5 rounded-2xl border border-border bg-card/60 p-5 lg:grid-cols-[1fr_320px] lg:p-6">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] text-gold/80">{trip.reference}</p>
        <h3 className="font-display text-xl text-foreground">{t(trip.title)}</h3>
        <p className="mt-1 text-xs text-muted-foreground">
          {t(trip.destination)} · {trip.start_date} → {trip.end_date}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {t("Points earned")}: <span className="text-gold">{trip.points_earned}</span>
        </p>
      </div>

      <div className="rounded-xl border border-gold-line/40 bg-gold-soft p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold/80">{t("Rate this trip")}</p>
        <div className="mt-2 flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} onClick={() => setRating(n)} aria-label={`${n}`}>
              <Star className={cn("size-5", n <= rating ? "fill-gold text-gold" : "text-muted-foreground")} />
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder={t("Tell other travellers about your experience")}
          className="mt-3 w-full rounded-lg border border-border bg-background/60 p-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-gold-line"
        />
        <button
          onClick={() => onSave(trip.id, rating, comment)}
          className="mt-3 w-full rounded-lg bg-gold py-2 text-sm font-semibold text-primary-foreground"
        >
          {t(review ? "Update review" : "Submit review")}
        </button>
      </div>
    </article>
  );
}

function SettingsPanel({
  profile,
  saving,
  email,
  onSave,
}: {
  profile: Profile | null;
  saving: boolean;
  email: string;
  onSave: (patch: Partial<Profile>) => void;
}) {
  const { t } = useI18n();
  const [form, setForm] = useState({
    full_name: profile?.full_name ?? "",
    whatsapp: profile?.whatsapp ?? "",
    country: profile?.country ?? "",
    emergency_contact: profile?.emergency_contact ?? "",
  });

  useEffect(() => {
    setForm({
      full_name: profile?.full_name ?? "",
      whatsapp: profile?.whatsapp ?? "",
      country: profile?.country ?? "",
      emergency_contact: profile?.emergency_contact ?? "",
    });
  }, [profile]);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_340px]">
      <div className="rounded-2xl border border-border bg-card/60 p-5 lg:p-6">
        <h3 className="flex items-center gap-2 font-display text-lg text-foreground">
          <Settings className="size-4 text-gold" />
          {t("Account details")}
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Labelled label={t("Full name")}>
            <input
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className={INPUT}
            />
          </Labelled>
          <Labelled label={t("Email address")}>
            <input value={email} disabled dir="ltr" className={cn(INPUT, "opacity-60")} />
          </Labelled>
          <Labelled label={t("WhatsApp number")}>
            <input
              value={form.whatsapp}
              dir="ltr"
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className={INPUT}
            />
          </Labelled>
          <Labelled label={t("Country")}>
            <input
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              className={INPUT}
            />
          </Labelled>
          <Labelled label={t("Emergency contact")}>
            <input
              value={form.emergency_contact}
              dir="ltr"
              onChange={(e) => setForm({ ...form, emergency_contact: e.target.value })}
              className={INPUT}
            />
          </Labelled>
        </div>
        <button
          onClick={() => onSave(form)}
          disabled={saving}
          className="mt-6 flex items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {saving && <Loader2 className="size-4 animate-spin" />}
          {t("Save changes")}
        </button>
      </div>

      <aside className="rounded-2xl border border-gold-line/50 bg-gold-soft p-5">
        <p className="font-display text-lg text-gold">{t("Egypt One Pass")}</p>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          {t("One digital pass for attractions, rewards and partner benefits.")}
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
          {["Priority museum entry", "Member-only hotel rates", "Free airport meet & assist", "Points on every booking"].map(
            (b) => (
              <li key={b} className="flex items-start gap-2">
                <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold" />
                {t(b)}
              </li>
            ),
          )}
        </ul>
        <a
          href={mailto("Egypt One — 24/7 traveller support")}
          className="mt-5 flex items-center justify-center gap-2 rounded-lg border border-gold-line py-2 text-sm text-gold"
        >
          <Phone className="size-4" />
          {t("24/7 Support")}
        </a>
        <Link to="/contact" className="mt-2 block text-center text-xs text-muted-foreground underline">
          {t("Contact")}
        </Link>
      </aside>
    </div>
  );
}

function Labelled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1.5">
      <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
