import { useState } from 'react'
import { KittTarget } from './KittTarget'
import { TherapistFingerTarget } from './TherapistFingerTarget'
import { Instructions } from './Instructions'
import { SPEED_PRESETS, type PresetId } from './speedPresets'
import './App.css'

export type ViewType = 'kitt' | 'finger'

function App() {
  const [presetId, setPresetId] = useState<PresetId>('standard')
  const [dark, setDark] = useState(true)
  const [view, setView] = useState<ViewType>('kitt')

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
            <option value="kitt">KITT (moving light)</option>
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
      </section>

      <section className="target-area" aria-label="Moving eye target">
        {view === 'kitt' && <KittTarget hz={hz} dark={dark} />}
        {view === 'finger' && (
          <TherapistFingerTarget hz={hz} dark={dark} />
        )}
      </section>

      <footer className="footer">
        <p>Follow the moving target with your eyes. Keep your head still.</p>
      </footer>
    </div>
  )
}

export default App
