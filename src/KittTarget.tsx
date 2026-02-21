import { useEffect, useRef, useCallback } from 'react'

interface KittTargetProps {
  /** Full left–right–left cycles per second */
  hz: number
  /** Use dark theme (light target on dark bg) */
  dark?: boolean
  className?: string
}

/**
 * KITT-style moving eye target: one bright element sweeping left–right smoothly.
 * Uses time-based position so speed is exact and frame-rate independent.
 */
export function KittTarget({ hz, dark = true, className = '' }: KittTargetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  const animate = useCallback(() => {
    const container = containerRef.current
    const dot = dotRef.current
    if (!container || !dot) return

    const now = performance.now()
    if (startTimeRef.current === null) startTimeRef.current = now
    const elapsed = (now - startTimeRef.current) / 1000 // seconds

    // One full cycle = left → right → left. Phase 0..1 within one cycle.
    const period = 1 / hz
    const phase = (elapsed % period) / period // 0 at left, 0.5 at right, 1 back at left

    // Smooth back-and-forth: 0 → 1 → 0 (sine or linear segment)
    const t = phase < 0.5 ? phase * 2 : 2 - phase * 2 // 0..1..0
    const rect = container.getBoundingClientRect()
    const padding = 24
    const range = rect.width - padding * 2
    const left = padding + t * range

    dot.style.transform = `translateX(${left}px)`
    rafRef.current = requestAnimationFrame(animate)
  }, [hz])

  useEffect(() => {
    startTimeRef.current = null
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '120px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: '20px',
          height: '20px',
          marginTop: '-10px',
          borderRadius: '50%',
          background: dark
            ? 'radial-gradient(circle, #fff 0%, #ccc 70%, #888 100%)'
            : 'radial-gradient(circle, #111 0%, #333 70%, #555 100%)',
          boxShadow: dark
            ? '0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(255,255,255,0.4)'
            : '0 0 20px rgba(0,0,0,0.5)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
