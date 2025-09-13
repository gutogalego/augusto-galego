import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function CoursesTestimonials() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="tech-card">
          <CardHeader>
            <CardTitle>Depoimentos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Em desenvolvimento... Em breve você verá depoimentos reais dos
              alunos.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
