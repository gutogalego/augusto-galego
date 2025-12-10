import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Link } from '@/lib/navigation'
import {
  ArrowRight,
  Bell,
  ExternalLink,
  Play,
  Star,
  TrendingUp,
  Users,
  Youtube,
} from 'lucide-react'

const channels = [
  {
    name: '@GutoGalego',
    description:
      'Canal principal com foco em algoritmos, estruturas de dados, LeetCode e carreira em tech.',
    subscribers: '117K+',
    videos: '226',
    category: 'Educação Tech',
    status: 'Ativo',
    highlights: ['Algoritmos', 'LeetCode', 'Carreira', 'System Design'],
    href: 'https://www.youtube.com/@GutoGalego',
    isMain: true,
  },
  {
    name: '@GutoMonólogos',
    description:
      'Canal secundário com monólogos, reflexões pessoais e dicas de produtividade.',
    subscribers: 'Crescendo',
    videos: '15+',
    category: 'Lifestyle Tech',
    status: 'Em Crescimento',
    highlights: ['Produtividade', 'Reflexões', 'Setup', 'Carreira'],
    href: 'https://www.youtube.com/@GutoMonologos',
    isMain: false,
  },
]

const popularVideos = [
  {
    title: 'Como ser um EXCELENTE programador?',
    views: '52K',
    channel: '@GutoGalego',
    thumbnail: '/thumbnails/excelente-programador.jpg',
  },
  {
    title: 'LeetCode vai te fazer melhorar como dev?',
    views: '108K',
    channel: '@GutoGalego',
    thumbnail: '/thumbnails/leetcode-melhorar.jpg',
  },
  {
    title: 'Meu Setup de Produtividade 2024',
    views: '25K',
    channel: '@GutoMonólogos',
    thumbnail: '/thumbnails/setup-produtividade.jpg',
  },
]

export function YouTubeChannels() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="px-3 py-1">
            <Youtube className="mr-1 h-3 w-3 text-foreground" />
            YouTube
          </Badge>
          <h2 className="text-3xl font-bold lg:text-4xl">
            Dois canais, <span className="gradient-text">uma missão</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conteúdo técnico no canal principal e reflexões sobre carreira e
            produtividade no canal secundário. Escolha o que mais combina com
            você.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {channels.map((channel) => (
            <Card
              key={channel.name}
              className={`tech-card relative overflow-hidden ${
                channel.isMain ? 'ring-2 ring-primary/20' : ''
              }`}
            >
              {channel.isMain && (
                <div className="absolute top-4 right-4">
                  <Badge variant="default" className="bg-primary">
                    <Star className="mr-1 h-3 w-3" />
                    Principal
                  </Badge>
                </div>
              )}

              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-white">
                    <Youtube className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{channel.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {channel.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Channel Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {channel.subscribers}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Inscritos
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{channel.videos}</div>
                    <div className="text-sm text-muted-foreground">Vídeos</div>
                  </div>
                  <div className="text-center">
                    <Badge
                      variant={
                        channel.status === 'Ativo' ? 'default' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {channel.status}
                    </Badge>
                  </div>
                </div>

                {/* Channel Highlights */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Tópicos principais:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {channel.highlights.map((highlight) => (
                      <Badge
                        key={highlight}
                        variant="outline"
                        className="text-xs"
                      >
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex space-x-3">
                  <Button className="flex-1 group" asChild={true}>
                    <Link
                      href={channel.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Inscrever-se
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                    </Link>
                  </Button>

                  {!channel.isMain && (
                    <Button variant="outline" size="sm" className="group">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Ajude a crescer!
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Videos */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Vídeos Populares</h3>
            <p className="text-muted-foreground">
              Alguns dos conteúdos mais assistidos dos canais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularVideos.map((video) => (
              <Card
                key={video.title}
                className="tech-card group transition-all overflow-hidden"
              >
                {/* Video Thumbnail Placeholder */}
                <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground text-white group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                  </div>
                  {/* When you have actual thumbnails, replace with: */}
                  {/* <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                  /> */}
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{video.channel}</span>
                      <div className="flex items-center space-x-1">
                        <Play className="h-3 w-3" />
                        <span>{video.views} views</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center">
            <Button variant="outline" size="lg" asChild={true}>
              <Link
                href="https://www.youtube.com/@GutoGalego/videos"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Youtube className="mr-2 h-4 w-4 text-foreground" />
                Ver Todos os Vídeos
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
