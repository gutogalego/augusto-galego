'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    clarity: (action: string, ...args: unknown[]) => void
  }
}

export function ClarityAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.innerHTML = `
      (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "uwvig5tu0g");
    `
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return null
}
