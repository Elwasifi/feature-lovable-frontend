ALTER TABLE public.trip_items ALTER COLUMN item_id TYPE text USING item_id::text;
ALTER TABLE public.trip_items ADD COLUMN IF NOT EXISTS item_name text;
ALTER TABLE public.trip_items ADD COLUMN IF NOT EXISTS item_image text;
ALTER TABLE public.bookings ALTER COLUMN item_id TYPE text USING item_id::text;
ALTER TABLE public.bookings ADD COLUMN IF NOT EXISTS item_name text;