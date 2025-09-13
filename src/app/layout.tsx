import { Footer, Navigation } from '@/components/layout'
import { CanvasOverlay } from '@/components/ui/canvas-overlay'
import { DockNavbar } from '@/components/ui/dock-navbar'
import { PageTransition } from '@/components/ui/page-transition'
import type { Metadata } from 'next'
import { Crimson_Text, JetBrains_Mono, Nunito } from 'next/font/google'
import '@/styles/globals.css'

// Sans-serif para UI e navegação
const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

// Serif para títulos e conteúdo editorial
const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

// Monospace para código e detalhes técnicos
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

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
      <body
        className={`${nunito.variable} ${crimsonText.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <CanvasOverlay />
        <div className="flex min-h-screen flex-col relative z-10">
          <Navigation />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <DockNavbar />
        </div>
      </body>
    </html>
  )
}
