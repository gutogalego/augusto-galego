import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, BookOpen, Home, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="tech-card max-w-2xl mx-auto">
          <CardContent className="p-12 text-center space-y-8">
            {/* 404 Illustration */}
            <div className="space-y-4">
              <div className="text-8xl font-bold text-primary/20">404</div>
              <h1 className="text-3xl font-bold">Página não encontrada</h1>
              <p className="text-lg text-muted-foreground">
                Ops! A página que você está procurando não existe ou foi movida.
              </p>
            </div>

            {/* Suggestions */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Que tal tentar uma dessas opções?
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  asChild={true}
                  className="h-auto p-4 flex-col space-y-2"
                >
                  <Link href="/">
                    <Home className="h-6 w-6" />
                    <span className="text-sm">Página Inicial</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  asChild={true}
                  className="h-auto p-4 flex-col space-y-2"
                >
                  <Link href="/blog">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm">Blog</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  asChild={true}
                  className="h-auto p-4 flex-col space-y-2"
                >
                  <Link href="/about">
                    <Search className="h-6 w-6" />
                    <span className="text-sm">Sobre</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-4">
              <Button asChild={true} className="group">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  Voltar ao Início
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="pt-8 border-t text-sm text-muted-foreground">
              <p>
                Se você acredita que isso é um erro, entre em contato comigo em{' '}
                <a
                  href="mailto:algoritmos.galego@gmail.com"
                  className="text-primary hover:underline"
                >
                  algoritmos.galego@gmail.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
