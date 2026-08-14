/*
  Restrict all CMS mutations to users explicitly listed in admin_users.
  Creating an Auth user alone does not grant CMS access.
*/
CREATE TABLE IF NOT EXISTS public.admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

DROP POLICY IF EXISTS authenticated_read_articles ON public.cms_articles;
DROP POLICY IF EXISTS authenticated_create_articles ON public.cms_articles;
DROP POLICY IF EXISTS authenticated_update_articles ON public.cms_articles;
DROP POLICY IF EXISTS authenticated_delete_articles ON public.cms_articles;

CREATE POLICY admin_read_articles ON public.cms_articles
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY admin_create_articles ON public.cms_articles
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY admin_update_articles ON public.cms_articles
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY admin_delete_articles ON public.cms_articles
  FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS authenticated_read_settings ON public.site_settings;
DROP POLICY IF EXISTS authenticated_create_settings ON public.site_settings;
DROP POLICY IF EXISTS authenticated_update_settings ON public.site_settings;

CREATE POLICY admin_read_settings ON public.site_settings
  FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY admin_create_settings ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (id = 'main' AND public.is_admin());
CREATE POLICY admin_update_settings ON public.site_settings
  FOR UPDATE TO authenticated USING (id = 'main' AND public.is_admin()) WITH CHECK (id = 'main' AND public.is_admin());

DROP POLICY IF EXISTS authenticated_upload_site_assets ON storage.objects;
DROP POLICY IF EXISTS authenticated_update_site_assets ON storage.objects;
DROP POLICY IF EXISTS authenticated_delete_site_assets ON storage.objects;

CREATE POLICY admin_upload_site_assets ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-assets' AND public.is_admin());
CREATE POLICY admin_update_site_assets ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'site-assets' AND public.is_admin()) WITH CHECK (bucket_id = 'site-assets' AND public.is_admin());
CREATE POLICY admin_delete_site_assets ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'site-assets' AND public.is_admin());

CREATE POLICY admins_can_read_admin_users ON public.admin_users
  FOR SELECT TO authenticated USING (public.is_admin());
