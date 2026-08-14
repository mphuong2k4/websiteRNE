/*
  Public image bucket for visual CMS uploads.
  Only authenticated users can create, replace or delete files.
*/
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('site-assets', 'site-assets', true, 8388608, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'])
ON CONFLICT (id) DO UPDATE SET public = true, file_size_limit = 8388608;

CREATE POLICY public_read_site_assets ON storage.objects
  FOR SELECT TO public USING (bucket_id = 'site-assets');
CREATE POLICY authenticated_upload_site_assets ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'site-assets');
CREATE POLICY authenticated_update_site_assets ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'site-assets') WITH CHECK (bucket_id = 'site-assets');
CREATE POLICY authenticated_delete_site_assets ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'site-assets');
