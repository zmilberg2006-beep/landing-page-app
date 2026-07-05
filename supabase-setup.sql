-- Run this in the Supabase SQL Editor
-- (Project → SQL Editor → New Query → paste → Run)

-- 1. Create the table
CREATE TABLE landing_page_settings (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL DEFAULT '',
  headline    TEXT NOT NULL DEFAULT '',
  subheadline TEXT NOT NULL DEFAULT '',
  offer_text  TEXT NOT NULL DEFAULT '',
  button_text TEXT NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Seed one row with starter content
INSERT INTO landing_page_settings
  (business_name, headline, subheadline, offer_text, button_text)
VALUES (
  'My Business',
  'The fastest way to grow your audience',
  'We make it easy to build, launch, and scale — without the complexity.',
  '🚀 Join 10,000+ founders who launched with us. No credit card required.',
  'Start for Free'
);

-- 3. Allow public reads (landing page)
ALTER TABLE landing_page_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read"
  ON landing_page_settings FOR SELECT
  USING (true);

-- 4. Allow public writes (dashboard — no auth, MVP only)
--    ⚠️  Remove/replace this in production with proper auth.
CREATE POLICY "public can update"
  ON landing_page_settings FOR UPDATE
  USING (true);

CREATE POLICY "public can insert"
  ON landing_page_settings FOR INSERT
  WITH CHECK (true);
