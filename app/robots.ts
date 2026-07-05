import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://fancy-axolotl-36bbc2.netlify.app/sitemap.xml',
  }
}
