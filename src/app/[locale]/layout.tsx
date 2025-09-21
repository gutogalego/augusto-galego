import { Footer, Navigation } from '@/components/layout'
import { PageTransition } from '@/components/ui/page-transition'
import {
  generateLocalizedMetadata,
  generateStructuredData,
} from '@/lib/metadata'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import '@/styles/globals.css'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const baseMetadata = await generateLocalizedMetadata(locale, 'home')

  return {
    ...baseMetadata,
    title: {
      default: baseMetadata.title as string,
      template: '%s | Augusto Galego',
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      shortcut: ['/favicon.ico'],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'mask-icon',
          url: '/safari-pinned-tab.svg',
          color: '#000000',
        },
      ],
    },
    manifest: '/site.webmanifest',
    verification: {
      google: 'your-google-verification-code',
    },
  }
}

const locales = ['en', 'pt']

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  const langAttribute = locale === 'pt' ? 'pt-BR' : 'en-US'

  const personStructuredData = generateStructuredData('Person', {
    name: 'Augusto Miranda Galego',
    alternateName: ['Galego', 'Augusto Galego', 'Papai do LeetCode'],
    description:
      locale === 'pt'
        ? 'CTO, Backend Engineer e Educador especialista em algoritmos e estruturas de dados'
        : 'CTO, Backend Engineer and Educator expert in algorithms and data structures',
    nationality: 'Brazilian',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Padua',
      addressCountry: 'IT',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Universidade Federal de Santa Catarina',
    },
    knowsAbout:
      locale === 'pt'
        ? [
            'Algoritmos',
            'Estruturas de Dados',
            'Backend Development',
            'Python',
            'JavaScript',
            'System Design',
            'LeetCode',
            'Carreira em Tecnologia',
            'Entrevistas Técnicas',
            'Programação Competitiva',
          ]
        : [
            'Algorithms',
            'Data Structures',
            'Backend Development',
            'Python',
            'JavaScript',
            'System Design',
            'LeetCode',
            'Tech Career',
            'Technical Interviews',
            'Competitive Programming',
          ],
  })

  const websiteStructuredData = generateStructuredData('WebSite', {
    name: 'Augusto Galego',
    alternateName: 'Galego',
    description:
      locale === 'pt'
        ? 'Site oficial de Augusto Galego - CTO, Backend Engineer e Educador'
        : 'Official website of Augusto Galego - CTO, Backend Engineer and Educator',
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en-US',
  })

  return (
    <html lang={langAttribute} suppressHydrationWarning={true}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe static JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe static JSON-LD structured data
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        {/* DNS prefetch for social media domains */}
        <link rel="dns-prefetch" href="//www.youtube.com" />
        <link rel="dns-prefetch" href="//twitter.com" />
        <link rel="dns-prefetch" href="//www.linkedin.com" />
        <link rel="dns-prefetch" href="//github.com" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-16 bg-background" />}>
              <Navigation />
            </Suspense>
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
