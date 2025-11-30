import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ContactInfo() {
  return (
    <Card className="tech-card">
      <CardHeader>
        <CardTitle>Informações de Contato</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Em desenvolvimento... Em breve você terá todas as informações de
          contato.
        </p>
      </CardContent>
    </Card>
  )
}
