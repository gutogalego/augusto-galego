import { Footer, Navigation } from '@/components/layout'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Augusto Galego',
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
    'papai do leetcode',
  ],
  authors: [{ name: 'Augusto Miranda Galego' }],
  creator: 'Augusto Miranda Galego',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://augustogalego.com',
    siteName: 'Augusto Galego',
    title: 'Augusto Galego',
    description:
      'CTO, Backend Engineer e Educador. Especialista em algoritmos, estruturas de dados e carreira em tech.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Augusto Galego',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Augusto Galego',
    description:
      'CTO, Backend Engineer e Educador. Especialista em algoritmos, estruturas de dados e carreira em tech.',
    images: ['/og-image.jpg'],
    creator: '@RealGalego',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Augusto Miranda Galego',
              alternateName: 'Galego',
              description:
                'CTO, Backend Engineer e Educador especializado em algoritmos e estruturas de dados',
              url: 'https://augustogalego.com',
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
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
