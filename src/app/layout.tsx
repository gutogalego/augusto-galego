import { Footer, Navigation } from '@/components/layout'
import { PageTransition } from '@/components/ui/page-transition'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import type { Metadata } from 'next'
import '@/styles/globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://augustogalego.com'),
  title: {
    default: 'Augusto Galego - CTO, Backend Engineer e Educador',
    template: '%s | Augusto Galego',
  },
  description:
    'CTO, Backend Engineer e Educador. Especialista em algoritmos, estruturas de dados e carreira em tech. Aprenda com quem saiu do Brasil e chegou ao topo na Europa.',
  keywords: [
    'algoritmos',
    'estruturas de dados',
    'leetcode',
    'programação',
    'carreira tech',
    'backend',
    'python',
    'javascript',
    'trabalho remoto',
    'augusto galego',
    'leetcode',
    'system design',
    'entrevista técnica',
    'coding interview',
    'programador brasileiro',
    'tech lead',
    'cto',
    'startup',
    'europa',
    'emigração tech',
  ],
  authors: [
    { name: 'Augusto Miranda Galego', url: 'https://augustogalego.com' },
  ],
  creator: 'Augusto Miranda Galego',
  publisher: 'Augusto Miranda Galego',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://augustogalego.com',
    siteName: 'Augusto Galego',
    title: 'Augusto Galego - CTO, Backend Engineer e Educador',
    description:
      'CTO, Backend Engineer e Educador. Especialista em algoritmos, estruturas de dados e carreira em tech. Aprenda com quem saiu do Brasil e chegou ao topo na Europa.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Augusto Galego - CTO, Backend Engineer e Educador',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@RealGalego',
    creator: '@RealGalego',
    title: 'Augusto Galego - CTO, Backend Engineer e Educador',
    description:
      'CTO, Backend Engineer e Educador. Especialista em algoritmos, estruturas de dados e carreira em tech.',
    images: {
      url: '/og-image.jpg',
      alt: 'Augusto Galego - CTO, Backend Engineer e Educador',
    },
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
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://augustogalego.com',
    languages: {
      'pt-BR': 'https://augustogalego.com',
      'en-US': 'https://augustogalego.com/en',
    },
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <head>
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

        {/* Structured Data - Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Augusto Miranda Galego',
              alternateName: ['Galego', 'Augusto Galego', 'Papai do LeetCode'],
              description:
                'CTO, Backend Engineer e Educador especializado em algoritmos e estruturas de dados',
              url: 'https://augustogalego.com',
              image: 'https://augustogalego.com/og-image.jpg',
              sameAs: [
                'https://www.youtube.com/@GutoGalego',
                'https://www.youtube.com/@GutoMonologos',
                'https://twitter.com/RealGalego',
                'https://www.linkedin.com/in/augusto-galego-60a0b1160/',
                'https://github.com/gutogalego',
              ],
              jobTitle: 'CTO',
              worksFor: {
                '@type': 'Organization',
                name: 'Startup Americana',
              },
              alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'Universidade Federal de Santa Catarina',
              },
              knowsAbout: [
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
              ],
              nationality: {
                '@type': 'Country',
                name: 'Brazil',
              },
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'PT',
                addressRegion: 'Europe',
              },
            }),
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Augusto Galego',
              alternateName: 'Galego',
              url: 'https://augustogalego.com',
              description:
                'CTO, Backend Engineer e Educador. Especialista em algoritmos, estruturas de dados e carreira em tech.',
              inLanguage: 'pt-BR',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate:
                    'https://augustogalego.com/blog?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
              publisher: {
                '@type': 'Person',
                name: 'Augusto Miranda Galego',
                url: 'https://augustogalego.com',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
