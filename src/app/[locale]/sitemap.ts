import { getPosts } from '@/utils/get-posts'
import type { MetadataRoute } from 'next'

export default async function sitemap({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<MetadataRoute.Sitemap> {
  const { locale } = await params
  const baseUrl = 'https://augustogalego.com'
  const posts = await getPosts()

  const staticPages = ['', '/about', '/blog', '/courses', '/setup', '/contact']
  const staticRoutes: MetadataRoute.Sitemap = []

  // Generate static pages for current locale
  for (const page of staticPages) {
    const url =
      locale === 'pt' ? `${baseUrl}${page}` : `${baseUrl}/${locale}${page}`

    let priority = 1
    let changeFrequency: 'yearly' | 'monthly' | 'weekly' | 'daily' = 'monthly'

    // Set priorities and frequencies based on page type
    if (page === '') {
      priority = 1
      changeFrequency = 'monthly'
    } else if (page === '/blog') {
      priority = 0.9
      changeFrequency = 'weekly'
    } else if (page === '/about' || page === '/courses') {
      priority = 0.8
      changeFrequency = 'monthly'
    } else if (page === '/setup') {
      priority = 0.7
      changeFrequency = 'monthly'
    } else if (page === '/contact') {
      priority = 0.6
      changeFrequency = 'monthly'
    }

    staticRoutes.push({
      url,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}${page}`,
          'en-US': `${baseUrl}/en${page}`,
        },
      },
    })
  }

  // Generate blog post routes for current locale
  const blogRoutes: MetadataRoute.Sitemap = []

  for (const post of posts) {
    const url =
      locale === 'pt'
        ? `${baseUrl}/blog/${post.url}`
        : `${baseUrl}/${locale}/blog/${post.url}`

    blogRoutes.push({
      url,
      lastModified: new Date(post.lastModified || post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'pt-BR': `${baseUrl}/blog/${post.url}`,
          'en-US': `${baseUrl}/en/blog/${post.url}`,
        },
      },
    })
  }

  return [...staticRoutes, ...blogRoutes]
}
