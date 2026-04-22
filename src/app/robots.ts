import type { MetadataRoute } from 'next'
import { seoData } from '@/data/portfolio'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${seoData.canonicalUrl}/sitemap.xml`,
  }
}
