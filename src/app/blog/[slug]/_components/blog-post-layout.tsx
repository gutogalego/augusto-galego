import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TableOfContents } from '@/components/ui/table-of-contents'
import type { PostMetadata } from '@/utils/getPosts'
import { ArrowLeft, Calendar, Clock, Linkedin, Twitter } from 'lucide-react'
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
  const formattedDate = formatDate(metadata.date)

  return (
    <div className="min-h-screen bg-background">
      {/* Header minimalista - Estilo NaN */}
      <div className="border-b border-border/40 content-area mx-4 mt-4 mb-8">
        <div className="container mx-auto px-6 py-6">
          <div className="max-w-6xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Button
                variant="ghost"
                size="sm"
                asChild={true}
                className="text-muted-foreground hover:text-foreground -ml-2"
              >
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Blog
                </Link>
              </Button>
            </div>

            {/* Post Header - Estilo NaN */}
            <div className="space-y-6 max-w-4xl">
              {/* Meta info */}
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="text-subtitle">{category}</span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>

              {/* Title */}
              <h1 className="text-display">{metadata.title}</h1>

              {/* Description */}
              <p className="text-body-large text-muted-foreground max-w-3xl">
                {metadata.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Layout de duas colunas - Estilo NaN */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto content-area p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
            {/* Sidebar - Posicionada à esquerda como no NaN */}
            <div className="order-2 lg:order-1">
              <div className="sticky top-8 space-y-8">
                {/* Table of Contents */}
                <TableOfContents />

                {/* Author info minimalista */}
                <div className="space-y-4 pt-8 border-t border-border/40">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      G
                    </div>
                    <div>
                      <div className="font-medium text-sm">Augusto Galego</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="order-1 lg:order-2">
              <article className="prose-elegant max-w-none">{children}</article>

              {/* Post Footer minimalista */}
              <div className="mt-16 pt-8 border-t border-border/40">
                <div className="space-y-8">
                  {/* Share */}
                  <div className="space-y-4">
                    <div className="text-subtitle">Compartilhar</div>
                    <div className="flex space-x-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground -ml-2"
                      >
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Button>
                    </div>
                  </div>

                  {/* Author Bio expandida */}
                  <div className="space-y-4 pt-8 border-t border-border/40">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                        G
                      </div>
                      <div className="space-y-3">
                        <div className="font-semibold">Augusto Galego</div>
                        <p className="text-body text-muted-foreground">
                          CTO, Backend Engineer e Educador. Ajudo
                          desenvolvedores a crescerem em suas carreiras através
                          de conteúdo sobre algoritmos, estruturas de dados e
                          carreira internacional.
                        </p>
                        <div className="flex space-x-3">
                          <Button variant="outline" size="sm" asChild={true}>
                            <Link href="/about">Sobre mim</Link>
                          </Button>
                          <Button variant="outline" size="sm" asChild={true}>
                            <Link href="/courses">Meus Cursos</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
