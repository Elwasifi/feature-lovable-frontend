ALTER TABLE public.governorates
  ADD COLUMN IF NOT EXISTS flag_image_url text,
  ADD COLUMN IF NOT EXISTS history text,
  ADD COLUMN IF NOT EXISTS famous_food text[],
  ADD COLUMN IF NOT EXISTS famous_clothing text[];

CREATE TABLE public.governorate_areas (
  id text PRIMARY KEY,
  slug text NOT NULL UNIQUE,
  governorate_slug text NOT NULL REFERENCES public.governorates(slug),
  name text NOT NULL,
  name_ar text,
  type text NOT NULL DEFAULT 'markaz',
  summary text,
  description text,
  images text[],
  source_status text,
  data_class text,
  governance_status text NOT NULL DEFAULT 'published',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
CREATE INDEX governorate_areas_gov_idx ON public.governorate_areas(governorate_slug);

GRANT SELECT ON public.governorate_areas TO anon, authenticated;
GRANT ALL ON public.governorate_areas TO service_role;
ALTER TABLE public.governorate_areas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read governorate areas" ON public.governorate_areas FOR SELECT TO anon, authenticated USING (true);