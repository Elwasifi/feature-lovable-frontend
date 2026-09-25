CREATE TABLE public.governorate_content_import (
  target_table text NOT NULL,
  target_id text NOT NULL,
  history text,
  highlights text[],
  famous_food text[],
  famous_clothing text[],
  flag_image_url text,
  images text[],
  PRIMARY KEY (target_table, target_id)
);
GRANT ALL ON public.governorate_content_import TO service_role;
ALTER TABLE public.governorate_content_import ENABLE ROW LEVEL SECURITY;
COMMENT ON TABLE public.governorate_content_import IS 'Internal staging for researched governorate content imports; not read by the app.';