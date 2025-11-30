import { Badge } from '@/components/ui/badge'
import { Monitor } from 'lucide-react'

export function SetupHero() {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="outline" className="px-3 py-1">
            <Monitor className="mr-1 h-3 w-3" />
            Setup & Produtividade
          </Badge>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
              Meu <span className="gradient-text">setup</span> de trabalho
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça as ferramentas, configurações e metodologias que uso para
              ser mais produtivo e eficiente no dia a dia.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
