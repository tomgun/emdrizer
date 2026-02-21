import { useCallback } from 'react'
import { useSweepMotion } from './useSweepMotion'

interface TherapistFingerTargetProps {
  hz: number
  dark?: boolean
  /** Use the “pointing at you” hand image (silly / AI darndest things mode). */
  sillyHand?: boolean
  className?: string
}

/** Calm, single-person background (Yan Krukau, Pexels). Blurred so it’s presence only, not distracting. */
const CALM_PERSON_BG =
  'https://images.pexels.com/photos/5793952/pexels-photo-5793952.jpeg?auto=compress&cs=tinysrgb&w=800'

/** Hand with finger up (hypnotist-style) – Pexels 3779434, Olly. */
const HAND_IMAGE = '/images/therapist-hand.jpg'
/** Hand pointing at you – “fun” variant (Pexels 1259327, Rodolpho Zanardo). */
const HAND_IMAGE_POINTING = '/images/therapist-hand-pointing.jpg'

/**
 * Therapist view: calm blurred person in background; real hand image (finger up) as moving target.
 */
export function TherapistFingerTarget({ hz, sillyHand = false, className = '' }: TherapistFingerTargetProps) {
  const handSrc = sillyHand ? HAND_IMAGE_POINTING : HAND_IMAGE
  const setPosition = useCallback((el: HTMLElement | null, leftPx: number) => {
    if (el) el.style.transform = `translateX(${leftPx}px)`
  }, [])

  const { containerRef, movingRef } = useSweepMotion(hz, setPosition)

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
      aria-hidden="true"
    >
      {/* Blurred calm person – visible as a person, not abstract noise */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${CALM_PERSON_BG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
          transform: 'scale(1.05)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 50%, rgba(0,0,0,0.06) 100%)',
        }}
      />
      {/* Moving target: real hand, clearly visible (no blur so it reads as a hand) */}
      <div
        ref={movingRef}
        className="therapist-finger"
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          marginTop: '-70px',
          width: '140px',
          height: '140px',
          willChange: 'transform',
        }}
      >
        <img
          src={handSrc}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}
