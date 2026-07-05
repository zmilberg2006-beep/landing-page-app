-- =============================================
-- lalag & more — Supabase Full Setup
-- הרץ את זה ב-SQL Editor של Supabase
-- בטוח לריצה חוזרת (IF NOT EXISTS בכל מקום)
-- =============================================

-- 1. צור טבלה אם לא קיימת
CREATE TABLE IF NOT EXISTS landing_page_settings (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_name TEXT NOT NULL DEFAULT '',
  headline      TEXT NOT NULL DEFAULT '',
  subheadline   TEXT NOT NULL DEFAULT '',
  offer_text    TEXT NOT NULL DEFAULT '',
  button_text   TEXT NOT NULL DEFAULT '',
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. הוסף עמודות חדשות (בטוח אם כבר קיימות)
ALTER TABLE landing_page_settings
  ADD COLUMN IF NOT EXISTS owner_name       TEXT NOT NULL DEFAULT 'זהבה מילברג',
  ADD COLUMN IF NOT EXISTS location         TEXT NOT NULL DEFAULT 'קריות',
  ADD COLUMN IF NOT EXISTS phone            TEXT NOT NULL DEFAULT '050-676-2220',
  ADD COLUMN IF NOT EXISTS whatsapp         TEXT NOT NULL DEFAULT '972506762220',
  ADD COLUMN IF NOT EXISTS instagram        TEXT NOT NULL DEFAULT 'lalag.and.more',
  ADD COLUMN IF NOT EXISTS hero_desc        TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS about_bio        TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS about_sub        TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS about_tagline    TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS services_heading TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section1_title   TEXT NOT NULL DEFAULT 'חוגים שבועיים',
  ADD COLUMN IF NOT EXISTS section1_desc    TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS section2_title   TEXT NOT NULL DEFAULT 'סדנאות פרטיות',
  ADD COLUMN IF NOT EXISTS section2_desc    TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS section3_title   TEXT NOT NULL DEFAULT 'סדנאות לארגונים',
  ADD COLUMN IF NOT EXISTS section3_desc    TEXT NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS gallery_heading  TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS gallery_sub      TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS how1_title       TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS how1_desc        TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS how2_title       TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS how2_desc        TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS how3_title       TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS how3_desc        TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS how4_title       TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS how4_desc        TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS cta_heading      TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS cta_sub          TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS footer_desc      TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS testimonials     JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS faq_items        JSONB DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section4_title   TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section4_desc    TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS wa_msg_1         TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS wa_msg_2         TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS wa_msg_3         TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS wa_msg_4         TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section1_badge   TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section1_tags    TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section2_badge   TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section2_tags    TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section3_badge   TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section3_tags    TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section4_badge   TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS section4_tags    TEXT DEFAULT NULL;

-- 3. מחק שורות ישנות והכנס שורה חדשה נקייה
DELETE FROM landing_page_settings;

INSERT INTO landing_page_settings (
  business_name, headline, subheadline,
  owner_name, location, phone, whatsapp, instagram,
  hero_desc, about_bio,
  section1_title, section1_desc,
  section2_title, section2_desc,
  section3_title, section3_desc
) VALUES (
  'lalag and more',
  'חולמת לאפות.',
  'אנחנו הופכות את החלום לחוויה.',
  'זהבה מילברג',
  'קריות',
  '050-676-2220',
  '972506762220',
  'lalag.and.more',
  'סדנאות אפייה מקצועיות בהנחיית קונדיטורית מוסמכת — לילדות, לקבוצות ולארגונים. חוויה שמפתחת יצירתיות, ביטחון ואהבה אמיתית למטבח.',
  'קונדיטורית מוסמכת עם ניסיון עשיר בעבודה עם ילדות, נערות וקבוצות. גיליתי שאפייה היא הרבה יותר מבישול — היא מרחב שבו ילדה מגלה את הכוחות שלה ויוצאת גאה.',
  'חוגים שבועיים',
  'חוגים קבועים לגילאי 6–14, מתקיימים אצלנו בקריות. בכל שיעור טכניקה חדשה, אתגר חדש, ויצירה שלוקחים הביתה. קבוצות קטנות עם יחס אישי לכל ילדה.',
  'סדנאות פרטיות',
  'סדנאות גמישות לזוגות, קבוצות ואירועים פרטיים — אצלנו או אצלכם. אנחנו מביאות את כל הציוד, החומרים והניסיון.',
  'סדנאות לארגונים',
  'סדנאות מקצועיות לקבוצות גדולות — פעילות חינוכית, מהנה ובלתי נשכחת שמחברת אנשים.'
);

-- 4. הרשאות RLS
ALTER TABLE landing_page_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public can read" ON landing_page_settings;
DROP POLICY IF EXISTS "public can update" ON landing_page_settings;
DROP POLICY IF EXISTS "public can insert" ON landing_page_settings;
DROP POLICY IF EXISTS "public can delete" ON landing_page_settings;

CREATE POLICY "public can read"   ON landing_page_settings FOR SELECT USING (true);
CREATE POLICY "public can update" ON landing_page_settings FOR UPDATE USING (true);
CREATE POLICY "public can insert" ON landing_page_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "public can delete" ON landing_page_settings FOR DELETE USING (true);

-- בדיקה — צריך לראות שורה אחת
SELECT id, owner_name, location, headline, section1_title FROM landing_page_settings;
