import { useState, useRef, useEffect } from 'react'
import { KittTarget } from './KittTarget'
import { KittCarTarget } from './KittCarTarget'
import { TherapistFingerTarget } from './TherapistFingerTarget'
import { Instructions } from './Instructions'
import { SessionFlow } from './SessionFlow'
import { useSessionState } from './useSessionState'
import { SPEED_PRESETS, type PresetId } from './speedPresets'
import './App.css'

export type ViewType = 'sweeping-dot' | 'kitt' | 'finger'

function App() {
  const [presetId, setPresetId] = useState<PresetId>('standard')
  const [dark, setDark] = useState(true)
  const [view, setView] = useState<ViewType>('sweeping-dot')
  const [sillyHand, setSillyHand] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const [sessionState, sessionActions] = useSessionState()

  const preset = SPEED_PRESETS[presetId]
  const hz = preset.hz

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement && document.fullscreenElement === stageRef.current)
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const goFullscreen = () => stageRef.current?.requestFullscreen()
  const exitFullscreen = () => document.exitFullscreen()

  if (sessionState) {
    return (
      <div className="app app-session" data-theme={dark ? 'dark' : 'light'}>
        <header className="header">
          <h1>Emdrizer</h1>
          <p className="tagline">Session</p>
        </header>
        <section className="target-area session-area" aria-label="Session">
          <SessionFlow
            state={sessionState}
            actions={sessionActions}
            view={view}
            hz={hz}
            dark={dark}
            sillyHand={sillyHand}
          />
        </section>
      </div>
    )
  }

  return (
    <div className="app" data-theme={dark ? 'dark' : 'light'}>
      <header className="header">
        <h1>Emdrizer</h1>
        <p className="tagline">Self EMDR eye target</p>
      </header>

      <Instructions />

      <section className="controls">
        <div className="control-group">
          <button
            type="button"
            className="session-start-btn"
            onClick={() => sessionActions.startSession()}
            aria-label="Start a structured session with stages and breaks"
          >
            Start session
          </button>
        </div>
        <div className="control-group">
          <label htmlFor="view">Target view</label>
          <select
            id="view"
            value={view}
            onChange={(e) => setView(e.target.value as ViewType)}
          >
            <option value="sweeping-dot">Sweeping light</option>
            <option value="kitt">KITT (Knight Rider)</option>
            <option value="finger">Therapist finger</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="preset">Speed preset</label>
          <select
            id="preset"
            value={presetId}
            onChange={(e) => setPresetId(e.target.value as PresetId)}
            aria-describedby="preset-desc"
          >
            {(Object.keys(SPEED_PRESETS) as PresetId[]).map((id) => (
              <option key={id} value={id}>
                {SPEED_PRESETS[id].label} ({SPEED_PRESETS[id].hz} Hz)
              </option>
            ))}
          </select>
          <p id="preset-desc" className="preset-desc">
            {preset.description}
          </p>
        </div>

        <div className="control-group">
          <label>
            <input
              type="checkbox"
              checked={dark}
              onChange={(e) => setDark(e.target.checked)}
            />
            Dark background (light target)
          </label>
        </div>

        {view === 'finger' && (
          <div className="control-group">
            <label>
              <input
                type="checkbox"
                checked={sillyHand}
                onChange={(e) => setSillyHand(e.target.checked)}
              />
              Silly hand (pointing at you — AI darndest things)
            </label>
          </div>
        )}
      </section>

      <section className="target-area" aria-label="Moving eye target">
        <div ref={stageRef} className="stage-wrapper">
          <div className="stage-inner">
            {view === 'sweeping-dot' && <KittTarget hz={hz} dark={dark} fullscreen={isFullscreen} />}
            {view === 'kitt' && <KittCarTarget hz={hz} dark={dark} fullscreen={isFullscreen} />}
            {view === 'finger' && (
              <TherapistFingerTarget hz={hz} dark={dark} sillyHand={sillyHand} fullscreen={isFullscreen} />
            )}
          </div>
          {isFullscreen && (
            <button
              type="button"
              className="exit-fullscreen"
              onClick={exitFullscreen}
              aria-label="Exit full screen"
            >
              Exit full screen
            </button>
          )}
        </div>
        <button
          type="button"
          className="fullscreen-btn"
          onClick={goFullscreen}
          aria-label="Full screen: stage only"
        >
          Full screen
        </button>
      </section>

      <footer className="footer">
        <p>Follow the moving target with your eyes. Keep your head still.</p>
      </footer>
    </div>
  )
}

export default App
