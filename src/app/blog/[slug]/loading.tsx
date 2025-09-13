import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

// Generate unique keys for skeleton components
const generateSkeletonKeys = (prefix: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${prefix}-${Date.now()}-${i}`)

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Skeleton className="h-8 w-32" />
            </div>

            {/* Post Header */}
            <div className="space-y-6">
              {/* Category and Meta */}
              <div className="flex items-center space-x-4">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
              </div>

              {/* Title and Description */}
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
              </div>

              {/* Author and Share */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Content Skeleton */}
              {generateSkeletonKeys('content', 12).map((key) => (
                <div key={key} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}

              {/* Code Block Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-32 w-full" />
              </div>

              {/* More Content */}
              {generateSkeletonKeys('more-content', 8).map((key) => (
                <div key={key} className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}

              {/* Post Footer */}
              <div className="mt-12 pt-8 border-t space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-48" />
                  <div className="flex space-x-3">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>

                <div className="h-px bg-border" />

                <Card className="tech-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Skeleton className="h-16 w-16 rounded-full flex-shrink-0" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="flex space-x-2 pt-2">
                          <Skeleton className="h-8 w-20" />
                          <Skeleton className="h-8 w-24" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Table of Contents */}
              <Card className="tech-card">
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-32 mb-3" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card className="tech-card">
                <CardContent className="p-4">
                  <Skeleton className="h-5 w-32 mb-3" />
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter CTA */}
              <Card className="tech-card">
                <CardContent className="p-4 text-center space-y-3">
                  <Skeleton className="h-5 w-32 mx-auto" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4 mx-auto" />
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
