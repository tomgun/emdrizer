import { useState } from 'react'
import { useIsDesktop } from './useViewportWidth'
import './Instructions.css'

const DESKTOP_COPY =
  'Sit at a distance slightly less than the width of your screen to maximize eye movement range. Keep the screen center at eye level. Keep your head still and move only your eyes.'

const MOBILE_COPY =
  'Use landscape orientation. Hold the device close enough that eye movements are as large as is comfortable. Keep your head still and move only your eyes. Center the screen at eye level when possible.'

const COMMON_COPY =
  'Follow the moving target smoothly with your eyes. Breathe naturally. Typical use: 2–5 minutes or until you feel calmer. For self-practice, distress level 1–6 is appropriate; 7+ suggests professional support.'

export function Instructions() {
  const isDesktop = useIsDesktop()
  const [open, setOpen] = useState(true)

  const positionCopy = isDesktop ? DESKTOP_COPY : MOBILE_COPY

  return (
    <section className="instructions" aria-label="How to use">
      <button
        type="button"
        className="instructions-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="instructions-content"
      >
        {open ? 'Hide instructions' : 'Show instructions'}
      </button>
      {open && (
        <div id="instructions-content" className="instructions-content">
          <p className="instructions-position">{positionCopy}</p>
          <p className="instructions-common">{COMMON_COPY}</p>
        </div>
      )}
    </section>
  )
}
