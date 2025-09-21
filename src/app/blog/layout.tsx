import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Artigos sobre algoritmos, estruturas de dados, carreira em tech e trabalho remoto internacional. Insights de quem saiu do Brasil e chegou ao topo na Europa.',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
