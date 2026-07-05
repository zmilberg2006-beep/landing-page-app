import { supabase, LandingData } from '@/lib/supabase'
import LandingPageView from '@/components/LandingPageView'
import CakePortalScroll from '@/components/CakePortalScroll'

export const revalidate = 60

const DEFAULTS: LandingData = {
  id: 'default',
  business_name: 'lalag and more',
  owner_name: 'זהבה מילברג',
  location: 'קריות',
  phone: '050-676-2220',
  whatsapp: '972506762220',
  instagram: 'lalag.and.more',
  headline: 'חולמת לאפות.',
  subheadline: 'אנחנו הופכות את החלום לחוויה.',
  hero_desc: 'סדנאות אפייה מקצועיות בהנחיית קונדיטורית מוסמכת — לילדות, לקבוצות ולארגונים. חוויה שמפתחת יצירתיות, ביטחון ואהבה אמיתית למטבח.',
  about_bio: 'קונדיטורית מוסמכת עם ניסיון עשיר בעבודה עם ילדות, נערות וקבוצות. גיליתי שאפייה היא הרבה יותר מבישול — היא מרחב שבו ילדה מגלה את הכוחות שלה ויוצאת גאה.',
  section1_title: 'חוגים שבועיים',
  section1_desc: 'חוגים קבועים לגילאי 6–14, מתקיימים אצלנו בקריות. בכל שיעור טכניקה חדשה, אתגר חדש, ויצירה שלוקחים הביתה. קבוצות קטנות עם יחס אישי לכל ילדה.',
  section1_badge: '🔥 כמעט מלא',
  section1_tags: 'גילאי 6–14,שבועי',
  section2_title: 'סדנאות פרטיות',
  section2_desc: 'סדנאות גמישות לזוגות, קבוצות ואירועים פרטיים — אצלנו או אצלכם. אנחנו מביאות את כל הציוד, החומרים והניסיון.',
  section2_tags: 'קבוצות,יום הולדת',
  section3_title: 'סדנאות לארגונים',
  section3_desc: 'סדנאות מקצועיות לקבוצות גדולות — פעילות חינוכית, מהנה ובלתי נשכחת שמחברת אנשים.',
  section3_tags: 'גיבוש,40+ אנשים',
  section4_badge: '⭐ חופש הגדול',
  section4_tags: 'גילאי 10–16,5 מפגשים',
  testimonials: null,
  faq_items: null,
  updated_at: new Date().toISOString(),
}

export default async function LandingPage({
  searchParams,
}: {
  searchParams: { mode?: string }
}) {
  const editMode = searchParams.mode === 'edit'

  let pageData: LandingData = DEFAULTS
  try {
    const { data } = await supabase
      .from('landing_page_settings')
      .select('*')
      .limit(1)
      .single()
    if (data) pageData = { ...DEFAULTS, ...data }
  } catch { /* Supabase unreachable */ }

  return (
    <>
      <CakePortalScroll />
      <LandingPageView data={pageData} editMode={editMode} />
    </>
  )
}
