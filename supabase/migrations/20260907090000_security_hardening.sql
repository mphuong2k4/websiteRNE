/*
  Security hardening:
  - route public contact submissions through a validated, rate-limited RPC
  - prevent direct anonymous table inserts
  - reject active image formats and cap public uploads
  - bound CMS payload sizes and harden SECURITY DEFINER search paths
*/

UPDATE public.contact_submissions SET created_at = now() WHERE created_at IS NULL;
ALTER TABLE public.contact_submissions ALTER COLUMN created_at SET NOT NULL;

ALTER TABLE public.contact_submissions
  ADD CONSTRAINT contact_full_name_length CHECK (char_length(btrim(full_name)) BETWEEN 2 AND 120) NOT VALID,
  ADD CONSTRAINT contact_email_length CHECK (char_length(btrim(email)) BETWEEN 3 AND 254) NOT VALID,
  ADD CONSTRAINT contact_phone_length CHECK (char_length(btrim(phone)) BETWEEN 6 AND 32) NOT VALID,
  ADD CONSTRAINT contact_birth_year_range CHECK (birth_year IS NULL OR birth_year BETWEEN 1900 AND 2100) NOT VALID,
  ADD CONSTRAINT contact_optional_lengths CHECK (
    char_length(coalesce(education_level, '')) <= 120 AND
    char_length(coalesce(country, '')) <= 80 AND
    char_length(coalesce(service, '')) <= 120 AND
    char_length(coalesce(field, '')) <= 200 AND
    char_length(coalesce(budget, '')) <= 80 AND
    char_length(coalesce(start_time, '')) <= 80 AND
    char_length(coalesce(content, '')) <= 3000 AND
    char_length(coalesce(contact_channel, '')) <= 80
  ) NOT VALID;

ALTER TABLE public.cms_articles
  ADD CONSTRAINT cms_article_slug_format CHECK (
    char_length(slug) BETWEEN 1 AND 160 AND slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'
  ) NOT VALID,
  ADD CONSTRAINT cms_article_document_size CHECK (octet_length(document::text) <= 1048576) NOT VALID;

ALTER TABLE public.site_settings
  ADD CONSTRAINT site_settings_size CHECK (octet_length(settings::text) <= 2097152) NOT VALID;

CREATE INDEX IF NOT EXISTS contact_submissions_email_created_idx
  ON public.contact_submissions (lower(email), created_at DESC);
CREATE INDEX IF NOT EXISTS contact_submissions_phone_created_idx
  ON public.contact_submissions (phone, created_at DESC);

DROP POLICY IF EXISTS anon_insert_contact_submissions ON public.contact_submissions;
REVOKE INSERT ON public.contact_submissions FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = pg_catalog
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION public.submit_contact(
  p_full_name text,
  p_email text,
  p_phone text,
  p_birth_year integer DEFAULT NULL,
  p_education_level text DEFAULT NULL,
  p_country text DEFAULT NULL,
  p_service text DEFAULT NULL,
  p_field text DEFAULT NULL,
  p_budget text DEFAULT NULL,
  p_start_time text DEFAULT NULL,
  p_content text DEFAULT NULL,
  p_contact_channel text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_id uuid;
  v_email text := lower(btrim(p_email));
  v_phone text := btrim(p_phone);
BEGIN
  IF char_length(btrim(p_full_name)) NOT BETWEEN 2 AND 120
    OR char_length(v_email) NOT BETWEEN 3 AND 254
    OR v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    OR char_length(v_phone) NOT BETWEEN 6 AND 32
    OR (p_birth_year IS NOT NULL AND p_birth_year NOT BETWEEN 1900 AND extract(year FROM current_date)::integer)
    OR char_length(coalesce(p_education_level, '')) > 120
    OR char_length(coalesce(p_country, '')) > 80
    OR char_length(coalesce(p_service, '')) > 120
    OR char_length(coalesce(p_field, '')) > 200
    OR char_length(coalesce(p_budget, '')) > 80
    OR char_length(coalesce(p_start_time, '')) > 80
    OR char_length(coalesce(p_content, '')) > 3000
    OR char_length(coalesce(p_contact_channel, '')) > 80
  THEN
    RAISE EXCEPTION 'Invalid contact submission' USING ERRCODE = '22023';
  END IF;

  IF (
    SELECT count(*) >= 3
    FROM public.contact_submissions
    WHERE created_at > now() - interval '1 hour'
      AND (lower(email) = v_email OR phone = v_phone)
  ) THEN
    RAISE EXCEPTION 'Contact submission rate limit exceeded' USING ERRCODE = 'P0001';
  END IF;

  INSERT INTO public.contact_submissions (
    full_name, birth_year, email, phone, education_level, country,
    service, field, budget, start_time, content, contact_channel
  ) VALUES (
    btrim(p_full_name), p_birth_year, v_email, v_phone,
    nullif(btrim(p_education_level), ''), nullif(btrim(p_country), ''),
    nullif(btrim(p_service), ''), nullif(btrim(p_field), ''),
    nullif(btrim(p_budget), ''), nullif(btrim(p_start_time), ''),
    nullif(btrim(p_content), ''), nullif(btrim(p_contact_channel), '')
  ) RETURNING id INTO v_id;

  RETURN v_id;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_contact(text, text, text, integer, text, text, text, text, text, text, text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_contact(text, text, text, integer, text, text, text, text, text, text, text, text) TO anon, authenticated;

UPDATE storage.buckets
SET file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp']
WHERE id = 'site-assets';