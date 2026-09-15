CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL DEFAULT 'general',
  title text NOT NULL,
  body text,
  link text,
  read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX notifications_user_created_idx ON public.notifications (user_id, created_at DESC);

GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own notifications" ON public.notifications
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.notifications
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own notifications" ON public.notifications
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.notify_booking_event()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.notifications (user_id, type, title, body, link)
    VALUES (
      NEW.user_id,
      'booking_received',
      'Booking request received',
      coalesce(NEW.item_name, 'Your request') || ' — we have received your request and will be in touch.',
      '/account/bookings'
    );
    RETURN NEW;
  END IF;

  IF NEW.status IS DISTINCT FROM OLD.status THEN
    INSERT INTO public.notifications (user_id, type, title, body, link)
    VALUES (
      NEW.user_id,
      'booking_status',
      'Booking ' || NEW.status,
      coalesce(NEW.item_name, 'Your booking') || ' is now ' || NEW.status || '.',
      '/account/bookings'
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER bookings_notify_insert
AFTER INSERT ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.notify_booking_event();

CREATE TRIGGER bookings_notify_status
AFTER UPDATE OF status ON public.bookings
FOR EACH ROW EXECUTE FUNCTION public.notify_booking_event();

CREATE TABLE public.saved_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type text NOT NULL,
  item_id text NOT NULL,
  item_name text,
  item_image text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_type, item_id)
);

CREATE INDEX saved_items_user_idx ON public.saved_items (user_id, created_at DESC);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_items TO authenticated;
GRANT ALL ON public.saved_items TO service_role;

ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own saved items" ON public.saved_items
  FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);