'use client'

import { cn } from '@/lib/shadcn'
import { useCallback, useEffect, useState } from 'react'

// Função debounce para melhor performance
function debounce<T extends (...args: never[]) => void>(
  func: T,
  wait: number
): T {
  let timeout: NodeJS.Timeout | null = null
  return ((...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

// Verifica se deve mostrar o indicador ativo
function shouldShowIndicator(toc: TocItem[], activeId: string): boolean {
  if (!activeId) {
    return false
  }

  const activeIndex = toc.findIndex((item) => item.id === activeId)
  if (activeIndex === -1) {
    return false
  }

  const activeItem = toc[activeIndex]
  if (!activeItem) {
    return false
  }

  // Só mostra indicador para H3+
  if (activeItem.level < 3) {
    return false
  }

  return true
}

// Calcula posição da linha de fundo para H3+
function getBackgroundLineTop(toc: TocItem[]): string {
  // Encontra o primeiro H3
  const firstH3Index = toc.findIndex((item) => item.level === 3)
  if (firstH3Index === -1) {
    return '0px'
  }

  const tocButtons = document.querySelectorAll('[data-toc-item]')
  let totalHeight = 0

  for (let i = 0; i < firstH3Index && i < tocButtons.length; i++) {
    const button = tocButtons[i] as HTMLElement
    totalHeight += button.offsetHeight
  }

  return `${totalHeight}px`
}

// Calcula posição do indicador baseado na seção ativa atual
function getIndicatorTop(toc: TocItem[], activeId: string): string {
  if (!shouldShowIndicator(toc, activeId)) {
    return '0px'
  }

  const activeIndex = toc.findIndex((item) => item.id === activeId)
  const firstH2Index = toc.findIndex((item) => item.level === 2)

  // Calcula altura real baseada nos elementos DOM a partir do primeiro H3
  const tocButtons = document.querySelectorAll('[data-toc-item]')
  let totalHeight = 0

  for (let i = firstH2Index; i < activeIndex && i < tocButtons.length; i++) {
    const button = tocButtons[i] as HTMLElement
    totalHeight += button.offsetHeight
  }

  return `${totalHeight}px`
}

// Calcula altura do indicador baseado na seção ativa e suas subseções
function getIndicatorHeight(toc: TocItem[], activeId: string): string {
  if (!shouldShowIndicator(toc, activeId)) {
    return '0px'
  }

  const activeIndex = toc.findIndex((item) => item.id === activeId)
  const activeItem = toc[activeIndex]

  if (!activeItem) {
    return '0px'
  }

  // Encontra todas as subseções consecutivas da seção ativa
  let endIndex = activeIndex
  const activeLevel = activeItem.level

  // Procura por subseções consecutivas (níveis maiores)
  for (let i = activeIndex + 1; i < toc.length; i++) {
    const nextItem = toc[i]
    if (!nextItem) {
      break
    }

    // Se encontrou uma seção do mesmo nível ou menor, para
    if (nextItem.level <= activeLevel) {
      break
    }

    // Se é uma subseção (nível maior), inclui no indicador
    endIndex = i
  }

  // Calcula altura real baseada nos elementos DOM
  const tocButtons = document.querySelectorAll('[data-toc-item]')
  let totalHeight = 0

  for (let i = activeIndex; i <= endIndex && i < tocButtons.length; i++) {
    const button = tocButtons[i] as HTMLElement
    totalHeight += button.offsetHeight
  }

  return `${totalHeight}px`
}

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
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [indicatorUpdate, setIndicatorUpdate] = useState(0)

  // Debounce function for active section
  const debouncedSetActiveId = useCallback(
    debounce((id: string) => {
      setActiveId(id)
      // Força recálculo do indicador após DOM atualizar
      setTimeout(() => setIndicatorUpdate((prev) => prev + 1), 0)
    }, 100),
    []
  )

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

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting)
        if (visibleEntries.length > 0) {
          const sortedEntries = visibleEntries.sort((a, b) => {
            return a.boundingClientRect.top - b.boundingClientRect.top
          })

          const firstEntry = sortedEntries[0]
          if (firstEntry) {
            debouncedSetActiveId(firstEntry.target.id)
          }
        }
      },
      {
        rootMargin: '-10% 0% -80% 0%',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    )

    for (const heading of headings) {
      observer.observe(heading)
    }
    const handleScroll = () => {
      const scrolled = window.scrollY > 300
      setShowBackToTop(scrolled)
    }

    window.addEventListener('scroll', handleScroll)

    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [debouncedSetActiveId])

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (toc.length === 0) {
    return null
  }

  return (
    <nav className={cn('space-y-6', className)}>
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
        Conteúdo
      </h3>

      <div className="space-y-0 relative">
        <div
          className="absolute left-0 w-0.5 bg-muted-foreground/10"
          style={{
            top: getBackgroundLineTop(toc),
            bottom: '0px',
          }}
        />

        <div
          className="absolute left-0 w-0.5 bg-foreground transition-all duration-500 ease-out"
          style={{
            top: getIndicatorTop(toc, activeId),
            height: getIndicatorHeight(toc, activeId),
            opacity: shouldShowIndicator(toc, activeId) ? 1 : 0,
          }}
          key={`indicator-${activeId}-${indicatorUpdate}`}
        />

        {toc.map((item) => {
          const isActive = activeId === item.id
          const isH1 = item.level === 1
          const isH2 = item.level === 2
          const isH3 = item.level === 3

          return (
            <div key={item.id} className="relative">
              <button
                type="button"
                data-toc-item={true}
                onClick={() => scrollToHeading(item.id)}
                className={cn(
                  'block w-full text-left py-1 font-medium transition-colors duration-300 hover:text-foreground relative z-10',
                  isH1 && 'text-sm',
                  isH2 && 'text-xs pl-4',
                  isH3 && 'text-xs pl-6',
                  item.level >= 4 && 'text-xs pl-8',
                  isActive ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                <span className="block leading-relaxed truncate">
                  {item.text}
                </span>
              </button>
            </div>
          )
        })}
      </div>

      {showBackToTop && (
        <div className="border-t border-border/40 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full border border-border/40">
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </div>
            Voltar ao topo
          </button>
        </div>
      )}
    </nav>
  )
}
