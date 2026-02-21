import { useEffect, useRef, useCallback } from 'react'

/**
 * Shared hook: returns a ref to attach to the container and a ref for the moving element.
 * Call with a callback that receives (leftPx) and sets the element's transform.
 */
export function useSweepMotion(
  hz: number,
  setPosition: (el: HTMLElement | null, leftPx: number) => void
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const movingRef = useRef<HTMLDivElement | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  const animate = useCallback(() => {
    const container = containerRef.current
    const moving = movingRef.current
    if (!container || !moving) return

    const now = performance.now()
    if (startTimeRef.current === null) startTimeRef.current = now
    const elapsed = (now - startTimeRef.current) / 1000

    const period = 1 / hz
    const phase = (elapsed % period) / period
    const t = phase < 0.5 ? phase * 2 : 2 - phase * 2
    const rect = container.getBoundingClientRect()
    const padding = 32
    const range = rect.width - padding * 2
    const left = padding + t * range

    setPosition(moving, left)
    rafRef.current = requestAnimationFrame(animate)
  }, [hz, setPosition])

  useEffect(() => {
    startTimeRef.current = null
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  return { containerRef, movingRef }
}
