import { Card, CardContent } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Card className="tech-card">
        <CardContent className="p-12 text-center space-y-6">
          {/* Loading Spinner */}
          <div className="flex justify-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Carregando...</h2>
            <p className="text-muted-foreground">
              Preparando o conteúdo para você
            </p>
          </div>

          {/* Loading Bar Animation */}
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-loading-bar" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
