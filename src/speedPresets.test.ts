import { describe, it, expect } from 'vitest'
import {
  SPEED_PRESETS,
  MIN_HZ,
  MAX_HZ,
  clampHz,
  type PresetId,
} from './speedPresets'

describe('speedPresets', () => {
  describe('research-based presets', () => {
    it('Processing preset is ~1.0–1.2 Hz', () => {
      const hz = SPEED_PRESETS.processing.hz
      expect(hz).toBeGreaterThanOrEqual(1)
      expect(hz).toBeLessThanOrEqual(1.2)
    })

    it('Standard preset is 1 Hz', () => {
      expect(SPEED_PRESETS.standard.hz).toBe(1)
    })

    it('Resource preset is in 0.2–0.5 Hz range', () => {
      const hz = SPEED_PRESETS.resource.hz
      expect(hz).toBeGreaterThanOrEqual(0.2)
      expect(hz).toBeLessThanOrEqual(0.5)
    })

    it('all preset ids are valid', () => {
      const ids: PresetId[] = ['processing', 'standard', 'resource']
      ids.forEach((id) => {
        expect(SPEED_PRESETS[id]).toBeDefined()
        expect(SPEED_PRESETS[id].hz).toBeGreaterThan(0)
      })
    })
  })

  describe('clampHz', () => {
    it('clamps to MIN_HZ and MAX_HZ', () => {
      expect(clampHz(0.05)).toBe(MIN_HZ)
      expect(clampHz(3)).toBe(MAX_HZ)
    })
    it('returns value within range unchanged', () => {
      expect(clampHz(1)).toBe(1)
      expect(clampHz(0.3)).toBe(0.3)
    })
  })
})
