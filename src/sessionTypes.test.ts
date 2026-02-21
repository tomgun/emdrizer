import { describe, it, expect } from 'vitest'
import { DEFAULT_SESSION_CONFIG } from './sessionTypes'

describe('sessionTypes', () => {
  describe('DEFAULT_SESSION_CONFIG', () => {
    it('has sensible defaults for F-0005 (3 sets, 45s, 15s break)', () => {
      expect(DEFAULT_SESSION_CONFIG.setsCount).toBe(3)
      expect(DEFAULT_SESSION_CONFIG.setDurationSeconds).toBe(45)
      expect(DEFAULT_SESSION_CONFIG.minBreakSeconds).toBe(15)
    })

    it('all config values are positive', () => {
      expect(DEFAULT_SESSION_CONFIG.setsCount).toBeGreaterThan(0)
      expect(DEFAULT_SESSION_CONFIG.setDurationSeconds).toBeGreaterThan(0)
      expect(DEFAULT_SESSION_CONFIG.minBreakSeconds).toBeGreaterThan(0)
    })
  })
})
