import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, BookOpen, Home, Search } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

export default async function NotFound() {
  const t = await getTranslations('notFound')
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="tech-card max-w-2xl mx-auto">
          <CardContent className="p-12 text-center space-y-8">
            {/* 404 Illustration */}
            <div className="space-y-4">
              <div className="text-8xl font-bold text-primary/20">404</div>
              <h1 className="text-3xl font-bold">{t('title')}</h1>
              <p className="text-lg text-muted-foreground">
                {t('description')}
              </p>
            </div>

            {/* Suggestions */}
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t('suggestions')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button
                  variant="outline"
                  asChild={true}
                  className="h-auto p-4 flex-col space-y-2"
                >
                  <Link href="/">
                    <Home className="h-6 w-6" />
                    <span className="text-sm">{t('home')}</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  asChild={true}
                  className="h-auto p-4 flex-col space-y-2"
                >
                  <Link href="/blog">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm">{t('blog')}</span>
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  asChild={true}
                  className="h-auto p-4 flex-col space-y-2"
                >
                  <Link href="/about">
                    <Search className="h-6 w-6" />
                    <span className="text-sm">{t('about')}</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Back Button */}
            <div className="pt-4">
              <Button asChild={true} className="group">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                  {t('backToHome')}
                </Link>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="pt-8 border-t-2 text-sm text-muted-foreground">
              <p>
                {t('contactText')}{' '}
                <a
                  href={`mailto:${t('contactEmail')}`}
                  className="text-primary hover:underline"
                >
                  {t('contactEmail')}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
