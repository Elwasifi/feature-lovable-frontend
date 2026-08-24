CREATE TABLE public.legal_document_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL,
  title text NOT NULL,
  version text NOT NULL,
  effective_date date NOT NULL,
  updated_date date NOT NULL,
  owner text NOT NULL,
  approval_status text NOT NULL DEFAULT 'DRAFT',
  language text NOT NULL DEFAULT 'en',
  change_note text,
  content jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (slug, version, language)
);

GRANT SELECT ON public.legal_document_versions TO anon;
GRANT SELECT ON public.legal_document_versions TO authenticated;
GRANT ALL ON public.legal_document_versions TO service_role;

ALTER TABLE public.legal_document_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Legal document versions are public"
ON public.legal_document_versions FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.user_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  consent_type text NOT NULL,
  policy_slug text,
  policy_version text,
  status text NOT NULL DEFAULT 'granted',
  granted_at timestamptz,
  withdrawn_at timestamptz,
  locale text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, consent_type)
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_consents TO authenticated;
GRANT ALL ON public.user_consents TO service_role;

ALTER TABLE public.user_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own consents"
ON public.user_consents FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can record their own consents"
ON public.user_consents FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own consents"
ON public.user_consents FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own consents"
ON public.user_consents FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_user_consents_updated_at
BEFORE UPDATE ON public.user_consents
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();