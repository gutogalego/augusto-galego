'use client'

import { useEffect } from 'react'

interface UseScrollToTopOptions {
  behavior?: ScrollBehavior
  top?: number
  left?: number
  enabled?: boolean
}

export function useScrollToTop(options: UseScrollToTopOptions = {}) {
  const { behavior = 'smooth', top = 0, left = 0, enabled = true } = options

  useEffect(() => {
    if (!enabled) {
      return
    }

    const timeoutId = setTimeout(() => {
      window.scrollTo({
        top,
        left,
        behavior,
      })
    }, 100)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [behavior, top, left, enabled])
}

export function scrollToTop(options: UseScrollToTopOptions = {}) {
  const { behavior = 'smooth', top = 0, left = 0 } = options

  window.scrollTo({
    top,
    left,
    behavior,
  })
}
