import { useEffect, useRef, useCallback } from 'react'

interface TherapistFingerTargetProps {
  hz: number
  dark?: boolean
  className?: string
}

/**
 * Therapist-style finger target: blurred finger-like shape moving left–right.
 * Same motion and speed system as KITT (F-0003).
 */
export function TherapistFingerTarget({
  hz,
  dark = true,
  className = '',
}: TherapistFingerTargetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const fingerRef = useRef<HTMLDivElement>(null)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number>(0)

  const animate = useCallback(() => {
    const container = containerRef.current
    const finger = fingerRef.current
    if (!container || !finger) return

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

    finger.style.transform = `translateX(${left}px)`
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
        height: '140px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-hidden="true"
    >
      <div
        ref={fingerRef}
        className="therapist-finger"
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          marginTop: '-24px',
          width: '28px',
          height: '48px',
          borderRadius: '14px 14px 18px 18px',
          background: dark
            ? 'linear-gradient(135deg, #e8e0d5 0%, #c4b8a8 50%, #a89888 100%)'
            : 'linear-gradient(135deg, #6b5b4f 0%, #4a4038 50%, #3a322c 100%)',
          boxShadow: dark
            ? '2px 2px 8px rgba(0,0,0,0.3)'
            : '2px 2px 8px rgba(0,0,0,0.5)',
          filter: 'blur(4px)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
