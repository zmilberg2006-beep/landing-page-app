'use client'
import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { supabase } from '@/lib/supabase'
import type { Testimonial, FaqItem } from '@/lib/supabase'

/* ─── Types ──────────────────────────────────────────────────────── */
type Device     = 'desktop' | 'tablet' | 'mobile'
type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'
type SelectedEl = { field: string; value: string } | null
type ToastMsg   = { msg: string; type: 'success' | 'error' | 'info' } | null

type FormData = {
  owner_name: string; location: string; phone: string
  whatsapp: string; instagram: string
  headline: string; subheadline: string; hero_desc: string
  about_bio: string; about_sub: string; about_tagline: string
  services_heading: string
  section1_title: string; section1_desc: string; wa_msg_1: string
  section1_badge: string; section1_tags: string
  section2_title: string; section2_desc: string; wa_msg_2: string
  section2_badge: string; section2_tags: string
  section3_title: string; section3_desc: string; wa_msg_3: string
  section3_badge: string; section3_tags: string
  section4_badge: string; section4_tags: string
  gallery_heading: string; gallery_sub: string
  how1_title: string; how1_desc: string
  how2_title: string; how2_desc: string
  how3_title: string; how3_desc: string
  how4_title: string; how4_desc: string
  cta_heading: string; cta_sub: string
  footer_desc: string
  testimonials: Testimonial[]; faq_items: FaqItem[]
}

/* ─── Device config ─────────────────────────────────────────────── */
const DEVICES = {
  desktop: { w: 1440, h: 900,  label: 'שולחן עבודה', icon: '⊞' },
  tablet:  { w: 768,  h: 1024, label: 'טאבלט',        icon: '⬜' },
  mobile:  { w: 390,  h: 844,  label: 'נייד',          icon: '▯'  },
} as const

/* ─── Layer definitions ──────────────────────────────────────────── */
const LAYERS = [
  {
    id: 'hero', label: 'קטע ראשי', icon: '✦', section: 'hero', color: '#E8415A',
    fields: [
      { field: 'hero_desc',   label: 'תיאור ה-Hero',  hint: 'הטקסט הראשי מתחת ללוגו' },
      { field: 'subheadline', label: 'סלוגן שירותים', hint: 'תת-כותרת בקטע השירותים' },
    ],
  },
  {
    id: 'about', label: 'אודות', icon: '◎', section: 'about', color: '#818CF8',
    fields: [
      { field: 'owner_name',   label: 'שם הבעלים',    hint: 'מוצג בכותרת "אודות"' },
      { field: 'about_sub',    label: 'מוטו',          hint: '"האהבה לאפייה הפכה לשליחות"' },
      { field: 'about_bio',    label: 'ביוגרפיה',      hint: 'פסקת אודות עיקרית' },
      { field: 'about_tagline',label: 'משפט סיום',     hint: 'פסקה שנייה בקטע אודות' },
    ],
  },
  {
    id: 'services', label: 'שירותים', icon: '◈', section: 'services', color: '#F59E0B',
    fields: [
      { field: 'services_heading', label: 'כותרת קטע',    hint: '"שלושה סוגי חוויות אפייה"' },
      { field: 'section1_title',   label: '🍰 חוגים שבועיים — כותרת', hint: '' },
      { field: 'section1_desc',    label: '🍰 חוגים שבועיים — תיאור',  hint: '' },
      { field: 'wa_msg_1',         label: '💬 הודעת WhatsApp — חוגים', hint: 'הטקסט שייפתח בוואטסאפ כשלוחצים' },
      { field: 'section2_title',   label: '🎂 סדנאות פרטיות — כותרת', hint: '' },
      { field: 'section2_desc',    label: '🎂 סדנאות פרטיות — תיאור',  hint: '' },
      { field: 'wa_msg_2',         label: '💬 הודעת WhatsApp — סדנה פרטית', hint: 'הטקסט שייפתח בוואטסאפ כשלוחצים' },
      { field: 'section3_title',   label: '🏢 סדנאות לארגונים — כותרת', hint: '' },
      { field: 'section3_desc',    label: '🏢 סדנאות לארגונים — תיאור',  hint: '' },
      { field: 'wa_msg_3',         label: '💬 הודעת WhatsApp — ארגונים', hint: 'הטקסט שייפתח בוואטסאפ כשלוחצים' },
    ],
  },
  {
    id: 'gallery', label: 'גלריה', icon: '▣', section: 'gallery', color: '#06B6D4',
    fields: [
      { field: 'gallery_heading', label: 'כותרת גלריה', hint: '"הצצה מאחורי הקלעים"' },
      { field: 'gallery_sub',     label: 'תת-כותרת',    hint: 'תיאור הגלריה' },
    ],
  },
  {
    id: 'how', label: 'איך זה עובד', icon: '◉', section: 'how', color: '#8B5CF6',
    fields: [
      { field: 'how1_title', label: 'שלב 1 — כותרת', hint: '' },
      { field: 'how1_desc',  label: 'שלב 1 — תיאור',  hint: '' },
      { field: 'how2_title', label: 'שלב 2 — כותרת', hint: '' },
      { field: 'how2_desc',  label: 'שלב 2 — תיאור',  hint: '' },
      { field: 'how3_title', label: 'שלב 3 — כותרת', hint: '' },
      { field: 'how3_desc',  label: 'שלב 3 — תיאור',  hint: '' },
      { field: 'how4_title', label: 'שלב 4 — כותרת', hint: '' },
      { field: 'how4_desc',  label: 'שלב 4 — תיאור',  hint: '' },
    ],
  },
  {
    id: 'cta', label: 'קריאה לפעולה', icon: '◆', section: 'cta', color: '#EC4899',
    fields: [
      { field: 'cta_heading', label: 'כותרת CTA', hint: '"המקומות האחרונים..."' },
      { field: 'cta_sub',     label: 'תת-כותרת',  hint: '"אל תחכי..."' },
    ],
  },
  {
    id: 'footer', label: 'פוטר', icon: '▬', section: 'footer', color: '#64748B',
    fields: [
      { field: 'footer_desc', label: 'תיאור עסק',  hint: 'פסקה בפוטר' },
      { field: 'phone',       label: 'טלפון',        hint: '050-000-0000' },
      { field: 'instagram',   label: 'אינסטגרם',    hint: 'שם משתמש' },
      { field: 'location',    label: 'מיקום',        hint: 'עיר/אזור' },
    ],
  },
  { id: 'testimonials', label: 'המלצות',       icon: '◑', section: 'testimonials', color: '#10B981', fields: [] },
  { id: 'faq',          label: 'שאלות נפוצות', icon: '◐', section: 'faq',          color: '#6366F1', fields: [] },
] as const

/* ─── Helpers ────────────────────────────────────────────────────── */
const uid = () => Math.random().toString(36).slice(2, 11)

