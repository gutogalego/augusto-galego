'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Link } from '@/lib/navigation'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import { useEffect } from 'react'

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="tech-card max-w-2xl mx-auto">
          <CardContent className="p-12 text-center space-y-8">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
                <AlertTriangle className="h-10 w-10 text-destructive" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">Algo deu errado!</h1>
              <p className="text-lg text-muted-foreground">
                Ocorreu um erro inesperado. Não se preocupe, nossa equipe foi
                notificada.
              </p>

              {/* Error Details (only in development) */}
              {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 p-4 bg-muted rounded-lg text-left">
                  <p className="text-sm font-mono text-destructive">
                    {error.message}
                  </p>
                  {error.digest && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset} className="group">
                <RefreshCw className="mr-2 h-4 w-4 group-hover:rotate-180 transition-transform duration-300" />
                Tentar Novamente
              </Button>

              <Button variant="outline" asChild={true}>
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Voltar ao Início
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="pt-8 border-t-2 text-sm text-muted-foreground">
              <p>
                Se o problema persistir, entre em contato em{' '}
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
