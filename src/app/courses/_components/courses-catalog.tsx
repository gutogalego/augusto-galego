import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CoursesCatalog() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <Card className="tech-card">
          <CardHeader>
            <CardTitle>Catálogo de Cursos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Em desenvolvimento... Em breve você terá acesso ao catálogo
              completo de cursos.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
