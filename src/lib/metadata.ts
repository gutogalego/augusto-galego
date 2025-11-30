import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export interface LocalizedMetadata {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title?: string
    description?: string
    images?: Array<{
      url: string
      width?: number
      height?: number
      alt?: string
    }>
  }
  twitter?: {
    title?: string
    description?: string
    images?: string[]
  }
}

export async function generateLocalizedMetadata(
  locale: string,
  page: string,
  customMetadata?: Partial<LocalizedMetadata>
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const baseUrl = 'https://augustogalego.com'

  // Get base metadata for the page
  const title = customMetadata?.title || t(`${page}.title`)
  const description = customMetadata?.description || t(`${page}.description`)
  const keywords = customMetadata?.keywords || t.raw(`${page}.keywords`) || []

  // Generate proper locale codes
  const ogLocale = locale === 'pt' ? 'pt_BR' : 'en_US'

  // Generate URLs for alternates
  const canonicalUrl =
    locale === 'pt'
      ? `${baseUrl}${page === 'home' ? '' : `/${page}`}`
      : `${baseUrl}/en${page === 'home' ? '' : `/${page}`}`

  const alternateUrls = {
    'pt-BR': `${baseUrl}${page === 'home' ? '' : `/${page}`}`,
    'en-US': `${baseUrl}/en${page === 'home' ? '' : `/${page}`}`,
  }

  // Default OG image
  const defaultOgImage = {
    url: `${baseUrl}/og-image-${locale}.jpg`,
    width: 1200,
    height: 630,
    alt: title,
    type: 'image/jpeg',
  }

  return {
    title,
    description,
    keywords: Array.isArray(keywords) ? keywords : [],
    authors: [{ name: 'Augusto Miranda Galego', url: baseUrl }],
    creator: 'Augusto Miranda Galego',
    publisher: 'Augusto Miranda Galego',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls,
    },
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: canonicalUrl,
      siteName: 'Augusto Galego',
      title: customMetadata?.openGraph?.title || title,
      description: customMetadata?.openGraph?.description || description,
      images: customMetadata?.openGraph?.images || [defaultOgImage],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@RealGalego',
      creator: '@RealGalego',
      title: customMetadata?.twitter?.title || title,
      description: customMetadata?.twitter?.description || description,
      images: customMetadata?.twitter?.images || [defaultOgImage.url],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'technology',
  }
}

export function generateBlogPostMetadata(
  locale: string,
  post: {
    title: string
    description: string
    excerpt?: string
    keywords?: string[]
    tags?: string[]
    date: string
    lastModified?: string
    image?: string
    slug: string
  }
): Metadata {
  const baseUrl = 'https://augustogalego.com'
  const ogLocale = locale === 'pt' ? 'pt_BR' : 'en_US'

  const canonicalUrl =
    locale === 'pt'
      ? `${baseUrl}/blog/${post.slug}`
      : `${baseUrl}/en/blog/${post.slug}`

  const alternateUrls = {
    'pt-BR': `${baseUrl}/blog/${post.slug}`,
    'en-US': `${baseUrl}/en/blog/${post.slug}`,
  }

  const ogImage = post.image
    ? { url: post.image, width: 1200, height: 630, alt: post.title }
    : {
        url: `${baseUrl}/og-image-${locale}.jpg`,
        width: 1200,
        height: 630,
        alt: post.title,
      }

  return {
    title: `${post.title} - Blog`,
    description: post.excerpt || post.description,
    keywords: post.keywords || [],
    authors: [{ name: 'Augusto Miranda Galego', url: baseUrl }],
    creator: 'Augusto Miranda Galego',
    publisher: 'Augusto Miranda Galego',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls,
    },
    openGraph: {
      type: 'article',
      locale: ogLocale,
      url: canonicalUrl,
      siteName: 'Augusto Galego',
      title: post.title,
      description: post.excerpt || post.description,
      images: [ogImage],
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      tags: post.tags || [],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@RealGalego',
      creator: '@RealGalego',
      title: post.title,
      description: post.excerpt || post.description,
      images: [ogImage.url],
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'technology',
  }
}

export function generateStructuredData(
  type: 'Person' | 'Article' | 'WebSite' | 'Organization',
  data: Record<string, unknown>
) {
  const baseUrl = 'https://augustogalego.com'

  const commonContext = {
    '@context': 'https://schema.org',
  }

  switch (type) {
    case 'Person':
      return {
        ...commonContext,
        '@type': 'Person',
        name: 'Augusto Miranda Galego',
        url: baseUrl,
        image: `${baseUrl}/galego-picture-profile.jpg`,
        jobTitle: 'CTO & Backend Engineer',
        worksFor: {
          '@type': 'Organization',
          name: 'Tech Startup',
        },
        knowsAbout: [
          'Software Engineering',
          'Algorithms',
          'Data Structures',
          'System Design',
          'Backend Development',
          'Tech Leadership',
        ],
        sameAs: [
          'https://twitter.com/RealGalego',
          'https://linkedin.com/in/augustogalego',
          'https://youtube.com/@augustogalego',
        ],
        ...data,
      }

    case 'Article':
      return {
        ...commonContext,
        '@type': 'Article',
        author: {
          '@type': 'Person',
          name: 'Augusto Miranda Galego',
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Augusto Galego',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        ...data,
      }

    case 'WebSite':
      return {
        ...commonContext,
        '@type': 'WebSite',
        name: 'Augusto Galego',
        url: baseUrl,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${baseUrl}/blog?search={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
        ...data,
      }

    case 'Organization':
      return {
        ...commonContext,
        '@type': 'Organization',
        name: 'Augusto Galego',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        sameAs: [
          'https://twitter.com/RealGalego',
          'https://linkedin.com/in/augustogalego',
          'https://youtube.com/@augustogalego',
        ],
        ...data,
      }

    default:
      return { ...commonContext, ...data }
  }
}
