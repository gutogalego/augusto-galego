'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  ArrowRight,
  CheckCircle,
  Gift,
  Mail,
  Send,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react'
import { useState } from 'react'

const benefits = [
  {
    icon: Zap,
    title: 'Conteúdo Exclusivo',
    description: 'Insights que não compartilho em lugar nenhum mais',
  },
  {
    icon: Gift,
    title: 'Recursos Gratuitos',
    description: 'Templates, checklists e materiais de estudo',
  },
  {
    icon: Users,
    title: 'Comunidade Privada',
    description: 'Acesso a grupo exclusivo de desenvolvedores',
  },
]

const topics = [
  'Algoritmos e Estruturas de Dados',
  'Carreira Internacional em Tech',
  'System Design na Prática',
  'Dicas de Produtividade',
  'Mercado de Trabalho Europa/EUA',
  'Setup e Ferramentas',
]

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true)
      setIsLoading(false)
      setEmail('')
    }, 1500)
  }

  if (isSubscribed) {
    return (
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center tech-card">
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold">
                  Bem-vindo à comunidade! 🎉
                </h3>
                <p className="text-muted-foreground">
                  Obrigado por se inscrever! Você receberá o primeiro email em
                  breve com conteúdo exclusivo sobre carreira em tech.
                </p>
              </div>

              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>Verifique sua caixa de entrada</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <Badge variant="outline" className="px-3 py-1">
              <Sparkles className="mr-1 h-3 w-3" />
              Newsletter Exclusiva
            </Badge>
            <h2 className="text-3xl font-bold lg:text-4xl">
              Receba insights{' '}
              <span className="gradient-text">direto na sua caixa</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Toda semana eu compartilho o que aprendi sobre algoritmos,
              carreira em tech e trabalho remoto internacional.{' '}
              <strong>Sem spam, só conteúdo de valor.</strong>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column - Benefits */}
            <div className="space-y-8">
              <div className="space-y-6">
                {benefits.map((benefit) => {
                  const Icon = benefit.icon
                  return (
                    <div
                      key={benefit.title}
                      className="flex items-start space-x-4"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Topics */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Tópicos que você vai receber:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Signup Form */}
            <Card className="tech-card">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <div className="flex justify-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold">Junte-se a 2000+ devs</h3>
                    <p className="text-sm text-muted-foreground">
                      Que já recebem insights semanais sobre carreira em tech
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="email"
                        placeholder="seu.email@exemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                        className="h-12"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full group"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                          Inscrevendo...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Quero Receber Insights
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>

                  <div className="text-center">
                    <p className="text-xs text-muted-foreground">
                      📧 Emails semanais • 🚫 Sem spam • ✅ Cancele quando
                      quiser
                    </p>
                  </div>

                  {/* Social Proof */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>2000+ inscritos</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Taxa de abertura: 65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              💡 <strong>Dica:</strong> Quem se inscreve agora recebe um guia
              gratuito:
              <br />
              <span className="font-semibold">
                "10 Algoritmos Essenciais para Entrevistas de Tech"
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
