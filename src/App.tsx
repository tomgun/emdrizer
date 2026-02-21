import { useState } from 'react'
import { KittTarget } from './KittTarget'
import { KittCarTarget } from './KittCarTarget'
import { TherapistFingerTarget } from './TherapistFingerTarget'
import { Instructions } from './Instructions'
import { SPEED_PRESETS, type PresetId } from './speedPresets'
import './App.css'

export type ViewType = 'sweeping-dot' | 'kitt' | 'finger'

function App() {
  const [presetId, setPresetId] = useState<PresetId>('standard')
  const [dark, setDark] = useState(true)
  const [view, setView] = useState<ViewType>('sweeping-dot')
  const [sillyHand, setSillyHand] = useState(false)

  const preset = SPEED_PRESETS[presetId]
  const hz = preset.hz

  return (
    <div className="app" data-theme={dark ? 'dark' : 'light'}>
      <header className="header">
        <h1>Emdrizer</h1>
        <p className="tagline">Self EMDR eye target</p>
      </header>

      <Instructions />

      <section className="controls">
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
        {view === 'sweeping-dot' && <KittTarget hz={hz} dark={dark} />}
        {view === 'kitt' && <KittCarTarget hz={hz} dark={dark} />}
        {view === 'finger' && (
          <TherapistFingerTarget hz={hz} dark={dark} sillyHand={sillyHand} />
        )}
      </section>

      <footer className="footer">
        <p>Follow the moving target with your eyes. Keep your head still.</p>
      </footer>
    </div>
  )
}

export default App
