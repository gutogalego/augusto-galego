'use client'

import { cn } from '@/lib/shadcn'
import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  className?: string
}

export function TableOfContents({ className }: TableOfContentsProps) {
  const [toc, setToc] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const headings = document.querySelectorAll(
      'article h1, article h2, article h3, article h4'
    )
    const tocItems: TocItem[] = []

    for (const [index, heading] of headings.entries()) {
      const id = heading.id || `heading-${index}`
      if (!heading.id) {
        heading.id = id
      }

      tocItems.push({
        id,
        text: heading.textContent || '',
        level: Number.parseInt(heading.tagName.charAt(1), 10),
      })
    }

    setToc(tocItems)

    // Observer para detectar seção ativa
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0% -35% 0%' }
    )

    for (const heading of headings) {
      observer.observe(heading)
    }

    return () => observer.disconnect()
  }, [])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (toc.length === 0) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="text-subtitle">Neste artigo</div>
        <div className="text-sm text-muted-foreground">
          Carregando índice...
        </div>
      </div>
    )
  }

  return (
    <nav className={cn('space-y-4', className)}>
      <div className="text-subtitle">Neste artigo</div>
      <div className="space-y-1">
        {toc.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToHeading(item.id)}
            className={cn(
              'block w-full text-left text-sm transition-colors hover:text-foreground',
              item.level === 1 && 'font-medium',
              item.level === 2 && 'pl-3',
              item.level === 3 && 'pl-6 text-xs',
              item.level === 4 && 'pl-9 text-xs',
              activeId === item.id
                ? 'text-foreground font-medium'
                : 'text-muted-foreground'
            )}
          >
            {item.text}
          </button>
        ))}
      </div>
    </nav>
  )
}
