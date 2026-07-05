import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type Testimonial = {
  id: string
  avatar: string
  name: string
  msg1: string
  time1: string
  msg2: string
  time2: string
}

export type FaqItem = {
  id: string
  q: string
  a: string
}

export type LandingData = {
  id: string
  business_name: string
  owner_name: string
  location: string
  phone: string
  whatsapp: string
  instagram: string
  headline: string
  subheadline: string
  hero_desc: string
  /* About */
  about_bio: string
  about_sub?: string
  about_tagline?: string
  /* Services */
  services_heading?: string
  section1_title: string
  section1_desc: string
  section2_title: string
  section2_desc: string
  section3_title: string
  section3_desc: string
  /* Service badges (urgency) + tags (comma-separated chips) */
  section1_badge?: string  /* e.g. "🔥 כמעט מלא" — empty = no badge */
  section1_tags?: string   /* e.g. "גילאי 6–14,שבועי" */
  section2_badge?: string
  section2_tags?: string
  section3_badge?: string
  section3_tags?: string
  section4_badge?: string
  section4_tags?: string
  /* WhatsApp pre-filled messages per service */
  wa_msg_1?: string
  wa_msg_2?: string
  wa_msg_3?: string
  /* Gallery */
  gallery_heading?: string
  gallery_sub?: string
  /* How it works */
  how1_title?: string; how1_desc?: string
  how2_title?: string; how2_desc?: string
  how3_title?: string; how3_desc?: string
  how4_title?: string; how4_desc?: string
  /* CTA */
  cta_heading?: string
  cta_sub?: string
  /* Footer */
  footer_desc?: string
  testimonials: Testimonial[] | null
  faq_items: FaqItem[] | null
  updated_at: string
}
