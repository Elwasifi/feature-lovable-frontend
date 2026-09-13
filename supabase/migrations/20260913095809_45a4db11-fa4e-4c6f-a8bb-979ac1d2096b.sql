ALTER TABLE public.products ADD COLUMN IF NOT EXISTS collection text;
CREATE INDEX IF NOT EXISTS products_collection_idx ON public.products (collection);