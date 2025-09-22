'use client'

import { LoadingScreen } from '@/components/ui/loading-screen'
import { useEffect, useState } from 'react'

export function InitialLoading() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return <LoadingScreen isLoading={isLoading} debounceMs={0} />
}
