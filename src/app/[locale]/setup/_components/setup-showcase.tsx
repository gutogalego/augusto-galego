import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function SetupShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="tech-card">
          <CardHeader>
            <CardTitle>Showcase do Setup</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Em desenvolvimento... Em breve você verá detalhes do meu setup
              completo.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
