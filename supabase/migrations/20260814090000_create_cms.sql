/*
  RNE CMS: public visitors only see published articles and site settings.
  Authenticated Supabase users can manage all CMS data.
*/
CREATE TABLE IF NOT EXISTS cms_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  document jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS cms_articles_status_updated_idx ON cms_articles (status, updated_at DESC);
ALTER TABLE cms_articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY published_articles_public ON cms_articles FOR SELECT TO anon USING (status = 'published');
CREATE POLICY authenticated_read_articles ON cms_articles FOR SELECT TO authenticated USING (true);
CREATE POLICY authenticated_create_articles ON cms_articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY authenticated_update_articles ON cms_articles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY authenticated_delete_articles ON cms_articles FOR DELETE TO authenticated USING (true);

CREATE TABLE IF NOT EXISTS site_settings (
  id text PRIMARY KEY,
  settings jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY public_site_settings ON site_settings FOR SELECT TO anon USING (id = 'main');
CREATE POLICY authenticated_read_settings ON site_settings FOR SELECT TO authenticated USING (true);
CREATE POLICY authenticated_create_settings ON site_settings FOR INSERT TO authenticated WITH CHECK (id = 'main');
CREATE POLICY authenticated_update_settings ON site_settings FOR UPDATE TO authenticated USING (id = 'main') WITH CHECK (id = 'main');
