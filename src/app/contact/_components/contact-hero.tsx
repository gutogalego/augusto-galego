import { Badge } from '@/components/ui/badge'
import { Mail } from 'lucide-react'

export function ContactHero() {
  return (
    <section className="hero-section">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="outline" className="px-3 py-1">
            <Mail className="mr-1 h-3 w-3" />
            Contato
          </Badge>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight lg:text-6xl">
              Vamos <span className="gradient-text">conversar</span>?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Estou sempre aberto a discussões sobre tecnologia, carreira e
              educação. Entre em contato para mentorias, parcerias ou apenas
              para trocar ideias.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
