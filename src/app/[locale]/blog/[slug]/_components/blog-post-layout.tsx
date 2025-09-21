import { ProfileAvatar } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { TableOfContents } from '@/components/ui/table-of-contents'
import { generateStructuredData } from '@/lib/metadata'
import type { PostMetadata } from '@/utils/get-posts'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Linkedin,
  Twitter,
  User,
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

interface BlogPostLayoutProps {
  metadata: PostMetadata
  children: React.ReactNode
  slug: string
}

const categorizePost = (post: PostMetadata): string => {
  const title = post.title.toLowerCase()

  if (
    title.includes('leetcode') ||
    title.includes('algorithm') ||
    title.includes('big o')
  ) {
    return 'Algoritmos'
  }
  if (
    title.includes('career') ||
    title.includes('job') ||
    title.includes('emprego') ||
    title.includes('carreira')
  ) {
    return 'Carreira'
  }
  if (
    title.includes('system') ||
    title.includes('design') ||
    title.includes('architecture')
  ) {
    return 'System Design'
  }
  if (
    title.includes('remote') ||
    title.includes('europa') ||
    title.includes('italy') ||
    title.includes('internacional')
  ) {
    return 'Trabalho Remoto'
  }
  if (
    title.includes('produtividade') ||
    title.includes('setup') ||
    title.includes('productivity')
  ) {
    return 'Produtividade'
  }
  return 'Reflexões'
}

// Função para formatar data
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function BlogPostLayout({
  metadata,
  children,
  slug,
}: BlogPostLayoutProps) {
  const locale = useLocale()
  const category = categorizePost(metadata)
  const formattedDate = formatDate(metadata.date)

  // Generate article structured data
  const articleStructuredData = generateStructuredData('Article', {
    headline: metadata.title,
    description: metadata.description,
    datePublished: metadata.date,
    dateModified: metadata.lastModified || metadata.date,
    url: `https://augustogalego.com/${locale === 'pt' ? '' : 'en/'}blog/${slug}`,
    image: metadata.image || 'https://augustogalego.com/og-image.jpg',
    articleSection: category,
    wordCount: metadata.readTime ? metadata.readTime * 250 : undefined, // Estimate 250 words per minute
    inLanguage: locale === 'pt' ? 'pt-BR' : 'en-US',
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe static JSON-LD structured data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <ScrollProgress />
      {/* Header with connected borders */}
      <div className="max-w-6xl mx-auto border-x-2 border-dotted border-border/40">
        <div className="px-8 py-6 border-b border-dotted border-border/40">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            asChild={true}
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o blog
            </Link>
          </Button>
        </div>

        {/* Post Header */}
        <div className="px-8 pt-12 pb-8 border-b border-dotted border-border/40">
          <div className="max-w-4xl space-y-8">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary" className="font-medium">
                {category}
              </Badge>
              <span className="text-muted-foreground">{formattedDate}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">9 min de leitura</span>
            </div>

            <div>
              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                {metadata.title}
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {metadata.description}
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4">
              <ProfileAvatar size="md" />
              <div>
                <div className="font-semibold text-foreground">
                  Augusto Galego
                </div>
                <div className="text-sm text-muted-foreground">
                  Engineering Lead
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] min-h-screen">
          {/* Main Content */}
          <div className="px-8 py-12 border-r border-dotted border-border/40">
            <div className="max-w-3xl">
              <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-muted prose-pre:border prose-pre:border-border/40">
                {children}
              </article>

              {/* Post Footer */}
              <div className="mt-16 pt-8 border-t border-dotted border-border/40 space-y-8">
                {/* Share */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    Compartilhar este artigo
                  </h3>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="px-8 py-12 bg-muted/20">
            <div className="sticky top-8">
              <TableOfContents />
            </div>
          </div>
        </div>

        {/* Final CTA Card */}
        <div className="px-8 py-12 border-t border-dotted border-border/40 bg-muted/10">
          <Card className="border-border/40 shadow-none">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-foreground">
                    Pronto para acelerar sua carreira em tech?
                  </h2>
                  <p className="text-muted-foreground">
                    Junte-se a mais de 103K+ desenvolvedores que acompanham meu
                    conteúdo sobre algoritmos, estruturas de dados e carreira
                    internacional.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild={true}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <Link href="/courses">
                      <BookOpen className="h-4 w-4" />
                      Ver meus cursos
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild={true}>
                    <Link href="/blog">Mais artigos</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
