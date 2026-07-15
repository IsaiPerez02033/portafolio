import type { Metadata } from 'next'
import { Instrument_Serif } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import './globals.css'
import { seoData, personalInfo } from '@/data/portfolio'

// Sustitutas libres de PP Neue Montreal y PP Mondwest — ver nota en globals.css.
// Geist viene del paquete oficial (auto-hospedada); next/font/google en Next 14
// todavía no la conoce.
const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-serif',
})

// ─── SEO Metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(seoData.canonicalUrl),
  title: {
    default: seoData.title,
    template: `%s | ${personalInfo.name}`,
  },
  description: seoData.description,
  keywords: seoData.keywords,
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: seoData.canonicalUrl,
  },

  // Open Graph — la imagen la genera src/app/opengraph-image.tsx
  openGraph: {
    type: 'profile',
    locale: 'es_MX',
    url: seoData.canonicalUrl,
    siteName: personalInfo.name,
    title: seoData.title,
    description: seoData.description,
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    username: 'IsaiPerez02033',
  },

  twitter: {
    card: 'summary_large_image',
    title: seoData.title,
    description: seoData.description,
  },
}

// ─── JSON-LD Person Schema ────────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  url: seoData.canonicalUrl,
  email: personalInfo.email,
  telephone: personalInfo.phone,
  image: `${seoData.canonicalUrl}${personalInfo.profileImage}`,
  jobTitle: personalInfo.title,
  description: seoData.description,
  nationality: { '@type': 'Country', name: 'Mexico' },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MX',
    addressLocality: personalInfo.location,
  },
  sameAs: [personalInfo.linkedin, personalInfo.github],
  knowsAbout: seoData.keywords,
  worksFor: {
    '@type': 'Organization',
    name: personalInfo.studio,
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'ESCOM – Instituto Politécnico Nacional',
    url: 'https://www.ipn.mx',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es-MX"
      className={`${GeistSans.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-ink font-sans overflow-x-hidden">{children}</body>
    </html>
  )
}