const DEF_T: Testimonial[] = [
  { id: uid(), avatar: '😍', name: 'אמא של מאור', msg1: 'אחרי שנים שנמנעה מהרבה דברים טעימים בגלל גלוטן — פתאום יש לנו מתכונים מדהימים למתוקים ללא גלוטן 🙏', time1: '21:02', msg2: 'ממליצות מאוד ואוהבות מאוד. נתראה בתחילת שנת הלמידים הבאה! 💕', time2: '21:05' },
  { id: uid(), avatar: '🥹', name: 'אמא גאה, נשר', msg1: 'וואיי!! אני מתרגשת. כמה היא ניסחה בבית לבד! יופי, מקסים, כל הכבוד 💕', time1: '15:22', msg2: 'יהאהה!!! מצפה לכל יום שישי שתאכל לעשות. היא יצאה מרחפת מאושר ✨', time2: '15:26' },
  { id: uid(), avatar: '💖', name: 'אמא של ילדה בחוג', msg1: 'היא לא מפסיקה לספר כמה היא נהנית! כל הזמן אומרת לי: "תודה שלחת אותי ללמוד אצל זהבה" 💕', time1: '13:43', msg2: 'את מהממת. תודה רבה 🙏', time2: '13:45' },
  { id: uid(), avatar: '👑', name: 'אמא מהחוג, קריות', msg1: 'אמאלה, הקאפקייקס שהכינה היו טעימים להחריד! אני רשומה בקבוצה לשנה הבאה 😍', time1: '11:09', msg2: 'אין עליך מלכה 👑 תודה על הכל!', time2: '11:18' },
  { id: uid(), avatar: '🎂', name: 'בוגרת קורס', msg1: 'מלמדת נהדר ומשקיעה בשתי ידיים ברחבות ובאיכות הכי גבוהה! בעזרה השם הצלחתי בעסק 🏆', time1: '22:08', msg2: 'אני כבר מחכה לסדנה הבאה. חג שמח לכולן 🎂', time2: '22:09' },
  { id: uid(), avatar: '😊', name: 'הורה מהחוג', msg1: 'הילדים ממש נהנים! אוכל טעים ומיוחד, כל פעם מחדש מפתיע אותנו במשהו 😊', time1: '12:38', msg2: 'תודה רבה זהבה, שבוע מבורך מלא בבשורות טובות! 💕', time2: '12:41' },
  { id: uid(), avatar: '🏆', name: 'הוריה, חוג ג׳', msg1: 'תודה רבה זהבה יקרה! החיוך שלהם שווה הכל — הם נהנו כל כך 🥰', time1: '12:49', msg2: 'תודה על הכל!!!! 💕', time2: '12:50' },
  { id: uid(), avatar: '✨', name: 'תלמידה חדשה, חיפה', msg1: 'הייתי רק פגישה אחת ופשוט היה מהמם! כל כך הרבה דברים חדשים למדתי ❤️', time1: '10:05', msg2: 'אני חייבת להמשיך ולבוא שוב. היי תודה רבה!!!!', time2: '10:09' },
]
const DEF_F: FaqItem[] = [
  { id: uid(), q: 'מהו גיל המינימום להשתתפות בחוג?',             a: 'החוג מתאים לילדות מגיל 6 ומעלה. לגילאים צעירים יותר אנחנו ממליצות על השתתפות עם הורה — וזה גם הרבה יותר כיף!' },
  { id: uid(), q: 'כמה ילדות בכל קבוצה?',                       a: 'קבוצות קטנות של עד 8 ילדות בלבד — כדי שכל אחת תקבל תשומת לב אישית ותוצאה שהיא ממש גאה בה.' },
  { id: uid(), q: 'מה קורה אם הילדה לא יכולה להגיע לשיעור?',   a: 'אין בעיה! מותר לפספס שיעור עד פעם בחודש. ניתן לתאם תשלום חלקי או להצטרף לקבוצה אחרת באותו שבוע.' },
  { id: uid(), q: 'מה לובשים לסדנה?',                           a: 'בגדים שאפשר להתלכלך בהם — גם ככה רוב הקמח מגיע בחזרה הביתה עם החיוך 😄 לא חייבים סינר, אבל אפשר להביא.' },
  { id: uid(), q: 'מה הילדות אופות בכל שיעור?',                 a: 'כל שיעור מתמקד ביצירה אחת — עוגיות מעוצבות, מאפינס, לחם, פיצה, עוגות קרם ועוד. התפריט מתחלף בהתאם לעונה ולחגים.' },
  { id: uid(), q: 'האם הילדה לוקחת את מה שאפתה הביתה?',         a: 'כמובן! כל ילדה לוקחת הביתה את מה שיצרה באריזה יפה. זה גם ארוחת ערב וגם מתנה שהכינה לבד.' },
  { id: uid(), q: 'האם ניתן לארגן יום הולדת בסדנה?',            a: 'בהחלט! אנחנו מארגנות ימי הולדת מיוחדים לקבוצות של 6–15 ילדות. הפעילות כוללת אפייה, עיצוב ואריזת מתנות. פנו אלינו לפרטים.' },
  { id: uid(), q: 'מה ההבדל בין חוג שבועי לסדנה חד-פעמית?',    a: 'החוג השבועי מתאים לילדות שרוצות להתפתח לאורך זמן — כישורים, ביטחון עצמי ויצירתיות. הסדנה החד-פעמית מושלמת לאירועים וימי הולדת.' },
  { id: uid(), q: 'האם הסדנאות מתאימות לילדות עם אלרגיות?',     a: 'כן! חשוב לציין בעת ההרשמה כל אלרגיה כדי שנוכל להכין חומרים מתאימים ולוודא חוויה בטוחה לכל ילדה.' },
  { id: uid(), q: 'איפה הסדנאות מתקיימות?',                     a: 'בסטודיו המאובזר שלנו בקריות — מטבח מקצועי, עיצוב חמים, וכל הציוד כלול. לא צריך להביא כלום מהבית!' },
  { id: uid(), q: 'כמה עולה הסדנה?',                            a: 'המחיר משתנה לפי סוג הסדנה וכמות המשתתפות. שלחי לנו הודעה בוואטסאפ ונחזור אלייך עם הצעה אישית — ללא התחייבות.' },
  { id: uid(), q: 'איך נרשמים?',                                a: 'פשוט מאוד — שלחי הודעה בוואטסאפ, נעזור לבחור את הסדנה המתאימה ונשריין לך מקום. כל הפרטים מסתדרים בהודעות.' },
  { id: uid(), q: 'האם המרתון מתאים לנערות שלא אפו בעבר?',     a: 'בהחלט! המרתון מתאים לכל הרמות — מתחילות לגמרי ועד מי שכבר אופה בבית. זהבה מלמדת בסבלנות ומתאימה את עצמה לכל אחת.' },
  { id: uid(), q: 'האם ניתן לשלב את הסדנה עם אירוע חברה?',     a: 'כן! אנחנו מקיימות סדנאות גיבוש לחברות ועסקים — חוויה שכל הצוות יזכור. צרי קשר לפרטים ולהצעת מחיר מותאמת.' },
  { id: uid(), q: 'כמה זמן נמשך כל שיעור?',                    a: 'שיעור חוג רגיל נמשך כשעתיים. סדנאות יום הולדת ואירועים — 2–3 שעות לפי הבחירה. מרתון הקיץ עומד על 5 שעות בכל מפגש.' },
  { id: uid(), q: 'האם הורים יכולים לצפות בשיעור?',             a: 'אנחנו מעודדות את הילדות להיות עצמאיות! ההורים מחכים בחוץ ומקבלות בסוף ילדה גאה ומחייכת — וכמובן מה שאפתה 🎂' },
  { id: uid(), q: 'האם החוג מתאים גם לבנים?',                  a: 'כן! אמנם רוב המשתתפים הן בנות, אבל בנים מאוד מוזמנים. אפייה אין לה מגדר — רק טעם טוב 😄' },
  { id: uid(), q: 'מה כלול במחיר?',                            a: 'הכל! חומרי גלם, ציוד, הוראה צמודה, ואריזה יפה להביא הביתה. לא צריך להביא שום דבר — רק להגיע עם חשק.' },
  { id: uid(), q: 'האם ניתן לשלם בתשלומים?',                  a: 'כן! ניתן לפרוס את התשלום. שלחי לנו הודעה ונסדר את זה בנוחות — גמישות היא חלק מהשירות שלנו.' },
  { id: uid(), q: 'כמה מראש צריך להירשם?',                     a: 'ממליצות להירשם לפחות שבועיים מראש — הקבוצות מתמלאות מהר. לחוג השבועי ולמרתון הקיץ — ככל שמוקדם יותר, כך יש יותר בחירה של מועדים.' },
  { id: uid(), q: 'האם יש שיעורים בסוף השבוע?',               a: 'כן! יש מפגשים גם בימי שישי ובסופי שבוע, מתאים מאוד למשפחות עם לוח זמנים עמוס. שלחי הודעה לתיאום מועד נוח.' },
  { id: uid(), q: 'מה מדיניות הביטול?',                        a: 'ביטול עד 48 שעות לפני השיעור — מלא. ביטול בפחות מ-48 שעות יחויב בחצי. תאונה או מחלה? נטפל בזה בהבנה, תמיד.' },
]
const DEFAULTS: FormData = {
  owner_name: 'זהבה מילברג', location: 'קריות', phone: '050-676-2220',
  whatsapp: '972506762220', instagram: 'lalag.and.more',
  headline: 'חולמת לאפות.', subheadline: 'אנחנו הופכות את החלום לחוויה.',
  hero_desc: 'סדנאות אפייה מקצועיות בהנחיית קונדיטורית מוסמכת.',
  about_bio: 'קונדיטורית מוסמכת עם ניסיון עשיר בעבודה עם ילדות, נערות וקבוצות.',
  about_sub: 'האהבה לאפייה הפכה לשליחות',
  about_tagline: 'קבוצות קטנות, יחס אישי ותוצרת שלוקחים הביתה עם גאווה.',
  services_heading: 'שלושה סוגי חוויות אפייה',
  section1_title: 'חוגים שבועיים',    section1_desc: 'חוגים קבועים לגילאי 6–14.',
  section1_badge: '🔥 כמעט מלא',       section1_tags: 'גילאי 6–14,שבועי',
  wa_msg_1: 'היי זהבה! אני מעוניינת לשמוע על חוגים שבועיים לבתי 🎂',
  section2_title: 'סדנאות פרטיות',    section2_desc: 'סדנאות גמישות לזוגות וקבוצות.',
  section2_badge: '',                   section2_tags: 'קבוצות,יום הולדת',
  wa_msg_2: 'היי זהבה! אני מעוניינת לתאם סדנה פרטית 🎉',
  section3_title: 'סדנאות לארגונים',  section3_desc: 'סדנאות לקבוצות גדולות.',
  section3_badge: '',                   section3_tags: 'גיבוש,40+ אנשים',
  wa_msg_3: 'היי זהבה! אני מעוניינת לקבל הצעת מחיר לסדנה לארגון שלנו 🏢',
  section4_badge: '⭐ חופש הגדול',      section4_tags: 'גילאי 10–16,5 מפגשים',
  gallery_heading: 'הצצה מאחורי הקלעים',
  gallery_sub: 'רגעים אמיתיים מהסדנאות שלנו — ריחות, צחוקים ויצירות',
  how1_title: 'כותבים לנו',       how1_desc: 'שולחים הודעה בוואטסאפ — קצרה ופשוטה',
  how2_title: 'בוחרים סדנה',      how2_desc: 'נעזור לבחור את הסדנה המתאימה לגיל ולאירוע',
  how3_title: 'מאשרים תאריך',     how3_desc: 'קובעים ביחד תאריך ומקום שנוח לכם',
  how4_title: 'נהנים!',           how4_desc: 'מגיעים, אופים, צוחקים — ולוקחים הביתה יצירה',
  cta_heading: 'המקומות האחרונים לסדנה הקרובה',
  cta_sub: 'אל תחכי — הקבוצות מתמלאות מהר',
  footer_desc: 'סדנאות אפייה מקצועיות בקריות. מקום שבו ילדות ונשים מגלות את הקסם שבמטבח.',
  testimonials: DEF_T, faq_items: DEF_F,
}

/* ─── Command palette ────────────────────────────────────────────── */
type CmdItem = { id: string; label: string; icon: string; group: string; shortcut?: string }
const CMD_ITEMS: CmdItem[] = [
  { id: 'save',         label: 'שמור ופרסם',          icon: '⬆', group: 'פעולות', shortcut: '⌘S' },
  { id: 'undo',         label: 'בטל',                  icon: '⟲', group: 'פעולות', shortcut: '⌘Z' },
  { id: 'redo',         label: 'בצע שוב',              icon: '⟳', group: 'פעולות', shortcut: '⌘Y' },
  { id: 'live',         label: 'צפה באתר החי',         icon: '↗', group: 'פעולות' },
  { id: 'logout',       label: 'יציאה מהדשבורד',       icon: '⏻', group: 'פעולות' },
  { id: 'hero',         label: 'נווט ל: קטע ראשי',    icon: '✦', group: 'ניווט' },
  { id: 'about',        label: 'נווט ל: אודות',        icon: '◎', group: 'ניווט' },
  { id: 'services',     label: 'נווט ל: שירותים',      icon: '◈', group: 'ניווט' },
  { id: 'testimonials', label: 'נווט ל: המלצות',       icon: '◑', group: 'ניווט' },
  { id: 'faq',          label: 'נווט ל: שאלות נפוצות', icon: '◐', group: 'ניווט' },
  { id: 'settings',     label: 'הגדרות עסק',           icon: '⚙', group: 'ניווט' },
  { id: 'dev-desktop',  label: 'מכשיר: שולחן עבודה',  icon: '⊞', group: 'מכשיר' },
  { id: 'dev-tablet',   label: 'מכשיר: טאבלט',         icon: '⬜', group: 'מכשיר' },
  { id: 'dev-mobile',   label: 'מכשיר: נייד',          icon: '▯', group: 'מכשיר' },
]

