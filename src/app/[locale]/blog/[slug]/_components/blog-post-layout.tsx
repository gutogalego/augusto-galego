import { ProfileAvatar } from '@/components/common'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { TableOfContents } from '@/components/ui/table-of-contents'
import {
  categorizePost,
  formatPostDate,
  getLocalizedText,
} from '@/lib/blog-utils'
import { generateStructuredData } from '@/lib/metadata'
import type { PostMetadata } from '@/utils/get-posts'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Linkedin,
  Twitter,
} from 'lucide-react'
import { useLocale } from 'next-intl'
import Link from 'next/link'

interface BlogPostLayoutProps {
  metadata: PostMetadata
  children: React.ReactNode
  slug: string
  locale?: 'en' | 'pt'
}

export function BlogPostLayout({
  metadata,
  children,
  slug,
  locale: propLocale,
}: BlogPostLayoutProps) {
  const hookLocale = useLocale() as 'en' | 'pt'
  const locale = propLocale || hookLocale
  const category = categorizePost(metadata, locale)
  const formattedDate = formatPostDate(metadata.date, locale)

  // Get localized content
  const title = getLocalizedText(metadata.title, locale)
  const description = getLocalizedText(metadata.description, locale)

  // Generate article structured data
  const articleStructuredData = generateStructuredData('Article', {
    headline: title,
    description: description,
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
        <div className="px-8 py-6 border-b-2 border-dotted border-border/40">
          {/* Back Button */}
          <Button
            variant="ghost"
            size="sm"
            asChild={true}
            className="text-muted-foreground hover:text-foreground -ml-2"
          >
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {locale === 'pt' ? 'Voltar para o blog' : 'Back to blog'}
            </Link>
          </Button>
        </div>

        {/* Post Header */}
        <div className="px-8 pt-12 pb-8 border-b-2 border-dotted border-border/40">
          <div className="max-w-4xl space-y-8">
            {/* Meta info */}
            <div className="flex items-center gap-4 text-sm">
              <Badge variant="secondary" className="font-medium">
                {category}
              </Badge>
              <span className="text-muted-foreground">{formattedDate}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {metadata.readTime || 5}{' '}
                {locale === 'pt' ? 'min de leitura' : 'min read'}
              </span>
            </div>

            <div className="space-y-2">
              {/* Title */}
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
                {title}
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
                {description}
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
                  {locale === 'pt' ? 'CTO & Educador' : 'CTO & Educator'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] min-h-screen">
          {/* Main Content */}
          <div className="px-8 py-12 border-r-2 border-dotted border-border/40">
            <div className="max-w-3xl">
              <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-pre:bg-muted prose-pre:border prose-pre:border-border/40">
                {children}
              </article>

              {/* Post Footer */}
              <div className="mt-16 pt-8 border-t-2 border-dotted border-border/40 space-y-8">
                {/* Share */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">
                    {locale === 'pt'
                      ? 'Compartilhar este artigo'
                      : 'Share this article'}
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
        <div className="px-8 py-12 border-t-2 border-dotted border-border/40 bg-muted/10">
          <Card className="border-border/40 shadow-none">
            <CardContent className="p-8 text-center">
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="space-y-3">
                  <h2 className="text-2xl font-bold text-foreground">
                    {locale === 'pt'
                      ? 'Pronto para acelerar sua carreira em tech?'
                      : 'Ready to accelerate your tech career?'}
                  </h2>
                  <p className="text-muted-foreground">
                    {locale === 'pt'
                      ? 'Junte-se a mais de 103K+ desenvolvedores que acompanham meu conteúdo sobre algoritmos, estruturas de dados e carreira internacional.'
                      : 'Join 103K+ developers who follow my content about algorithms, data structures and international tech career.'}
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
                      {locale === 'pt' ? 'Ver meus cursos' : 'View my courses'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild={true}>
                    <Link href="/blog">
                      {locale === 'pt' ? 'Mais artigos' : 'More articles'}
                    </Link>
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
