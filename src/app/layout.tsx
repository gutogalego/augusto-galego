import { ClarityAnalytics } from '@/components/clarity'
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
    <>
      <ClarityAnalytics />
      {children}
    </>
  )
}
