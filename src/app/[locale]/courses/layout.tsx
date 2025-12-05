'use client'

import { useEffect } from 'react'

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    document.body.classList.add('sales-page')
    return () => {
      document.body.classList.remove('sales-page')
    }
  }, [])

  return <>{children}</>
}
