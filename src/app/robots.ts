import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/private/', '/admin/', '/api/', '/_next/', '/static/'],
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
        crawlDelay: 0,
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Googlebot-Video',
        allow: '/',
        crawlDelay: 0,
      },
      {
        userAgent: 'Applebot',
        allow: '/',
        crawlDelay: 1,
      },
      {
        userAgent: 'WhatsApp',
        allow: '/',
      },
      {
        userAgent: 'Telegrambot',
        allow: '/',
      },
      // Block AI training crawlers (uncomment if desired)
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
      // {
      //   userAgent: 'Bytespider',
      //   disallow: '/',
      // },
    ],
    sitemap: 'https://augustogalego.com/sitemap.xml',
    host: 'https://augustogalego.com',
  }
}
