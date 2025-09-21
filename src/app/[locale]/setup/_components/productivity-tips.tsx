import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ProductivityTips() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="tech-card">
          <CardHeader>
            <CardTitle>Dicas de Produtividade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Em desenvolvimento... Em breve você terá acesso às minhas melhores
              dicas.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
