-- ============ role vocabulary ============
DO $$
DECLARE c text;
BEGIN
  SELECT conname INTO c FROM pg_constraint
   WHERE conrelid = 'public.user_roles'::regclass AND contype = 'c'
     AND pg_get_constraintdef(oid) ILIKE '%role%' LIMIT 1;
  IF c IS NOT NULL THEN EXECUTE format('ALTER TABLE public.user_roles DROP CONSTRAINT %I', c); END IF;
END $$;

ALTER TABLE public.user_roles
  ADD CONSTRAINT user_roles_role_check
  CHECK (role IN ('admin', 'crm_properties', 'crm_investment'));

-- ============ crm_pipeline ============
CREATE TABLE public.crm_pipeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type text NOT NULL CHECK (item_type IN ('property', 'investment_opportunity')),
  item_id text NOT NULL,
  stage text NOT NULL DEFAULT 'new' CHECK (stage IN ('new','contacted','negotiating','closed','lost')),
  assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  priority text NOT NULL DEFAULT 'medium' CHECK (priority IN ('low','medium','high')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (item_type, item_id)
);

GRANT SELECT, INSERT, UPDATE ON public.crm_pipeline TO authenticated;
GRANT ALL ON public.crm_pipeline TO service_role;
ALTER TABLE public.crm_pipeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CRM staff read pipeline" ON public.crm_pipeline FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR (item_type = 'property' AND public.has_role(auth.uid(), 'crm_properties'))
  OR (item_type = 'investment_opportunity' AND public.has_role(auth.uid(), 'crm_investment'))
);
CREATE POLICY "CRM staff insert pipeline" ON public.crm_pipeline FOR INSERT TO authenticated
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  OR (item_type = 'property' AND public.has_role(auth.uid(), 'crm_properties'))
  OR (item_type = 'investment_opportunity' AND public.has_role(auth.uid(), 'crm_investment'))
);
CREATE POLICY "CRM staff update pipeline" ON public.crm_pipeline FOR UPDATE TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR (item_type = 'property' AND public.has_role(auth.uid(), 'crm_properties'))
  OR (item_type = 'investment_opportunity' AND public.has_role(auth.uid(), 'crm_investment'))
)
WITH CHECK (
  public.has_role(auth.uid(), 'admin')
  OR (item_type = 'property' AND public.has_role(auth.uid(), 'crm_properties'))
  OR (item_type = 'investment_opportunity' AND public.has_role(auth.uid(), 'crm_investment'))
);

CREATE TRIGGER crm_pipeline_touch BEFORE UPDATE ON public.crm_pipeline
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============ crm_activity_log (append-only) ============
CREATE TABLE public.crm_activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_type text NOT NULL CHECK (item_type IN ('property', 'investment_opportunity')),
  item_id text NOT NULL,
  note text NOT NULL,
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.crm_activity_log TO authenticated;
GRANT ALL ON public.crm_activity_log TO service_role;
ALTER TABLE public.crm_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "CRM staff read activity" ON public.crm_activity_log FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR (item_type = 'property' AND public.has_role(auth.uid(), 'crm_properties'))
  OR (item_type = 'investment_opportunity' AND public.has_role(auth.uid(), 'crm_investment'))
);
CREATE POLICY "CRM staff append activity" ON public.crm_activity_log FOR INSERT TO authenticated
WITH CHECK (
  created_by = auth.uid()
  AND (
    public.has_role(auth.uid(), 'admin')
    OR (item_type = 'property' AND public.has_role(auth.uid(), 'crm_properties'))
    OR (item_type = 'investment_opportunity' AND public.has_role(auth.uid(), 'crm_investment'))
  )
);

CREATE INDEX crm_activity_log_item_idx ON public.crm_activity_log (item_type, item_id, created_at DESC);

-- ============ partners ============
CREATE TABLE public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  org_name text NOT NULL,
  partner_type text NOT NULL CHECK (partner_type IN ('real_estate','investment','government')),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  contact_email text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read partners" ON public.partners FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR user_id = auth.uid());

CREATE TRIGGER partners_touch BEFORE UPDATE ON public.partners
FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- ============ partner_assignments ============
CREATE TABLE public.partner_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id uuid NOT NULL REFERENCES public.partners(id) ON DELETE CASCADE,
  item_type text NOT NULL CHECK (item_type IN ('property','investment_opportunity')),
  item_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (partner_id, item_type, item_id)
);

GRANT SELECT ON public.partner_assignments TO authenticated;
GRANT ALL ON public.partner_assignments TO service_role;
ALTER TABLE public.partner_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins and owning partner read assignments" ON public.partner_assignments FOR SELECT TO authenticated
USING (
  public.has_role(auth.uid(), 'admin')
  OR EXISTS (
    SELECT 1 FROM public.partners p
     WHERE p.id = partner_assignments.partner_id AND p.user_id = auth.uid() AND p.active
  )
);

-- ============ moderation_state on public content ============
ALTER TABLE public.properties
  ADD COLUMN moderation_state text NOT NULL DEFAULT 'PUBLISHED'
  CHECK (moderation_state IN ('IN_REVIEW','PUBLISHED'));
ALTER TABLE public.investment_opportunities
  ADD COLUMN moderation_state text NOT NULL DEFAULT 'PUBLISHED'
  CHECK (moderation_state IN ('IN_REVIEW','PUBLISHED'));

UPDATE public.properties SET moderation_state = 'PUBLISHED';
UPDATE public.investment_opportunities SET moderation_state = 'PUBLISHED';

ALTER TABLE public.properties ADD COLUMN last_submitted_at timestamptz;
ALTER TABLE public.investment_opportunities ADD COLUMN last_submitted_at timestamptz;

-- public visibility: only published rows, defence in depth alongside query filters
DROP POLICY "Public read access to properties" ON public.properties;
CREATE POLICY "Public read published properties" ON public.properties FOR SELECT
USING (moderation_state = 'PUBLISHED');

DROP POLICY "Public read access to investment_opportunities" ON public.investment_opportunities;
CREATE POLICY "Public read published investment_opportunities" ON public.investment_opportunities FOR SELECT
USING (moderation_state = 'PUBLISHED');