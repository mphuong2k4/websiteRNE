/*
# Create contact_submissions table (single-tenant, no auth)

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `full_name` (text, not null)
  - `birth_year` (integer, nullable)
  - `email` (text, not null)
  - `phone` (text, not null)
  - `education_level` (text, nullable)
  - `country` (text, nullable)
  - `service` (text, nullable)
  - `field` (text, nullable)
  - `budget` (text, nullable)
  - `start_time` (text, nullable)
  - `content` (text, nullable)
  - `contact_channel` (text, nullable)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `contact_submissions`.
- Allow anon + authenticated INSERT only (public form submission).
- No SELECT/UPDATE/DELETE from anon — submissions are managed by RNE staff via dashboard.

3. Notes
- This is a single-tenant public contact form. Anyone may submit; only staff can read.
- Honeypot field is handled in the frontend (not stored).
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  birth_year integer,
  email text NOT NULL,
  phone text NOT NULL,
  education_level text,
  country text,
  service text,
  field text,
  budget text,
  start_time text,
  content text,
  contact_channel text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_contact_submissions" ON contact_submissions;
CREATE POLICY "anon_insert_contact_submissions"
ON contact_submissions FOR INSERT
TO anon, authenticated WITH CHECK (true);
