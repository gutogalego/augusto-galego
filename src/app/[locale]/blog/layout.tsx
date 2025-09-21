import { generateLocalizedMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return await generateLocalizedMetadata(locale, 'blog')
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
