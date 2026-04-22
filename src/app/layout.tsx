import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { seoData, personalInfo } from '@/data/portfolio'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// ─── SEO Metadata (seo-optimizer skill applied) ───────────────────────────────
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

  // Open Graph
  openGraph: {
    type: 'profile',
    locale: 'es_MX',
    url: seoData.canonicalUrl,
    siteName: personalInfo.name,
    title: seoData.title,
    description: seoData.description,
    images: [
      {
        url: seoData.ogImage,
        width: 1200,
        height: 630,
        alt: `Foto de perfil de ${personalInfo.name} — ${personalInfo.title}`,
      },
    ],
    firstName: personalInfo.firstName,
    lastName: personalInfo.lastName,
    username: 'IsaiPerez02033',
    gender: 'male',
  },

  // Twitter / X Cards
  twitter: {
    card: 'summary_large_image',
    title: seoData.title,
    description: seoData.description,
    images: [seoData.ogImage],
    creator: '@IsaiAram',
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// ─── JSON-LD Person Schema (seo-optimizer: structured data) ──────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: personalInfo.name,
  url: seoData.canonicalUrl,
  email: personalInfo.email,
  telephone: personalInfo.phone,
  image: `${seoData.canonicalUrl}/profile.jpg`,
  jobTitle: personalInfo.title,
  description: seoData.description,
  nationality: {
    '@type': 'Country',
    name: 'Mexico',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'MX',
    addressLocality: personalInfo.location,
  },
  sameAs: [
    personalInfo.linkedin,
    personalInfo.github,
  ],
  knowsAbout: seoData.keywords,
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
    <html lang="es-MX" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for performance (Core Web Vitals) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-gray-100 font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
