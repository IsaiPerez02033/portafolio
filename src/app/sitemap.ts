import type { MetadataRoute } from 'next'
import { seoData } from '@/data/portfolio'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seoData.canonicalUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
