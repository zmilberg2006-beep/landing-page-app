import type { Metadata } from 'next'

const SITE_URL = 'https://fancy-axolotl-36bbc2.netlify.app'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'lalag & more | סדנאות אפייה בקריות — זהבה מילברג',
    template: '%s | lalag & more',
  },
  description:
    'סדנאות אפייה מקצועיות בקריות בהנחיית זהבה מילברג, קונדיטורית מוסמכת. חוגי אפייה לילדים, סדנאות לזוגות וקבוצות, אירועי צוות לארגונים. הרשמה דרך WhatsApp.',
  keywords: [
    'סדנאות אפייה',
    'חוגי אפייה לילדים',
    'סדנאות אפייה קריות',
    'קונדיטורית מוסמכת',
    'lalag and more',
    'זהבה מילברג',
    'סדנאות אפייה לארגונים',
    'חוג בישול ילדים קריות',
    'סדנת עוגות',
    'אפייה קריות',
  ],
  authors: [{ name: 'זהבה מילברג' }],
  creator: 'lalag & more',
  publisher: 'lalag & more',
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: SITE_URL,
    siteName: 'lalag & more',
    title: 'lalag & more | סדנאות אפייה בקריות',
    description:
      'חוויה מתוקה שמחברת אנשים — סדנאות אפייה מקצועיות לילדים, זוגות וארגונים בקריות.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'lalag & more — סדנאות אפייה בקריות',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'lalag & more | סדנאות אפייה בקריות',
    description: 'סדנאות אפייה מקצועיות בקריות — לילדים, זוגות וארגונים.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  category: 'education',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': SITE_URL,
    name: 'lalag & more — סדנאות אפייה',
    description:
      'סדנאות אפייה מקצועיות בהנחיית זהבה מילברג, קונדיטורית מוסמכת. חוגים לילדים, סדנאות לזוגות ואירועי צוות.',
    url: SITE_URL,
    telephone: '+972506762220',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'קריות',
      addressRegion: 'חיפה',
      addressCountry: 'IL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 32.8249,
      longitude: 35.0815,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    sameAs: ['https://www.instagram.com/lalag.and.more/'],
    image: `${SITE_URL}/og-image.jpg`,
    priceRange: '$$',
    currenciesAccepted: 'ILS',
    paymentAccepted: 'Cash, Credit Card',
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 32.8249,
        longitude: 35.0815,
      },
      geoRadius: '30000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'סדנאות אפייה',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'חוגי אפייה לילדים',
            description: 'חוגים קבועים לגילאי 6–14 בקריות',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'סדנאות אפייה לזוגות וקבוצות',
            description: 'סדנאות גמישות לאירועים פרטיים',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'סדנאות אפייה לארגונים',
            description: 'פעילות צוות חינוכית ומקצועית',
          },
        },
      ],
    },
  }

  return (
    <html lang="he" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
