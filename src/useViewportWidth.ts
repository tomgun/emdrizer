import { useState, useEffect } from 'react'

const BREAKPOINT = 768

export function useViewportWidth(): number {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return width
}

export function useIsDesktop(): boolean {
  return useViewportWidth() >= BREAKPOINT
}

export { BREAKPOINT }
