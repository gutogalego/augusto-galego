import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://augustogalego.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning={true}>
      <body>{children}</body>
    </html>
  )
}
