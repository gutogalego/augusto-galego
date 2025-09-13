import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import type { PostMetadata } from '@/utils/getPosts'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  Copy,
  Linkedin,
  Share2,
  Twitter,
} from 'lucide-react'
import Link from 'next/link'

interface BlogPostLayoutProps {
  metadata: PostMetadata
  children: React.ReactNode
}

// Função para categorizar posts baseado no título/conteúdo
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

// Função para estimar tempo de leitura
const estimateReadTime = (post: PostMetadata): string => {
  const wordCount = `${post.title} ${post.description}`.split(' ').length
  const readTime = Math.max(5, Math.ceil((wordCount / 200) * 15)) // Estimativa mais generosa para posts completos
  return `${readTime} min`
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

export function BlogPostLayout({ metadata, children }: BlogPostLayoutProps) {
  const category = categorizePost(metadata)
  const readTime = estimateReadTime(metadata)
  const formattedDate = formatDate(metadata.date)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild={true}>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar ao Blog
                </Link>
              </Button>
            </div>

            {/* Post Header */}
            <div className="space-y-6">
              {/* Category and Meta */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Badge variant="outline">{category}</Badge>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{readTime} de leitura</span>
                </div>
              </div>

              {/* Title and Description */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
                  {metadata.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {metadata.description}
                </p>
              </div>

              {/* Author and Share */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                    G
                  </div>
                  <div>
                    <div className="font-medium">Augusto Galego</div>
                    <div className="text-sm text-muted-foreground">
                      Papai do LeetCode
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border">
                {children}
              </article>

              {/* Post Footer */}
              <div className="mt-12 pt-8 border-t">
                <div className="space-y-6">
                  {/* Share Buttons */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Compartilhe este artigo</h3>
                    <div className="flex space-x-3">
                      <Button variant="outline" size="sm">
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm">
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Link
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Author Bio */}
                  <Card className="tech-card">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl flex-shrink-0">
                          G
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-lg">Augusto Galego</h4>
                          <p className="text-muted-foreground text-sm">
                            CTO, Backend Engineer e Educador. Conhecido como
                            "Papai do LeetCode", ajudo desenvolvedores a
                            crescerem em suas carreiras através de conteúdo
                            sobre algoritmos, estruturas de dados e carreira
                            internacional.
                          </p>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild={true}>
                              <Link href="/about">Sobre mim</Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild={true}>
                              <Link href="/courses">Meus Cursos</Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Table of Contents */}
                <Card className="tech-card">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Neste artigo
                    </h4>
                    <div className="text-sm text-muted-foreground">
                      <p>
                        Índice será gerado automaticamente baseado nos
                        cabeçalhos do artigo.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Posts */}
                <Card className="tech-card">
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Artigos Relacionados</h4>
                    <div className="space-y-3">
                      <div className="text-sm">
                        <Link
                          href="/blog"
                          className="text-primary hover:underline"
                        >
                          Ver todos os artigos →
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter CTA */}
                <Card className="tech-card">
                  <CardContent className="p-4 text-center space-y-3">
                    <h4 className="font-semibold">Não perca nenhum artigo</h4>
                    <p className="text-sm text-muted-foreground">
                      Receba os novos posts direto no seu email
                    </p>
                    <Button size="sm" className="w-full">
                      Inscrever-se
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
