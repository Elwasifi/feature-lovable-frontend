-- 1) Adapt existing (empty) trips table to Trip Builder MVP shape
ALTER TABLE public.trips ADD COLUMN IF NOT EXISTS cover_image text;
ALTER TABLE public.trips ALTER COLUMN destination SET DEFAULT '';
ALTER TABLE public.trips ALTER COLUMN status SET DEFAULT 'draft';
ALTER TABLE public.trips ADD CONSTRAINT trips_status_check CHECK (status IN ('draft','planned','completed'));

-- 2) trip_days
CREATE TABLE public.trip_days (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  day_number int NOT NULL,
  date date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trip_days TO authenticated;
GRANT ALL ON public.trip_days TO service_role;
ALTER TABLE public.trip_days ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage trip days of their own trips" ON public.trip_days
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_days.trip_id AND t.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_days.trip_id AND t.user_id = auth.uid()));
CREATE INDEX trip_days_trip_id_idx ON public.trip_days(trip_id);
CREATE TRIGGER trip_days_touch BEFORE UPDATE ON public.trip_days FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- 3) trip_items
CREATE TABLE public.trip_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  trip_id uuid NOT NULL REFERENCES public.trips(id) ON DELETE CASCADE,
  trip_day_id uuid REFERENCES public.trip_days(id) ON DELETE SET NULL,
  item_type text NOT NULL CHECK (item_type IN ('property','offer','event','heritage_site','museum','investment_opportunity')),
  item_id uuid NOT NULL,
  position int NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);
COMMENT ON COLUMN public.trip_items.item_id IS 'Polymorphic reference: points at the primary key of a row in the table named by item_type (property -> properties, offer -> offers, event -> events, heritage_site -> heritage_sites, museum -> museums, investment_opportunity -> investment_opportunities). Intentionally has no foreign key constraint; referential integrity must be enforced in application code.';
GRANT SELECT, INSERT, UPDATE, DELETE ON public.trip_items TO authenticated;
GRANT ALL ON public.trip_items TO service_role;
ALTER TABLE public.trip_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage trip items of their own trips" ON public.trip_items
  FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_items.trip_id AND t.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.trips t WHERE t.id = trip_items.trip_id AND t.user_id = auth.uid()));
CREATE INDEX trip_items_trip_id_idx ON public.trip_items(trip_id);
CREATE INDEX trip_items_trip_day_id_idx ON public.trip_items(trip_day_id);

-- 4) bookings
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  trip_id uuid REFERENCES public.trips(id) ON DELETE SET NULL,
  trip_item_id uuid REFERENCES public.trip_items(id) ON DELETE SET NULL,
  item_type text NOT NULL,
  item_id uuid NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','confirmed','cancelled')),
  contact_name text,
  contact_phone text,
  contact_email text,
  requested_at timestamptz NOT NULL DEFAULT now()
);
COMMENT ON COLUMN public.bookings.item_id IS 'Polymorphic reference like trip_items.item_id; no foreign key constraint.';
GRANT SELECT, INSERT, UPDATE, DELETE ON public.bookings TO authenticated;
GRANT ALL ON public.bookings TO service_role;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own bookings" ON public.bookings
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
CREATE INDEX bookings_user_id_idx ON public.bookings(user_id);
CREATE INDEX bookings_trip_id_idx ON public.bookings(trip_id);