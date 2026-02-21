import { useCallback } from 'react'
import { useSweepMotion } from './useSweepMotion'

/** KITT at David Hasselhoff Museum, Berlin (OlafJanssen, CC BY-SA 4.0, Wikimedia Commons) */
const KITT_BG_IMAGE =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Scale_model_of_the_Knight_Rider_car_KITT_in_the_David_Hasselhoff_Museum_in_Berlin_20191027.jpg/1280px-Scale_model_of_the_Knight_Rider_car_KITT_in_the_David_Hasselhoff_Museum_in_Berlin_20191027.jpg'

interface KittCarTargetProps {
  hz: number
  dark?: boolean
  className?: string
}

/**
 * Authentic KITT (Knight Rider) scanner: red light bar sweeping across KITT + Hasselhoff background.
 * Background: KITT at David Hasselhoff Museum (CC BY-SA 4.0). Red scanner = Anamorphic Equalizer.
 */
export function KittCarTarget({ hz, className = '' }: KittCarTargetProps) {
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
        height: '180px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    >
      {/* Background: KITT car (scanner area visible) */}
      <div
        className="kitt-background"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${KITT_BG_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Light overlay so the moving scanner light reads on the car */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.2) 100%)',
        }}
      />
      {/* Moving target = the scanner light on the KITT front (slim red bar on grille line) */}
      <div
        ref={movingRef}
        className="kitt-scanner-light"
        style={{
          position: 'absolute',
          left: 0,
          top: '58%',
          marginTop: '-6px',
          width: '48px',
          height: '12px',
          borderRadius: '2px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,60,60,0.4) 15%, #ff2222 50%, rgba(255,60,60,0.4) 85%, transparent 100%)',
          boxShadow: '0 0 16px #ff3333, 0 0 32px rgba(255,50,50,0.7), inset 0 0 8px rgba(255,150,150,0.5)',
          filter: 'brightness(1.15)',
          willChange: 'transform',
        }}
      />
      {/* Attribution: CC BY-SA 4.0 */}
      <a
        href="https://commons.wikimedia.org/wiki/File:Scale_model_of_the_Knight_Rider_car_KITT_in_the_David_Hasselhoff_Museum_in_Berlin_20191027.jpg"
        target="_blank"
        rel="noopener noreferrer license"
        className="kitt-attribution"
        style={{
          position: 'absolute',
          bottom: '4px',
          right: '6px',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.6)',
          textDecoration: 'none',
        }}
      >
        KITT photo: OlafJanssen, CC BY-SA 4.0
      </a>
    </div>
  )
}
