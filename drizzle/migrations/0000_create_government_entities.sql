CREATE TABLE public.government_entities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_en text NOT NULL,
  category_ar text NOT NULL,
  entity_name_en text NOT NULL,
  entity_name_ar text,
  description_en text,
  official_url text,
  verification_status text NOT NULL DEFAULT 'Needs check',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.government_entities TO anon;
GRANT SELECT ON public.government_entities TO authenticated;
GRANT ALL ON public.government_entities TO service_role;

ALTER TABLE public.government_entities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Government entities are public" ON public.government_entities
  FOR SELECT TO anon, authenticated USING (true);

CREATE TRIGGER government_entities_touch
  BEFORE UPDATE ON public.government_entities
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX government_entities_category_idx ON public.government_entities (category_en, sort_order);