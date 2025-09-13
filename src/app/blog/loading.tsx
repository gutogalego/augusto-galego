import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Generate unique keys for skeleton components
const generateSkeletonKeys = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${prefix}-${Date.now()}-${i}`)

export default function BlogLoading() {
  return (
    <div className="min-h-screen">
      {/* Hero Section Skeleton */}
      <section className="hero-section">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Skeleton className="h-6 w-32 mx-auto" />
            <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
            <Skeleton className="h-12 w-80 mx-auto" />

            <div className="flex flex-wrap justify-center gap-2">
              {generateSkeletonKeys('topic', 8).map((key) => (
                <Skeleton key={key} className="h-6 w-20" />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {generateSkeletonKeys('stat', 3).map((key) => (
                <Card key={key} className="tech-card">
                  <CardContent className="p-4 text-center">
                    <Skeleton className="h-10 w-10 mx-auto mb-2" />
                    <Skeleton className="h-8 w-16 mx-auto mb-1" />
                    <Skeleton className="h-4 w-20 mx-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Grid Skeleton */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          {/* Filters Skeleton */}
          <div className="mb-12 space-y-6">
            <Skeleton className="h-10 w-80 mx-auto" />
            <div className="flex flex-wrap justify-center gap-2">
              {generateSkeletonKeys('filter', 6).map((key) => (
                <Skeleton key={key} className="h-8 w-20" />
              ))}
            </div>
          </div>

          {/* Featured Posts Skeleton */}
          <div className="mb-16">
            <div className="flex items-center space-x-2 mb-6">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-8 w-48" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {generateSkeletonKeys('featured', 2).map((key) => (
                <Card key={key} className="tech-card">
                  <CardHeader>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-3/4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Regular Posts Skeleton */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-32" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generateSkeletonKeys('post', 9).map((key) => (
                <Card key={key} className="tech-card">
                  <CardHeader>
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-20" />
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
