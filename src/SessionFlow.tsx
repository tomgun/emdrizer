import { useEffect, useRef } from 'react'
import { KittTarget } from './KittTarget'
import { KittCarTarget } from './KittCarTarget'
import { TherapistFingerTarget } from './TherapistFingerTarget'
import type { SessionState } from './sessionTypes'
import type { SessionActions } from './useSessionState'
import type { ViewType } from './App'

interface SessionFlowProps {
  state: SessionState
  actions: SessionActions
  view: ViewType
  hz: number
  dark: boolean
  sillyHand: boolean
  sessionContainerRef: React.RefObject<HTMLDivElement | null>
}

export function SessionFlow({
  state,
  actions,
  view,
  hz,
  dark,
  sillyHand,
  sessionContainerRef,
}: SessionFlowProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // BLS stage: auto-advance to break after setDurationSeconds
  useEffect(() => {
    if (state.stage !== 'bls') return
    const durationMs = state.config.setDurationSeconds * 1000
    timerRef.current = setTimeout(() => actions.toBreak(), durationMs)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [state.stage, state.currentSetIndex, state.config.setDurationSeconds, actions])

  // Enter fullscreen when BLS starts (bigger eye movement range)
  useEffect(() => {
    if (state.stage === 'bls' && sessionContainerRef.current && !document.fullscreenElement) {
      sessionContainerRef.current.requestFullscreen().catch(() => {})
    }
  }, [state.stage, state.currentSetIndex, sessionContainerRef])

  // Exit fullscreen when moving to break
  useEffect(() => {
    if (state.stage === 'break' && document.fullscreenElement) {
      document.exitFullscreen()
    }
  }, [state.stage])

  if (state.stage === 'preparation') {
    const primaryTarget = state.targets[0]
    return (
      <div className="session-stage session-preparation">
        <h2>Session preparation</h2>
        <p className="session-intro">
          You&apos;ll do a few sets of eye movement (bilateral stimulation), with short breaks between. Follow the
          moving target with your eyes and keep your head still.
        </p>
        {primaryTarget ? (
          <p className="session-target-label">
            <strong>Focus for this session:</strong> {primaryTarget.label}
          </p>
        ) : (
          <p className="session-target-label">Focus: general calm or stress relief (no specific memory needed).</p>
        )}
        <p className="session-reminder">
          Self-practice is for mild–moderate distress (about 1–6). If you&apos;re at 7 or above, consider professional
          support.
        </p>
        <p className="session-sets-info">
          {state.config.setsCount} sets × {state.config.setDurationSeconds} s each, with breaks.
        </p>
        <button type="button" className="session-btn session-btn-primary" onClick={actions.leavePreparation}>
          Begin
        </button>
      </div>
    )
  }

  if (state.stage === 'bls') {
    const setLabel = `Set ${state.currentSetIndex + 1} of ${state.config.setsCount}`
    return (
      <div className="session-stage session-bls">
        <p className="session-bls-label" aria-live="polite">
          {setLabel}
        </p>
        <div className="session-target-container">
          {view === 'sweeping-dot' && <KittTarget hz={hz} dark={dark} fullscreen />}
          {view === 'kitt' && <KittCarTarget hz={hz} dark={dark} fullscreen />}
          {view === 'finger' && (
            <TherapistFingerTarget hz={hz} dark={dark} sillyHand={sillyHand} fullscreen />
          )}
        </div>
        <div className="session-bls-actions">
          <button
            type="button"
            className="session-btn session-btn-secondary"
            onClick={() => document.exitFullscreen()}
            aria-label="Exit full screen"
          >
            Exit full screen
          </button>
          <button type="button" className="session-btn session-btn-secondary" onClick={actions.exitEarly}>
            End session early
          </button>
        </div>
      </div>
    )
  }

  if (state.stage === 'break') {
    const isLastSet = state.currentSetIndex >= state.config.setsCount - 1
    return (
      <div className="session-stage session-break">
        <h2>Break</h2>
        <p>Take a breath. How do you feel?</p>
        {isLastSet ? (
          <button type="button" className="session-btn session-btn-primary" onClick={actions.continueFromBreak}>
            Finish session
          </button>
        ) : (
          <button type="button" className="session-btn session-btn-primary" onClick={actions.continueFromBreak}>
            Continue to next set
          </button>
        )}
        <button type="button" className="session-btn session-btn-secondary" onClick={actions.exitEarly}>
          End session early
        </button>
      </div>
    )
  }

  // closure
  return (
    <div className="session-stage session-closure">
      <h2>Session complete</h2>
      <p>Take your time. Return whenever you&apos;re ready.</p>
      <button type="button" className="session-btn session-btn-primary" onClick={actions.endSession}>
        Back to main
      </button>
    </div>
  )
}
