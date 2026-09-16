CREATE TABLE public.content_translations (
  table_name text NOT NULL,
  row_id text NOT NULL,
  lang text NOT NULL,
  fields jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY (table_name, row_id, lang)
);

GRANT SELECT ON public.content_translations TO anon;
GRANT SELECT ON public.content_translations TO authenticated;
GRANT ALL ON public.content_translations TO service_role;

ALTER TABLE public.content_translations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Translations are publicly readable"
ON public.content_translations FOR SELECT
TO anon, authenticated
USING (true);

CREATE TRIGGER content_translations_touch
BEFORE UPDATE ON public.content_translations
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX content_translations_lookup_idx
ON public.content_translations (table_name, lang);