/* ══════════════════════════════════════════════════════════════════ */
export default function Dashboard() {
  /* ─── State ────────────────────────────────────────────────────── */
  const iframeRef    = useRef<HTMLIFrameElement>(null)
  const canvasRef    = useRef<HTMLDivElement>(null)
  const saveRef      = useRef<() => void>(() => {})
  const undoRef      = useRef<() => void>(() => {})
  const redoRef      = useRef<() => void>(() => {})

  const [form, setForm]                   = useState<FormData>(DEFAULTS)
  const [rowId, setRowId]                 = useState<string | null>(null)
  const [device, setDevice]               = useState<Device>('desktop')
  const [selected, setSelected]           = useState<SelectedEl>(null)
  const [activeLayer, setActiveLayer]     = useState<string | null>(null)
  const [expandedLayers, setExpandedLayers] = useState<Record<string, boolean>>({ hero: true })
  const [saveStatus, setSaveStatus]       = useState<SaveStatus>('idle')
  const [unsaved, setUnsaved]             = useState(false)
  const [iframeReady, setIframeReady]     = useState(false)
  const [history, setHistory]             = useState<FormData[]>([DEFAULTS])
  const [histIdx, setHistIdx]             = useState(0)
  const [showSettings, setShowSettings]   = useState(false)
  const [cmdOpen, setCmdOpen]             = useState(false)
  const [cmdQuery, setCmdQuery]           = useState('')
  const [cmdIdx, setCmdIdx]               = useState(0)
  const [toast, setToast]                 = useState<ToastMsg>(null)
  const [scale, setScale]                 = useState(1)
  const [mounted, setMounted]             = useState(false)

  /* ─── Mount ─────────────────────────────────────────────────────── */
  useEffect(() => {
    setMounted(true)
    try {
      const d = localStorage.getItem('ds_device') as Device | null
      if (d && DEVICES[d]) setDevice(d)
      const l = localStorage.getItem('ds_layers')
      if (l) setExpandedLayers(JSON.parse(l))
      const a = localStorage.getItem('ds_active')
      if (a) setActiveLayer(a)
    } catch {}
  }, [])

  /* ─── Persist state to localStorage ────────────────────────────── */
  useEffect(() => { if (mounted) try { localStorage.setItem('ds_device', device) } catch {} }, [device, mounted])
  useEffect(() => { if (mounted) try { localStorage.setItem('ds_layers', JSON.stringify(expandedLayers)) } catch {} }, [expandedLayers, mounted])
  useEffect(() => { if (mounted && activeLayer) try { localStorage.setItem('ds_active', activeLayer) } catch {} }, [activeLayer, mounted])

  /* ─── Load from DB ───────────────────────────────────────────────── */
  useEffect(() => {
    supabase.from('landing_page_settings').select('*').limit(1).single()
      .then(({ data }) => {
        if (!data) return
        setRowId(data.id)
        const loaded: FormData = {
          ...DEFAULTS, ...data,
          section1_title: data.section1_title || DEFAULTS.section1_title,
          section2_title: data.section2_title || DEFAULTS.section2_title,
          section3_title: data.section3_title || DEFAULTS.section3_title,
          testimonials: data.testimonials?.length ? data.testimonials : DEFAULTS.testimonials,
          faq_items:    data.faq_items?.length    ? data.faq_items    : DEFAULTS.faq_items,
        }
        setForm(loaded)
        setHistory([loaded])
      })
  }, [])

  /* ─── iframe messages ───────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data?.type) return
      if (e.data.type === 'LALAG_READY') setIframeReady(true)
      if (e.data.type === 'LALAG_SELECT') {
        setSelected({ field: e.data.field, value: e.data.value })
        const layer = LAYERS.find(l => l.fields.some((f: any) => f.field === e.data.field))
        if (layer) setActiveLayer(layer.id)
        setShowSettings(false)
      }
      if (e.data.type === 'LALAG_DESELECT') setSelected(null)
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  /* ─── Core callbacks ─────────────────────────────────────────────── */
  const sendToIframe = useCallback((type: string, payload: object) => {
    iframeRef.current?.contentWindow?.postMessage({ type, ...payload }, '*')
  }, [])

  const showToast = useCallback((msg: string, type: 'success'|'error'|'info' = 'info') => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  const updateField = useCallback((field: keyof FormData, value: string) => {
    setForm(prev => {
      sendToIframe('LALAG_UPDATE', { field, value })
      return { ...prev, [field]: value }
    })
    setUnsaved(true)
    setSelected(prev => prev?.field === field ? { ...prev, value } : prev)
  }, [sendToIframe])

  const updateFaqItems = useCallback((items: FaqItem[]) => {
    setForm(prev => ({ ...prev, faq_items: items }))
    setUnsaved(true)
    sendToIframe('LALAG_RELOAD', {})
  }, [sendToIframe])

  const pushHistory = useCallback((f: FormData) => {
    setHistory(h => [...h.slice(0, histIdx + 1), f].slice(-30))
    setHistIdx(i => Math.min(i + 1, 29))
  }, [histIdx])

  const undo = useCallback(() => {
    if (histIdx <= 0) return
    const prev = history[histIdx - 1]
    setForm(prev)
    setHistIdx(h => h - 1)
    Object.entries(prev).forEach(([k, v]) => {
      if (typeof v === 'string') sendToIframe('LALAG_UPDATE', { field: k, value: v })
    })
    setUnsaved(true)
  }, [history, histIdx, sendToIframe])

  const redo = useCallback(() => {
    if (histIdx >= history.length - 1) return
    const next = history[histIdx + 1]
    setForm(next)
    setHistIdx(h => h + 1)
    Object.entries(next).forEach(([k, v]) => {
      if (typeof v === 'string') sendToIframe('LALAG_UPDATE', { field: k, value: v })
    })
    setUnsaved(true)
  }, [history, histIdx, sendToIframe])

  const handleSave = useCallback(async () => {
    setSaveStatus('saving')
    const payload = { ...form, business_name: 'LaLag', updated_at: new Date().toISOString() }
    const { error } = rowId
      ? await supabase.from('landing_page_settings').update(payload).eq('id', rowId)
      : await supabase.from('landing_page_settings').insert(payload)
    if (error) { setSaveStatus('error'); showToast('שגיאה בשמירה', 'error'); return }
    await fetch('/api/revalidate', { method: 'POST' }).catch(() => {})
    setSaveStatus('saved')
    setUnsaved(false)
    pushHistory(form)
    showToast('האתר פורסם בהצלחה ✓', 'success')
    setTimeout(() => setSaveStatus('idle'), 2500)
  }, [form, rowId, pushHistory, showToast])

  /* keep refs fresh so global keydown never has stale closures */
  useEffect(() => { saveRef.current = handleSave }, [handleSave])
  useEffect(() => { undoRef.current = undo },        [undo])
  useEffect(() => { redoRef.current = redo },        [redo])

  /* ─── Keyboard shortcuts ────────────────────────────────────────── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key === 's') { e.preventDefault(); saveRef.current() }
      if (meta && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undoRef.current() }
      if (meta && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redoRef.current() }
      if (meta && e.key === 'k') { e.preventDefault(); setCmdOpen(v => !v); setCmdQuery(''); setCmdIdx(0) }
      if (e.key === 'Escape') setCmdOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  /* ─── Layer / field nav ──────────────────────────────────────────── */
  const onLayerClick = useCallback((layerId: string, section: string) => {
    setActiveLayer(layerId)
    setExpandedLayers(e => ({ ...e, [layerId]: true }))
    sendToIframe('LALAG_SCROLL_TO', { section })
  }, [sendToIframe])

  const onFieldClick = useCallback((field: string) => {
    sendToIframe('LALAG_FOCUS_FIELD', { field })
    setSelected({ field, value: (form as any)[field] || '' })
    setShowSettings(false)
  }, [sendToIframe, form])

  /* ─── Canvas scale ───────────────────────────────────────────────── */
  useEffect(() => {
    const calc = () => {
      if (!canvasRef.current) return
      const { w, h } = DEVICES[device]
      const cw = canvasRef.current.clientWidth  - 80
      const ch = canvasRef.current.clientHeight - 80
      setScale(Math.min(cw / w, ch / h, 1))
    }
    calc()
    const ro = new ResizeObserver(calc)
    if (canvasRef.current) ro.observe(canvasRef.current)
    return () => ro.disconnect()
  }, [device])

  /* ─── Command palette ────────────────────────────────────────────── */
  const filteredCmds = useMemo(() => {
    if (!cmdQuery.trim()) return CMD_ITEMS
    const q = cmdQuery.toLowerCase()
    return CMD_ITEMS.filter(c => c.label.includes(q) || c.group.includes(q))
  }, [cmdQuery])

  const execCmd = useCallback((id: string) => {
    setCmdOpen(false)
    switch (id) {
      case 'save':        saveRef.current(); break
      case 'undo':        undoRef.current(); break
      case 'redo':        redoRef.current(); break
      case 'live':        window.open('/', '_blank'); break
      case 'logout':      fetch('/api/auth/logout',{method:'POST'}).then(()=>window.location.href='/dashboard/login'); break
      case 'settings':    setShowSettings(true); setSelected(null); break
      case 'dev-desktop': setDevice('desktop'); break
      case 'dev-tablet':  setDevice('tablet'); break
      case 'dev-mobile':  setDevice('mobile'); break
      default: {
        const layer = LAYERS.find(l => l.id === id)
        if (layer) {
          setActiveLayer(id)
          setExpandedLayers(e => ({ ...e, [id]: true }))
          sendToIframe('LALAG_SCROLL_TO', { section: layer.section })
        }
      }
    }
  }, [sendToIframe])

  /* cmd palette arrow keys */
  useEffect(() => {
    if (!cmdOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setCmdIdx(i => Math.min(i + 1, filteredCmds.length - 1)) }
      if (e.key === 'ArrowUp')   { e.preventDefault(); setCmdIdx(i => Math.max(i - 1, 0)) }
      if (e.key === 'Enter')     { e.preventDefault(); if (filteredCmds[cmdIdx]) execCmd(filteredCmds[cmdIdx].id) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [cmdOpen, cmdIdx, filteredCmds, execCmd])

  /* ─── Derived ────────────────────────────────────────────────────── */
  const selectedLayer = LAYERS.find(l => l.id === activeLayer)
  const { w: dw, h: dh } = DEVICES[device]
  const saveLabel = saveStatus === 'saving' ? 'שומר...' : saveStatus === 'saved' ? '✓ פורסם' : saveStatus === 'error' ? '✕ שגיאה' : 'פרסם'

  /* ── Grouped commands for palette ──────────────────────────────── */
  const groupedCmds = useMemo(() => {
    const groups: Record<string, CmdItem[]> = {}
    filteredCmds.forEach(item => { (groups[item.group] ??= []).push(item) })
    return groups
  }, [filteredCmds])

  /* ════════════════════════════════════════════════════════════════ */
  return (
    <div dir="rtl" className="ds-root">
      <style>{GLOBAL_CSS}</style>

      {/* ── COMMAND PALETTE ──────────────────────────────────────── */}
      {cmdOpen && (
        <div className="cmd-overlay" onClick={() => setCmdOpen(false)}>
          <div className="cmd-panel" onClick={e => e.stopPropagation()}>
            <div className="cmd-search-row">
              <span className="cmd-search-icon">⌕</span>
              <input
                autoFocus
                className="cmd-input"
                placeholder="חפש פקודה..."
                value={cmdQuery}
                onChange={e => { setCmdQuery(e.target.value); setCmdIdx(0) }}
              />
              <kbd className="cmd-esc">ESC</kbd>
            </div>
            <div className="cmd-results">
              {Object.entries(groupedCmds).map(([group, items]) => (
                <div key={group}>
                  <div className="cmd-group-label">{group}</div>
                  {items.map(item => {
                    const gi = filteredCmds.indexOf(item)
                    return (
                      <div key={item.id}
                        className={`cmd-item${cmdIdx === gi ? ' cmd-item-active' : ''}`}
                        onClick={() => execCmd(item.id)}
                        onMouseEnter={() => setCmdIdx(gi)}>
                        <span className="cmd-item-icon">{item.icon}</span>
                        <span className="cmd-item-label">{item.label}</span>
                        {item.shortcut && <kbd className="cmd-shortcut">{item.shortcut}</kbd>}
                      </div>
                    )
                  })}
                </div>
              ))}
              {filteredCmds.length === 0 && (
                <div className="cmd-empty">אין תוצאות עבור &ldquo;{cmdQuery}&rdquo;</div>
              )}
            </div>
            <div className="cmd-footer">
              <span><kbd>↑↓</kbd> ניווט</span>
              <span><kbd>↵</kbd> הפעל</span>
              <span><kbd>ESC</kbd> סגור</span>
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST ────────────────────────────────────────────────── */}
      {toast && <div className={`toast toast-${toast.type}`}>{toast.msg}</div>}

      {/* ══ TOP BAR ═══════════════════════════════════════════════ */}
      <header className="topbar">
        {/* Brand */}
        <div className="brand">
          <div className="brand-icon">🎂</div>
          <span className="brand-name">LALAG</span>
          <span className="brand-sub">studio</span>
        </div>

        <div className="topbar-divider" />

        {/* Undo / Redo */}
        <div style={{ display:'flex', gap:2 }}>
          {[
            { label:'⟲', action:() => undoRef.current(), disabled:histIdx <= 0,                tip:'בטל (⌘Z)' },
            { label:'⟳', action:() => redoRef.current(), disabled:histIdx >= history.length-1, tip:'בצע שוב (⌘Y)' },
          ].map(b => (
            <button key={b.label} onClick={b.action} disabled={b.disabled} title={b.tip}
              className={`icon-btn${b.disabled ? ' icon-btn-disabled' : ''}`}>
              {b.label}
            </button>
          ))}
        </div>

        <div className="topbar-divider" />

        {/* Device switcher */}
        <div className="device-switcher">
          {(Object.keys(DEVICES) as Device[]).map(d => (
            <button key={d} onClick={() => setDevice(d)} title={DEVICES[d].label}
              className={`device-btn${device === d ? ' device-btn-active' : ''}`}>
              {DEVICES[d].icon}
            </button>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        {/* Cmd K trigger */}
        <button className="cmd-trigger" onClick={() => { setCmdOpen(true); setCmdQuery(''); setCmdIdx(0) }}>
          <span style={{ color:'rgba(255,255,255,.35)', fontSize:13 }}>⌕</span>
          <span>חיפוש פקודות</span>
          <kbd>⌘K</kbd>
        </button>

        <div className="topbar-divider" />

        {/* Unsaved dot */}
        {unsaved && <div className="unsaved-dot" title="יש שינויים שלא נשמרו" />}

        {/* Publish */}
        <button onClick={handleSave} disabled={saveStatus === 'saving'}
          className={`btn-publish${saveStatus !== 'idle' ? ` btn-publish-${saveStatus}` : ''}`}>
          {saveLabel}
        </button>

        {/* View live */}
        <a href="/" target="_blank" className="topbar-live">
          <span>צפה באתר</span>
          <span>↗</span>
        </a>

        {/* Logout */}
        <button
          onClick={() => fetch('/api/auth/logout',{method:'POST'}).then(()=>window.location.href='/dashboard/login')}
          title="יציאה"
          style={{ background:'transparent', border:'1px solid rgba(255,255,255,.1)', borderRadius:7, color:'rgba(255,255,255,.4)', fontSize:13, padding:'5px 10px', cursor:'pointer', marginRight:4, transition:'all .2s' }}
          onMouseEnter={e=>(e.currentTarget.style.color='rgba(239,68,68,.9)',e.currentTarget.style.borderColor='rgba(239,68,68,.3)')}
          onMouseLeave={e=>(e.currentTarget.style.color='rgba(255,255,255,.4)',e.currentTarget.style.borderColor='rgba(255,255,255,.1)')}
        >
          ⏻ יציאה
        </button>
      </header>

      {/* ══ MAIN ══════════════════════════════════════════════════ */}
      <div className="main-area">

        {/* ── LAYERS SIDEBAR (right in RTL) ───────────────────── */}
        <aside className="sidebar-layers">
          <div className="sidebar-header">שכבות</div>

          <div className="sidebar-scroll">
            {LAYERS.map(layer => {
              const isActive   = activeLayer === layer.id
              const isExpanded = !!expandedLayers[layer.id]
              const hasFields  = layer.fields.length > 0

              return (
                <div key={layer.id}>
                  <div
                    className={`layer-row${isActive ? ' layer-row-active' : ''}`}
                    style={isActive ? { '--lc': layer.color } as any : {}}
                    onClick={() => {
                      onLayerClick(layer.id, layer.section)
                      if (hasFields || layer.id === 'testimonials' || layer.id === 'faq')
                        setExpandedLayers(e => ({ ...e, [layer.id]: !isExpanded }))
                    }}
                  >
                    <span className="layer-icon" style={{ color: isActive ? layer.color : undefined }}>
                      {layer.icon}
                    </span>
                    <span className="layer-label">{layer.label}</span>
                    <span className={`layer-chevron${isExpanded ? ' layer-chevron-open' : ''}`}>›</span>
                  </div>

                  {/* Expandable fields */}
                  <div className={`layer-fields${isExpanded ? ' layer-fields-open' : ''}`}>
                    {(layer.fields as unknown as any[]).map((f: any) => {
                      const isSel = selected?.field === f.field
                      return (
                        <div key={f.field}
                          className={`field-row${isSel ? ' field-row-active' : ''}`}
                          onClick={() => onFieldClick(f.field)}>
                          <div className="field-dot"
                            style={isSel ? { background: layer.color } : {}} />
                          <span className="field-label">{f.label}</span>
                        </div>
                      )
                    })}

                    {/* Manage link for array sections */}
                    {(layer.id === 'testimonials' || layer.id === 'faq') && (
                      <div style={{ padding: '4px 14px 8px 14px' }}>
                        <a href="/dashboard?tab=content" className="manage-link">
                          {layer.id === 'testimonials'
                            ? `נהל המלצות (${form.testimonials.length}) ›`
                            : `נהל שאלות (${form.faq_items.length}) ›`}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            <div className="sidebar-sep" />

            {/* Settings row */}
            <div
              className={`layer-row${showSettings ? ' layer-row-active' : ''}`}
              style={showSettings ? { '--lc': '#94A3B8' } as any : {}}
              onClick={() => { setShowSettings(v => !v); setSelected(null) }}>
              <span className="layer-icon" style={{ color: showSettings ? '#94A3B8' : undefined }}>⚙</span>
              <span className="layer-label">הגדרות עסק</span>
              <span className="layer-chevron">›</span>
            </div>
          </div>

          {/* Shortcuts footer */}
          <div className="sidebar-footer">
            {[['⌘K','פקודות'],['⌘S','פרסם'],['⌘Z','בטל']].map(([k,l]) => (
              <div key={k} className="shortcut-row">
                <kbd className="shortcut-kbd">{k}</kbd>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </aside>

        {/* ── CANVAS ─────────────────────────────────────────────── */}
        <div ref={canvasRef} className="canvas-area">
          <div className="canvas-grid" />
          <div className="canvas-glow" />
          {/* Decorative ink spots — warm atmospheric corners */}
          <div aria-hidden="true" style={{
            position:'absolute', top:0, right:0, width:320, height:320, pointerEvents:'none', zIndex:0,
            background:'radial-gradient(ellipse at top right, rgba(232,65,90,.045) 0%, transparent 65%)',
          }} />
          <div aria-hidden="true" style={{
            position:'absolute', bottom:0, left:0, width:260, height:260, pointerEvents:'none', zIndex:0,
            background:'radial-gradient(ellipse at bottom left, rgba(210,130,80,.028) 0%, transparent 65%)',
          }} />

          {/* Device frame */}
          <div style={{
            position: 'relative',
            transformOrigin: 'center center',
            transform: `scale(${scale})`,
            transition: 'transform .35s cubic-bezier(.22,1,.36,1)',
          }}>
            <div className={`device-frame device-frame-${device}`}>

              {/* Desktop bar */}
              {device === 'desktop' && (
                <div className="device-bar desktop-bar">
                  {['#FF5F56','#FFBD2E','#27C93F'].map(c => (
                    <div key={c} style={{ width:11, height:11, borderRadius:'50%', background:c }} />
                  ))}
                  <div className="url-bar">lalag.vercel.app</div>
                </div>
              )}

              {/* Tablet top */}
              {device === 'tablet' && (
                <div className="device-bar tablet-top">
                  <div className="tablet-camera" />
                </div>
              )}

              {/* Mobile notch */}
              {device === 'mobile' && (
                <div className="device-bar mobile-top">
                  <div className="mobile-pill">
                    <div className="mobile-camera" />
                  </div>
                </div>
              )}

              {/* IFRAME */}
              <div style={{
                position: 'relative',
                width: dw,
                height: dh - (device === 'desktop' ? 36 : device === 'tablet' ? 56 : 76),
                overflow: 'hidden',
              }}>
                <iframe
                  ref={iframeRef}
                  src="/?mode=edit"
                  style={{ width:'100%', height:'100%', border:'none', display:'block' }}
                  title="עורך האתר החי"
                />
                {!iframeReady && (
                  <div className="iframe-loader">
                    <div className="loader-spinner">🎂</div>
                    <div className="loader-text">טוען עורך...</div>
                  </div>
                )}
              </div>

              {/* Bottom chrome */}
              {device === 'tablet' && (
                <div className="device-bar tablet-bottom"><div className="home-bar" /></div>
              )}
              {device === 'mobile' && (
                <div className="device-bar mobile-bottom"><div className="home-bar-mobile" /></div>
              )}
            </div>

            <div className="device-label">{DEVICES[device].label} — {dw}×{dh}</div>
          </div>

          {/* Click hint */}
          {iframeReady && !selected && (
            <div className="click-hint">
              ✦&ensp;לחץ על אלמנט בקנבס לעריכה
            </div>
          )}
        </div>

        {/* ── PROPERTIES PANEL (left in RTL) ──────────────────── */}
        <aside className="sidebar-props">
          {showSettings ? (
            <SettingsPanel form={form} updateField={updateField} onClose={() => setShowSettings(false)} />
          ) : selected ? (
            <FieldPanel selected={selected} form={form} updateField={updateField} onFocusOther={onFieldClick} />
          ) : activeLayer === 'faq' ? (
            <FaqPanel items={form.faq_items} onChange={updateFaqItems} />
          ) : activeLayer === 'services' ? (
            <ServicesTagsPanel form={form} updateField={updateField} />
          ) : (
            <EmptyState layer={selectedLayer as any} onFieldClick={onFieldClick} />
          )}
        </aside>
      </div>
    </div>
  )
}

/* ─── Empty state ─────────────────────────────────────────────────── */
function EmptyState({ layer, onFieldClick }: { layer: any; onFieldClick: (f: string) => void }) {
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div className="panel-header">
        <span className="ph-icon">◆</span>
        <span className="ph-title">מאפיינים</span>
      </div>

      <div className="empty-body">
        <div className="empty-icon-wrap">✦</div>
        <p className="empty-title">בחר אלמנט</p>
        <p className="empty-desc">לחץ על אלמנט מסומן בקנבס לעריכת תוכנו</p>
      </div>

      {layer && (layer.fields as unknown as any[]).length > 0 && (
        <div style={{ padding:'0 12px 16px' }}>
          <div className="section-label">{layer.label} — שדות</div>
          {(layer.fields as unknown as any[]).map((f: any) => (
            <button key={f.field} onClick={() => onFieldClick(f.field)} className="shortcut-field-btn">
              <div className="field-dot-sm" />
              <span>{f.label}</span>
              <span style={{ marginRight:'auto', opacity:.3, fontSize:12 }}>›</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Field panel ─────────────────────────────────────────────────── */
function FieldPanel({ selected, form, updateField, onFocusOther }: {
  selected: SelectedEl
  form: FormData
  updateField: (k: keyof FormData, v: string) => void
  onFocusOther: (f: string) => void
}) {
  if (!selected) return null

  const allFields = LAYERS.flatMap(l => (l.fields as unknown as any[]))
  const fieldMeta  = allFields.find(f => f.field === selected.field)
  const fieldLabel = fieldMeta?.label || selected.field
  const layer      = LAYERS.find(l => (l.fields as unknown as any[]).some((f: any) => f.field === selected.field))
  const others     = (layer?.fields as unknown as any[] || []).filter((f: any) => f.field !== selected.field)
  const isLong     = selected.value.length > 60 || selected.field.includes('desc') || selected.field.includes('bio')
  const charCount  = ((form as any)[selected.field] || '').length

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div className="panel-header">
        <div className="ph-badge" style={layer ? { background:(layer as any).color } : {}} />
        <span className="ph-title">{fieldLabel}</span>
        {layer && <span className="ph-layer-tag">{layer.label}</span>}
      </div>

      <div className="panel-scroll">
        {/* Editor */}
        <div>
          <div className="section-label">תוכן</div>
          {isLong ? (
            <textarea
              value={(form as any)[selected.field] || ''}
              onChange={e => updateField(selected.field as keyof FormData, e.target.value)}
              className="field-textarea"
              rows={5}
            />
          ) : (
            <input
              type="text"
              value={(form as any)[selected.field] || ''}
              onChange={e => updateField(selected.field as keyof FormData, e.target.value)}
              className="field-input"
            />
          )}
          {fieldMeta?.hint && <div className="field-hint">{fieldMeta.hint}</div>}
          <div className="char-count">{charCount} תווים</div>
        </div>

        {/* Live indicator */}
        <div className="live-indicator">
          <div className="live-dot" />
          <span>תצוגה חיה מתעדכנת</span>
        </div>

        {/* Typography */}
        <div>
          <div className="section-label">טיפוגרפיה</div>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8 }}>
            {[['גופן','Heebo'],['כיוון','RTL']].map(([l,v]) => (
              <div key={l} className="info-chip">
                <div className="info-chip-label">{l}</div>
                <div className="info-chip-value">{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {others.length > 0 && (
          <div>
            <div className="section-label">שדות קשורים</div>
            {others.slice(0, 4).map((f: any) => (
              <button key={f.field} onClick={() => onFocusOther(f.field)} className="related-btn">
                <div className="field-dot-sm" />
                <span>{f.label}</span>
                <span style={{ marginRight:'auto', opacity:.3, fontSize:12 }}>›</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── FAQ panel ───────────────────────────────────────────────────── */
function FaqPanel({ items, onChange }: { items: FaqItem[]; onChange: (items: FaqItem[]) => void }) {
  const [expanded, setExpanded] = useState<string | null>(null)

  const update = (id: string, key: 'q' | 'a', val: string) => {
    onChange(items.map(it => it.id === id ? { ...it, [key]: val } : it))
  }
  const remove = (id: string) => {
    onChange(items.filter(it => it.id !== id))
    if (expanded === id) setExpanded(null)
  }
  const add = () => {
    const newItem: FaqItem = { id: uid(), q: 'שאלה חדשה', a: 'תשובה...' }
    onChange([...items, newItem])
    setExpanded(newItem.id)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div className="panel-header">
        <span className="ph-icon" style={{ color:'#6366F1' }}>◐</span>
        <span className="ph-title">שאלות נפוצות</span>
        <span style={{ marginRight:'auto', fontSize:10, color:'rgba(255,255,255,.25)', background:'rgba(99,102,241,.15)', padding:'2px 6px', borderRadius:4 }}>{items.length}</span>
      </div>

      <div className="panel-scroll" style={{ padding:'8px 10px' }}>
        {items.map((item, i) => (
          <div key={item.id} className="faq-editor-row" style={{ marginBottom:6, border:'1px solid rgba(255,255,255,.07)', borderRadius:8, overflow:'hidden', background: expanded===item.id ? 'rgba(99,102,241,.06)' : 'rgba(255,255,255,.02)' }}>
            <div
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
              style={{ display:'flex', alignItems:'center', gap:8, padding:'9px 10px', cursor:'pointer', userSelect:'none' }}
            >
              <span style={{ fontSize:10, color:'rgba(99,102,241,.7)', fontWeight:700, minWidth:18 }}>Q{i+1}</span>
              <span style={{ flex:1, fontSize:12, color:'rgba(255,255,255,.7)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.q}</span>
              <span style={{ fontSize:10, color:'rgba(255,255,255,.2)', transition:'transform .2s', transform: expanded===item.id ? 'rotate(180deg)' : 'none' }}>▼</span>
            </div>
            {expanded === item.id && (
              <div style={{ padding:'0 10px 10px', display:'flex', flexDirection:'column', gap:6 }}>
                <div style={{ fontSize:10, color:'rgba(255,255,255,.3)', marginBottom:2 }}>שאלה</div>
                <input
                  value={item.q}
                  onChange={e => update(item.id, 'q', e.target.value)}
                  className="field-input"
                  style={{ fontSize:12, marginBottom:6 }}
                  dir="rtl"
                />
                <div style={{ fontSize:10, color:'rgba(255,255,255,.3)', marginBottom:2 }}>תשובה</div>
                <textarea
                  value={item.a}
                  onChange={e => update(item.id, 'a', e.target.value)}
                  className="field-textarea"
                  rows={3}
                  style={{ fontSize:12 }}
                  dir="rtl"
                />
                <button
                  onClick={() => remove(item.id)}
                  style={{ alignSelf:'flex-end', background:'rgba(239,68,68,.12)', border:'1px solid rgba(239,68,68,.2)', color:'rgba(239,68,68,.8)', fontSize:11, padding:'4px 10px', borderRadius:6, cursor:'pointer' }}
                >
                  מחק שאלה
                </button>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={add}
          style={{ width:'100%', marginTop:4, padding:'9px', background:'rgba(99,102,241,.1)', border:'1px dashed rgba(99,102,241,.3)', color:'rgba(99,102,241,.9)', borderRadius:8, cursor:'pointer', fontSize:12, fontWeight:600, display:'flex', alignItems:'center', justifyContent:'center', gap:6 }}
        >
          <span style={{ fontSize:16, lineHeight:1 }}>+</span> הוסף שאלה חדשה
        </button>

        <div className="live-indicator" style={{ marginTop:12 }}>
          <div className="live-dot" />
          <span>השינויים מתעדכנים בתצוגה</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Services Tags + Badge Panel ────────────────────────────────── */
const BADGE_PRESETS = ['🔥 כמעט מלא','⭐ חופש הגדול','🆕 חדש','🎉 מומלץ','⚡ מוגבל','']

function ServiceBadgeTags({
  srvLabel, srvNum, badgeKey, tagsKey, form, updateField
}: {
  srvLabel: string
  srvNum: string
  badgeKey: keyof FormData
  tagsKey: keyof FormData
  form: FormData
  updateField: (k: keyof FormData, v: string) => void
}) {
  const [tagInput, setTagInput] = useState('')
  const badge = (form[badgeKey] as string) || ''
  const tagsStr = (form[tagsKey] as string) || ''
  const tags = tagsStr ? tagsStr.split(',').map(t => t.trim()).filter(Boolean) : []

  const addTag = () => {
    const v = tagInput.trim()
    if (!v || tags.includes(v)) { setTagInput(''); return }
    updateField(tagsKey, [...tags, v].join(','))
    setTagInput('')
  }
  const removeTag = (t: string) => updateField(tagsKey, tags.filter(x => x !== t).join(','))

  return (
    <div style={{ marginBottom:16, border:'1px solid rgba(255,255,255,.07)', borderRadius:10, overflow:'hidden', background:'rgba(255,255,255,.02)' }}>
      {/* Header */}
      <div style={{ padding:'8px 10px', background:'rgba(245,158,11,.07)', borderBottom:'1px solid rgba(255,255,255,.05)', display:'flex', alignItems:'center', gap:6 }}>
        <span style={{ fontSize:11, fontWeight:700, color:'rgba(245,158,11,.9)' }}>{srvNum}</span>
        <span style={{ fontSize:12, color:'rgba(255,255,255,.7)', fontWeight:600 }}>{srvLabel}</span>
      </div>
      <div style={{ padding:'10px 10px 12px', display:'flex', flexDirection:'column', gap:10 }}>
        {/* Badge */}
        <div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,.3)', marginBottom:4, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase' }}>סימנייה אדומה</div>
          <input
            type="text"
            value={badge}
            onChange={e => updateField(badgeKey, e.target.value)}
            placeholder="ריק = ללא סימנייה"
            className="field-input"
            style={{ fontSize:12, marginBottom:6 }}
            dir="rtl"
          />
          <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
            {BADGE_PRESETS.map(p => (
              <button
                key={p||'empty'}
                onClick={() => updateField(badgeKey, p)}
                style={{
                  padding:'3px 8px', borderRadius:20, fontSize:11, cursor:'pointer',
                  border: badge === p ? '1px solid rgba(240,81,106,.7)' : '1px solid rgba(255,255,255,.1)',
                  background: badge === p ? 'rgba(240,81,106,.15)' : 'rgba(255,255,255,.04)',
                  color: p ? 'rgba(255,255,255,.75)' : 'rgba(255,255,255,.3)',
                  transition:'all .15s'
                }}
              >
                {p || '— ללא —'}
              </button>
            ))}
          </div>
        </div>
        {/* Tags */}
        <div>
          <div style={{ fontSize:10, color:'rgba(255,255,255,.3)', marginBottom:4, fontWeight:600, letterSpacing:'.06em', textTransform:'uppercase' }}>תגיות</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5, marginBottom:6, minHeight:24 }}>
            {tags.length === 0 && <span style={{ fontSize:11, color:'rgba(255,255,255,.2)' }}>אין תגיות</span>}
            {tags.map(t => (
              <span key={t} style={{ display:'inline-flex', alignItems:'center', gap:4, background:'rgba(245,158,11,.12)', border:'1px solid rgba(245,158,11,.25)', color:'rgba(245,158,11,.9)', borderRadius:20, padding:'2px 8px 2px 4px', fontSize:11 }}>
                {t}
                <button
                  onClick={() => removeTag(t)}
                  style={{ background:'none', border:'none', cursor:'pointer', color:'rgba(245,158,11,.6)', fontSize:13, lineHeight:1, padding:'0 2px' }}
                  aria-label={`הסר תגית ${t}`}
                >×</button>
              </span>
            ))}
          </div>
          <div style={{ display:'flex', gap:5 }}>
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
              placeholder="כתבי תגית + Enter"
              className="field-input"
              style={{ fontSize:12, flex:1 }}
              dir="rtl"
            />
            <button
              onClick={addTag}
              style={{ padding:'0 12px', background:'rgba(245,158,11,.15)', border:'1px solid rgba(245,158,11,.3)', color:'rgba(245,158,11,.9)', borderRadius:7, cursor:'pointer', fontSize:12, fontWeight:700 }}
            >+</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ServicesTagsPanel({ form, updateField }: { form: FormData; updateField: (k: keyof FormData, v: string) => void }) {
  const SERVICES = [
    { label:'🍰 חוגים שבועיים',    num:'01', badgeKey:'section1_badge' as keyof FormData, tagsKey:'section1_tags' as keyof FormData },
    { label:'🎂 סדנאות פרטיות',    num:'02', badgeKey:'section2_badge' as keyof FormData, tagsKey:'section2_tags' as keyof FormData },
    { label:'🏢 סדנאות לארגונים', num:'03', badgeKey:'section3_badge' as keyof FormData, tagsKey:'section3_tags' as keyof FormData },
    { label:'🏆 מרתון אפייה',      num:'04', badgeKey:'section4_badge' as keyof FormData, tagsKey:'section4_tags' as keyof FormData },
  ]
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div className="panel-header">
        <span className="ph-icon" style={{ color:'#F59E0B' }}>◈</span>
        <span className="ph-title">סימניות ותגיות שירותים</span>
      </div>
      <div className="panel-scroll" style={{ padding:'8px 10px' }}>
        <div style={{ fontSize:11, color:'rgba(255,255,255,.3)', marginBottom:10, lineHeight:1.5 }}>
          הוסיפי/הסירי סימניות צבעוניות ותגיות לכל קארד שירות. ריק = לא מוצג.
        </div>
        {SERVICES.map(s => (
          <ServiceBadgeTags key={s.num} srvLabel={s.label} srvNum={s.num} badgeKey={s.badgeKey} tagsKey={s.tagsKey} form={form} updateField={updateField} />
        ))}
        <div className="live-indicator" style={{ marginTop:4 }}>
          <div className="live-dot" />
          <span>השינויים מתעדכנים בתצוגה</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Settings panel ──────────────────────────────────────────────── */
function SettingsPanel({ form, updateField, onClose }: {
  form: FormData
  updateField: (k: keyof FormData, v: string) => void
  onClose: () => void
}) {
  const fields: { key: keyof FormData; label: string; hint: string }[] = [
    { key: 'owner_name', label: 'שם הבעלים', hint: 'מוצג בכל האתר' },
    { key: 'location',   label: 'מיקום',      hint: 'עיר / אזור' },
    { key: 'phone',      label: 'טלפון',       hint: '050-000-0000' },
    { key: 'whatsapp',   label: 'WhatsApp',    hint: '972506762220' },
    { key: 'instagram',  label: 'אינסטגרם',   hint: 'שם משתמש בלבד' },
    { key: 'headline',   label: 'כותרת SEO',   hint: 'כותרת לגוגל' },
  ]
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%' }}>
      <div className="panel-header">
        <span className="ph-icon">⚙</span>
        <span className="ph-title">הגדרות עסק</span>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      <div className="panel-scroll">
        {fields.map(f => (
          <div key={f.key}>
            <div className="section-label">{f.label}</div>
            <input
              type="text"
              value={(form as any)[f.key] || ''}
              placeholder={f.hint}
              onChange={e => updateField(f.key, e.target.value)}
              className="field-input"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   GLOBAL CSS — V13 Luxury Creative Workspace
   Warm. Editorial. Crafted. Ink on paper.
══════════════════════════════════════════════════════════════════ */
const GLOBAL_CSS = `
  /* ─── Reset ─────────────────────────────────────────────── */
  *, *::before, *::after { box-sizing:border-box; margin:0; padding:0 }

  ::-webkit-scrollbar { width:3px; height:3px }
  ::-webkit-scrollbar-track { background:transparent }
  ::-webkit-scrollbar-thumb { background:rgba(238,230,220,.08); border-radius:2px }
  ::-webkit-scrollbar-thumb:hover { background:rgba(238,230,220,.16) }

  /* ─── Keyframes ─────────────────────────────────────────── */
  @keyframes spin        { to { transform:rotate(360deg) } }
  @keyframes fadeUp      { from { opacity:0;transform:translateY(-10px) } to { opacity:1;transform:none } }
  @keyframes scaleIn     { from { opacity:0;transform:scale(.94) translateY(-8px) } to { opacity:1;transform:none } }
  @keyframes toastSlide  { from { opacity:0;transform:translateX(16px) } to { opacity:1;transform:none } }
  @keyframes livePulse   { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.32;transform:scale(.7)} }
  @keyframes glowFloat   {
    0%,100%{ transform:translate(-50%,-50%) scale(1); opacity:.32; }
    50%{ transform:translate(-50%,-50%) scale(1.14); opacity:.48; }
  }
  @keyframes unsavedBeat { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.8)} }
  @keyframes inkReveal   {
    from { opacity:0; transform:scaleX(0); transform-origin:right center; }
    to   { opacity:1; transform:scaleX(1); transform-origin:right center; }
  }
  @keyframes inkDrop     {
    0%  { opacity:0; transform:scale(.6) translateY(4px); filter:blur(4px); }
    60% { opacity:1; transform:scale(1.04) translateY(-1px); filter:blur(0); }
    100%{ opacity:1; transform:scale(1) translateY(0); filter:blur(0); }
  }
  @keyframes brushPulse  { 0%,100%{opacity:.22} 50%{opacity:.35} }

  /* ─── Design tokens ─────────────────────────────────────── */
  .ds-root {
    display:flex; flex-direction:column; height:100vh;
    background:#0B0909;
    font-family:"Inter","Segoe UI",system-ui,sans-serif;
    color:#EDE6DE;
    overflow:hidden;

    --accent:    #E8415A;
    --accent-d:  rgba(232,65,90,.12);
    --accent-g:  rgba(232,65,90,.24);
    --warm:      rgba(210,158,102,.75);
    --bg:        #0B0909;
    --bg-s:      rgba(15,11,10,.95);
    --bg-e:      rgba(22,16,14,.98);
    --border:    rgba(238,230,220,.065);
    --border-2:  rgba(238,230,220,.12);
    --t1:        rgba(238,230,220,.92);
    --t2:        rgba(238,230,220,.55);
    --t3:        rgba(238,230,220,.2);
  }

  /* Subtle warm grain overlay — the paper foundation */
  .ds-root::before {
    content:'';
    position:fixed; inset:0; pointer-events:none; z-index:9999;
    background-image:url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)' opacity='1'/%3E%3C/svg%3E");
    background-size:160px 160px;
    opacity:.022; mix-blend-mode:overlay;
  }

  /* ─── TOP BAR ───────────────────────────────────────────── */
  .topbar {
    height:50px;
    background:rgba(11,9,9,.97);
    backdrop-filter:blur(28px) saturate(1.5);
    border-bottom:1px solid var(--border);
    display:flex; align-items:center;
    padding:0 14px; gap:8px;
    flex-shrink:0; position:relative; z-index:100;
    /* Soft rosy ink-line at top edge */
    box-shadow:inset 0 1px 0 rgba(232,65,90,.14), 0 1px 0 rgba(0,0,0,.4);
  }

  .topbar-divider {
    width:1px; height:20px;
    background:rgba(238,230,220,.07); flex-shrink:0;
  }

  /* Brand */
  .brand { display:flex; align-items:center; gap:8px; user-select:none; flex-shrink:0 }
  .brand-icon {
    width:28px; height:28px; border-radius:8px;
    background:linear-gradient(135deg,#E8415A,#C8344E);
    display:flex; align-items:center; justify-content:center;
    font-size:13px;
    box-shadow:0 0 16px rgba(232,65,90,.45), 0 2px 6px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.18);
  }
  .brand-name {
    font-size:11.5px; font-weight:800; color:rgba(238,230,220,.9);
    letter-spacing:.14em;
  }
  .brand-sub {
    font-size:9.5px; color:rgba(238,230,220,.16); margin-top:1px; letter-spacing:.06em;
  }

  /* Icon buttons */
  .icon-btn {
    width:30px; height:30px; border-radius:7px;
    border:none; cursor:pointer;
    background:transparent; color:rgba(238,230,220,.4);
    font-size:16px;
    display:flex; align-items:center; justify-content:center;
    transition:background .15s, color .15s, transform .15s;
  }
  .icon-btn:hover { background:rgba(238,230,220,.07); color:rgba(238,230,220,.82); transform:translateY(-1px) }
  .icon-btn-disabled { cursor:not-allowed!important; color:rgba(238,230,220,.14)!important; transform:none!important }

  /* Device switcher */
  .device-switcher {
    display:flex; gap:2px;
    background:rgba(238,230,220,.04);
    border:1px solid var(--border);
    border-radius:9px; padding:3px;
  }
  .device-btn {
    width:30px; height:24px; border-radius:6px;
    border:none; cursor:pointer; font-size:13px;
    display:flex; align-items:center; justify-content:center;
    background:transparent; color:rgba(238,230,220,.28);
    transition:all .15s;
  }
  .device-btn:hover { background:rgba(238,230,220,.07); color:rgba(238,230,220,.7) }
  .device-btn-active {
    background:linear-gradient(135deg,#E8415A,#C8344E)!important;
    color:white!important;
    box-shadow:0 2px 10px rgba(232,65,90,.38);
  }

  /* Publish */
  .btn-publish {
    height:32px; padding:0 18px; border-radius:8px; border:none;
    cursor:pointer; font-size:12px; font-weight:700; letter-spacing:.05em;
    background:linear-gradient(135deg,#E8415A,#C8344E);
    color:white; font-family:inherit;
    box-shadow:0 2px 14px rgba(232,65,90,.4), 0 0 0 1px rgba(232,65,90,.18), inset 0 1px 0 rgba(255,255,255,.16);
    transition:all .2s;
  }
  .btn-publish:hover:not(:disabled) {
    transform:translateY(-1px);
    box-shadow:0 6px 22px rgba(232,65,90,.54), 0 0 0 1px rgba(232,65,90,.3);
  }
  .btn-publish:disabled { opacity:.6; cursor:not-allowed; transform:none!important }
  .btn-publish-saved  { background:linear-gradient(135deg,#22c55e,#16a34a)!important; box-shadow:0 2px 14px rgba(34,197,94,.32)!important }
  .btn-publish-error  { background:linear-gradient(135deg,#ef4444,#dc2626)!important; box-shadow:0 2px 14px rgba(239,68,68,.32)!important }
  .btn-publish-saving { opacity:.7 }

  /* Live link */
  .topbar-live {
    display:flex; align-items:center; gap:5px;
    height:32px; padding:0 13px;
    border-radius:8px; border:1px solid var(--border);
    color:var(--t3); font-size:11.5px; font-weight:600;
    text-decoration:none; background:transparent; flex-shrink:0;
    transition:all .15s; letter-spacing:.03em;
  }
  .topbar-live:hover { border-color:var(--border-2); color:var(--t2); background:rgba(238,230,220,.04) }

  /* Unsaved */
  .unsaved-dot {
    width:7px; height:7px; border-radius:50%;
    background:#E8415A; flex-shrink:0;
    animation:unsavedBeat 2.2s ease-in-out infinite;
    box-shadow:0 0 7px rgba(232,65,90,.65);
  }

  /* Cmd trigger */
  .cmd-trigger {
    display:flex; align-items:center; gap:7px;
    height:30px; padding:0 11px;
    border-radius:7px; border:1px solid var(--border);
    background:rgba(238,230,220,.025);
    color:var(--t3); font-size:11.5px;
    cursor:pointer; font-family:inherit;
    transition:all .15s; white-space:nowrap; letter-spacing:.02em;
  }
  .cmd-trigger:hover { border-color:var(--border-2); color:var(--t2); background:rgba(238,230,220,.055) }
  .cmd-trigger kbd {
    background:rgba(238,230,220,.07); border:1px solid rgba(238,230,220,.1);
    border-radius:4px; padding:1px 5px; font-size:10px;
    font-family:inherit; color:rgba(238,230,220,.32);
  }

  /* ─── COMMAND PALETTE ──────────────────────────────────── */
  .cmd-overlay {
    position:fixed; inset:0; z-index:2000;
    background:rgba(0,0,0,.72); backdrop-filter:blur(20px) saturate(1.3);
    display:flex; align-items:flex-start; justify-content:center;
    padding-top:14vh; animation:fadeUp .15s ease;
  }
  .cmd-panel {
    width:560px; max-width:92vw;
    background:rgba(14,10,9,.98);
    border:1px solid rgba(238,230,220,.13);
    border-radius:18px;
    box-shadow:0 48px 100px rgba(0,0,0,.82), 0 0 0 1px rgba(238,230,220,.04), 0 0 60px rgba(232,65,90,.07);
    overflow:hidden; animation:scaleIn .18s cubic-bezier(.22,1,.36,1);
  }
  .cmd-search-row {
    display:flex; align-items:center; gap:10px;
    padding:0 16px; height:56px;
    border-bottom:1px solid rgba(238,230,220,.07);
  }
  .cmd-search-icon { font-size:19px; color:rgba(238,230,220,.2); flex-shrink:0 }
  .cmd-input {
    flex:1; background:none; border:none; outline:none;
    color:var(--t1); font-size:15px; font-family:inherit; direction:rtl;
  }
  .cmd-input::placeholder { color:rgba(238,230,220,.16) }
  .cmd-esc {
    background:rgba(238,230,220,.07); border:1px solid rgba(238,230,220,.1);
    border-radius:5px; padding:2px 7px; font-size:10.5px;
    font-family:inherit; color:rgba(238,230,220,.26); flex-shrink:0;
  }
  .cmd-results { max-height:340px; overflow-y:auto; padding:6px 0 }
  .cmd-group-label {
    padding:10px 16px 5px;
    font-size:9px; font-weight:700; letter-spacing:.2em;
    color:rgba(238,230,220,.16); text-transform:uppercase;
  }
  .cmd-item {
    display:flex; align-items:center; gap:10px;
    padding:8px 16px; cursor:pointer;
    transition:background .08s; direction:rtl;
  }
  .cmd-item:hover { background:rgba(238,230,220,.04) }
  .cmd-item-active { background:rgba(232,65,90,.1)!important }
  .cmd-item-icon {
    width:28px; height:28px; border-radius:7px;
    background:rgba(238,230,220,.05);
    display:flex; align-items:center; justify-content:center;
    font-size:13px; flex-shrink:0;
  }
  .cmd-item-label { flex:1; font-size:13px; color:rgba(238,230,220,.7) }
  .cmd-shortcut {
    background:rgba(238,230,220,.07); border:1px solid rgba(238,230,220,.1);
    border-radius:4px; padding:2px 7px; font-size:10px;
    font-family:inherit; color:rgba(238,230,220,.28);
  }
  .cmd-empty { padding:32px; text-align:center; color:rgba(238,230,220,.18); font-size:13px }
  .cmd-footer {
    display:flex; align-items:center; gap:16px;
    padding:9px 16px;
    border-top:1px solid rgba(238,230,220,.06); direction:rtl;
  }
  .cmd-footer span { display:flex; align-items:center; gap:5px; font-size:11px; color:rgba(238,230,220,.18) }
  .cmd-footer kbd {
    background:rgba(238,230,220,.07); border:1px solid rgba(238,230,220,.09);
    border-radius:4px; padding:1px 5px; font-size:10px;
    font-family:inherit; color:rgba(238,230,220,.28);
  }

  /* ─── TOAST ─────────────────────────────────────────────── */
  .toast {
    position:fixed; bottom:22px; left:22px;
    padding:11px 18px; border-radius:11px;
    font-size:13px; font-weight:600; z-index:1999;
    animation:toastSlide .25s cubic-bezier(.22,1,.36,1);
    box-shadow:0 14px 44px rgba(0,0,0,.5);
    backdrop-filter:blur(18px);
  }
  .toast-success { background:rgba(34,197,94,.12);  border:1px solid rgba(34,197,94,.2);  color:#4ade80 }
  .toast-error   { background:rgba(239,68,68,.12);   border:1px solid rgba(239,68,68,.2);   color:#f87171 }
  .toast-info    { background:rgba(232,65,90,.12);   border:1px solid rgba(232,65,90,.2);   color:#fb7185 }

  /* ─── MAIN AREA ─────────────────────────────────────────── */
  .main-area { display:flex; flex:1; overflow:hidden }

  /* ─── LAYERS SIDEBAR ────────────────────────────────────── */
  .sidebar-layers {
    width:240px; flex-shrink:0;
    background:var(--bg-s);
    border-left:1px solid var(--border);
    display:flex; flex-direction:column;
  }
  .sidebar-header {
    padding:15px 15px 12px;
    font-size:8.5px; font-weight:700; letter-spacing:.22em;
    color:var(--t3); text-transform:uppercase;
    user-select:none;
    border-bottom:1px solid rgba(238,230,220,.045);
    background:linear-gradient(to bottom, rgba(232,65,90,.025) 0%, transparent 100%);
  }
  .sidebar-scroll { flex:1; overflow-y:auto }
  .sidebar-sep { margin:5px 15px; height:1px; background:rgba(238,230,220,.05) }
  .sidebar-footer {
    padding:10px 15px 14px;
    border-top:1px solid rgba(238,230,220,.045);
    display:flex; flex-direction:column; gap:5px;
    background:rgba(0,0,0,.18);
  }
  .shortcut-row {
    display:flex; align-items:center; gap:8px;
    font-size:11px; color:rgba(238,230,220,.18);
  }
  .shortcut-kbd {
    background:rgba(238,230,220,.06); border:1px solid rgba(238,230,220,.08);
    border-radius:4px; padding:1px 5px; font-size:9.5px;
    font-family:inherit; color:rgba(238,230,220,.24);
  }

  /* ─── LAYER ROWS ────────────────────────────────────────── */
  .layer-row {
    display:flex; align-items:center; gap:8px;
    padding:8px 15px; cursor:pointer; user-select:none;
    border-right:2px solid transparent;
    transition:background .15s, border-color .2s;
    position:relative; overflow:hidden;
  }
  /* Ink-sweep: expands from right on active */
  .layer-row::after {
    content:'';
    position:absolute; inset:0; right:2px;
    background:linear-gradient(to left, rgba(232,65,90,.13) 0%, rgba(232,65,90,.04) 55%, transparent 100%);
    opacity:0; transition:opacity .32s cubic-bezier(.22,1,.36,1);
    pointer-events:none;
  }
  .layer-row:hover { background:rgba(238,230,220,.036) }
  .layer-row-active { border-right-color:var(--lc,#E8415A)!important }
  .layer-row-active::after { opacity:1 }

  .layer-icon {
    font-size:12px; color:rgba(238,230,220,.28);
    flex-shrink:0; width:16px; text-align:center;
    transition:color .16s; position:relative; z-index:1;
  }
  .layer-label {
    font-size:13px; font-weight:600; flex:1;
    color:rgba(238,230,220,.52);
    transition:color .14s; letter-spacing:.01em;
    position:relative; z-index:1;
  }
  .layer-row-active .layer-label { color:var(--t1) }
  .layer-chevron {
    font-size:15px; color:rgba(238,230,220,.16);
    display:inline-block; position:relative; z-index:1;
    transition:transform .24s cubic-bezier(.22,1,.36,1), color .14s;
  }
  .layer-chevron-open { transform:rotate(90deg) }

  /* ─── LAYER FIELDS ──────────────────────────────────────── */
  .layer-fields {
    max-height:0; overflow:hidden;
    transition:max-height .28s cubic-bezier(.22,1,.36,1), opacity .22s;
    opacity:0;
  }
  .layer-fields-open { max-height:400px; opacity:1 }

  .field-row {
    display:flex; align-items:center; gap:8px;
    padding:6px 15px 6px 15px; padding-right:38px;
    cursor:pointer; user-select:none;
    border-right:2px solid transparent;
    transition:background .1s;
  }
  .field-row:hover { background:rgba(238,230,220,.03) }
  .field-row-active {
    background:rgba(232,65,90,.06)!important;
    border-right-color:rgba(232,65,90,.38)!important;
  }
  .field-dot {
    width:5px; height:5px; border-radius:2px;
    background:rgba(238,230,220,.14); flex-shrink:0;
    transition:background .15s;
  }
  .field-label {
    font-size:12px; color:rgba(238,230,220,.32); font-weight:500;
    overflow:hidden; text-overflow:ellipsis; white-space:nowrap;
    transition:color .12s; letter-spacing:.01em;
  }
  .field-row-active .field-label { color:rgba(238,230,220,.72); font-weight:600 }

  .manage-link {
    font-size:11px; color:var(--accent); text-decoration:none;
    font-weight:600; opacity:.65; transition:opacity .15s; letter-spacing:.02em;
  }
  .manage-link:hover { opacity:1 }

  /* ─── CANVAS ─────────────────────────────────────────────── */
  .canvas-area {
    flex:1; display:flex; align-items:center; justify-content:center;
    background:#0B0909; position:relative; overflow:hidden;
  }

  /* Fine dot grid — warm toned */
  .canvas-grid {
    position:absolute; inset:0; pointer-events:none;
    opacity:.034;
    background-image:radial-gradient(circle, rgba(238,230,220,.9) 0.7px, transparent 0.7px);
    background-size:28px 28px;
  }

  /* Edge vignette for depth */
  .canvas-area::after {
    content:'';
    position:absolute; inset:0; pointer-events:none; z-index:1;
    background:radial-gradient(ellipse at center, transparent 40%, rgba(11,9,9,.72) 100%);
  }

  /* Warm atmospheric glow */
  .canvas-glow {
    position:absolute; top:50%; left:50%;
    width:820px; height:620px; border-radius:50%;
    background:radial-gradient(ellipse at center,
      rgba(232,65,90,.06) 0%,
      rgba(180,70,55,.025) 40%,
      transparent 68%);
    pointer-events:none;
    animation:glowFloat 11s ease-in-out infinite;
    transform:translate(-50%,-50%);
    z-index:0;
  }

  /* ─── DEVICE FRAME ───────────────────────────────────────── */
  .device-frame {
    border-radius:10px; overflow:hidden; background:#130F0E;
    box-shadow:
      0 64px 160px rgba(0,0,0,.88),
      0 0 0 1px rgba(238,230,220,.07),
      0 0 80px rgba(232,65,90,.04);
    position:relative; z-index:2;
  }
  .device-frame-tablet { border-radius:24px }
  .device-frame-mobile { border-radius:48px }

  .device-bar { background:#130F0E; display:flex; align-items:center }
  .desktop-bar { height:36px; padding:0 14px; gap:7px; border-bottom:1px solid rgba(238,230,220,.05) }
  .url-bar {
    flex:1; height:21px; background:rgba(238,230,220,.04);
    border-radius:6px; margin:0 18px;
    display:flex; align-items:center; justify-content:center;
    font-size:10px; color:rgba(238,230,220,.18); letter-spacing:.04em;
  }
  .tablet-top  { height:30px; justify-content:center; border-bottom:1px solid rgba(238,230,220,.05) }
  .tablet-camera { width:7px; height:7px; border-radius:50%; background:rgba(238,230,220,.11) }
  .mobile-top  { height:46px; justify-content:center; border-bottom:1px solid rgba(238,230,220,.05) }
  .mobile-pill {
    width:112px; height:28px; border-radius:14px;
    background:rgba(238,230,220,.06);
    display:flex; align-items:center; justify-content:center;
  }
  .mobile-camera { width:9px; height:9px; border-radius:50%; background:rgba(238,230,220,.14) }
  .tablet-bottom { height:28px; justify-content:center; border-top:1px solid rgba(238,230,220,.05) }
  .mobile-bottom { height:32px; justify-content:center; border-top:1px solid rgba(238,230,220,.05) }
  .home-bar        { width:34px; height:5px;  border-radius:3px; background:rgba(238,230,220,.16) }
  .home-bar-mobile { width:100px; height:4px; border-radius:2px; background:rgba(238,230,220,.2) }

  .device-label {
    position:absolute; bottom:-28px; left:50%; transform:translateX(-50%);
    font-size:10px; color:rgba(238,230,220,.14); letter-spacing:.09em; white-space:nowrap;
  }

  .iframe-loader {
    position:absolute; inset:0; background:#FFF8F2;
    display:flex; flex-direction:column; align-items:center; justify-content:center; gap:14px;
  }
  .loader-spinner { font-size:44px; animation:spin 1.4s linear infinite }
  .loader-text    { font-size:14px; color:#C4A898; font-weight:500; letter-spacing:.04em }

  .click-hint {
    position:absolute; bottom:22px; left:50%; transform:translateX(-50%);
    background:rgba(14,10,9,.93); backdrop-filter:blur(18px);
    border:1px solid rgba(232,65,90,.16); border-radius:24px;
    padding:8px 22px; font-size:12px; color:rgba(238,230,220,.42);
    white-space:nowrap; font-weight:500; letter-spacing:.04em;
    animation:fadeUp .3s ease;
    box-shadow:0 10px 32px rgba(0,0,0,.48);
    z-index:10;
  }

  /* ─── PROPERTIES PANEL ──────────────────────────────────── */
  .sidebar-props {
    width:280px; flex-shrink:0;
    background:var(--bg-s);
    border-right:1px solid var(--border);
    display:flex; flex-direction:column; overflow:hidden;
  }

  .panel-header {
    display:flex; align-items:center; gap:8px;
    padding:14px 15px 12px;
    border-bottom:1px solid rgba(238,230,220,.06); flex-shrink:0;
    background:linear-gradient(to bottom, rgba(232,65,90,.022) 0%, transparent 100%);
  }
  .ph-icon  { font-size:13px; color:rgba(238,230,220,.26) }
  .ph-badge {
    width:8px; height:8px; border-radius:3px; background:var(--accent); flex-shrink:0;
    box-shadow:0 0 8px rgba(232,65,90,.5);
  }
  .ph-title { font-size:12.5px; font-weight:700; color:rgba(238,230,220,.7); flex:1; letter-spacing:.02em }
  .ph-layer-tag {
    font-size:10px; color:rgba(238,230,220,.2);
    background:rgba(238,230,220,.05); border-radius:4px;
    padding:2px 7px; font-weight:500; letter-spacing:.03em;
  }

  .close-btn {
    width:24px; height:24px; border-radius:6px; border:none; cursor:pointer;
    background:rgba(238,230,220,.05); color:rgba(238,230,220,.28);
    font-size:18px; display:flex; align-items:center; justify-content:center;
    line-height:1; font-family:inherit; transition:all .15s;
  }
  .close-btn:hover { background:rgba(238,230,220,.1); color:rgba(238,230,220,.62) }

  .panel-scroll { flex:1; overflow-y:auto; padding:14px; display:flex; flex-direction:column; gap:16px }

  /* ─── EMPTY STATE ───────────────────────────────────────── */
  .empty-body {
    flex:1; display:flex; flex-direction:column;
    align-items:center; justify-content:center;
    padding:28px 20px; gap:10px; text-align:center;
  }
  .empty-icon-wrap {
    width:52px; height:52px; border-radius:16px;
    background:rgba(232,65,90,.07); border:1px solid rgba(232,65,90,.11);
    display:flex; align-items:center; justify-content:center;
    font-size:22px; color:rgba(232,65,90,.42); margin-bottom:4px;
    box-shadow:0 0 28px rgba(232,65,90,.08);
    animation:inkDrop .5s cubic-bezier(.22,1,.36,1) both;
  }
  .empty-title { font-size:13.5px; font-weight:700; color:rgba(238,230,220,.42); letter-spacing:.02em }
  .empty-desc  { font-size:12px; color:rgba(238,230,220,.18); line-height:1.78; max-width:175px }

  /* ─── INPUTS ─────────────────────────────────────────────── */
  .section-label {
    font-size:9px; font-weight:700; letter-spacing:.18em;
    color:rgba(238,230,220,.18); text-transform:uppercase; margin-bottom:8px;
  }
  .field-input, .field-textarea {
    width:100%;
    background:rgba(238,230,220,.04);
    border:1.5px solid rgba(238,230,220,.08);
    border-radius:9px; padding:10px 12px;
    font-size:13.5px; color:var(--t1); font-family:inherit;
    direction:rtl; outline:none; line-height:1.65;
    transition:border-color .2s, box-shadow .2s, background .2s;
  }
  .field-textarea { resize:vertical; min-height:90px }
  .field-input:focus, .field-textarea:focus {
    border-color:rgba(232,65,90,.5);
    background:rgba(238,230,220,.06);
    box-shadow:0 0 0 3px rgba(232,65,90,.09), 0 0 18px rgba(232,65,90,.07);
  }
  .field-input::placeholder, .field-textarea::placeholder { color:rgba(238,230,220,.12) }
  .field-hint  { font-size:11px; color:rgba(238,230,220,.16); margin-top:5px; direction:rtl; letter-spacing:.02em }
  .char-count  { font-size:11px; color:rgba(238,230,220,.15); margin-top:5px; direction:rtl }

  .live-indicator {
    display:flex; align-items:center; gap:8px;
    padding:9px 12px; border-radius:9px;
    background:rgba(232,65,90,.06); border:1px solid rgba(232,65,90,.12);
    font-size:12px; color:rgba(232,65,90,.72); direction:rtl; letter-spacing:.02em;
  }
  .live-dot {
    width:7px; height:7px; border-radius:50%; background:#E8415A;
    flex-shrink:0; animation:livePulse 1.6s ease-in-out infinite;
    box-shadow:0 0 8px rgba(232,65,90,.5);
  }

  .info-chip {
    background:rgba(238,230,220,.03); border:1px solid rgba(238,230,220,.07);
    border-radius:9px; padding:9px 11px;
  }
  .info-chip-label { font-size:10px; color:rgba(238,230,220,.2); margin-bottom:3px; letter-spacing:.05em }
  .info-chip-value { font-size:12px; color:rgba(238,230,220,.52); font-weight:600 }

  .shortcut-field-btn, .related-btn {
    display:flex; align-items:center; gap:9px; width:100%;
    padding:8px 11px; border-radius:8px;
    border:1px solid rgba(238,230,220,.055);
    background:rgba(238,230,220,.025);
    cursor:pointer; margin-bottom:4px;
    font-family:inherit; direction:rtl;
    transition:all .15s;
  }
  .shortcut-field-btn:hover, .related-btn:hover {
    background:rgba(238,230,220,.055); border-color:rgba(238,230,220,.09);
  }
  .shortcut-field-btn span, .related-btn span {
    font-size:12.5px; color:rgba(238,230,220,.4); font-weight:500;
  }
  .field-dot-sm {
    width:6px; height:6px; border-radius:2px;
    background:rgba(232,65,90,.38); flex-shrink:0;
  }
`
