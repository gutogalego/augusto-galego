import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Slurp',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Googlebot-Video',
        allow: '/',
      },
      // Uncomment below to block AI training crawlers if desired
      // {
      //   userAgent: 'GPTBot',
      //   disallow: '/',
      // },
      // {
      //   userAgent: 'ChatGPT-User',
      //   disallow: '/',
      // },
      // {
      //   userAgent: 'CCBot',
      //   disallow: '/',
      // },
      // {
      //   userAgent: 'anthropic-ai',
      //   disallow: '/',
      // },
      // {
      //   userAgent: 'Claude-Web',
      //   disallow: '/',
      // },
    ],
    sitemap: 'https://augustogalego.com/sitemap.xml',
    host: 'https://augustogalego.com',
  }
}
