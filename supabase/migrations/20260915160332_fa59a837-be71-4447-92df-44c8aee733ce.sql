CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  topic text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.contact_messages TO service_role;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No public access to contact messages"
ON public.contact_messages FOR SELECT
TO authenticated
USING (false);

ALTER TABLE public.trips
  ADD CONSTRAINT trips_end_after_start
  CHECK (start_date IS NULL OR end_date IS NULL OR end_date >= start_date);