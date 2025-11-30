'use client'

import { ArrowUp } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

export function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [showBackToTop, setShowBackToTop] = useState(false)

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100)

    setScrollProgress(scrollPercent)
    setShowBackToTop(scrollTop > 500)
  }, [])

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false

    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', throttledHandleScroll, { passive: true })

    // Initial call
    handleScroll()

    return () => window.removeEventListener('scroll', throttledHandleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* Smooth Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-border/20">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out will-change-transform"
          style={{
            width: `${scrollProgress}%`,
            transform: 'translateZ(0)', // Hardware acceleration
          }}
        />
      </div>

      {/* Back to Top Button - Attio Style */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-4 py-2 bg-background border border-border/40 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border transition-all duration-200 ease-out backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-4 w-4" />
          Back to top
        </button>
      )}
    </>
  )
}
