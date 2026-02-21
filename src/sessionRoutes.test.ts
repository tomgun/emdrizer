import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getSessionPath, getViewFromSessionPath } from './sessionRoutes'

describe('getViewFromSessionPath', () => {
  it('parses session/kitt as kitt', () => {
    expect(getViewFromSessionPath('session/kitt')).toBe('kitt')
  })

  it('parses session/finger as finger', () => {
    expect(getViewFromSessionPath('session/finger')).toBe('finger')
  })

  it('parses session/sweeping-dot as sweeping-dot', () => {
    expect(getViewFromSessionPath('session/sweeping-dot')).toBe('sweeping-dot')
  })

  it('returns sweeping-dot for session without segment (default)', () => {
    expect(getViewFromSessionPath('session')).toBe('sweeping-dot')
  })

  it('returns sweeping-dot for unknown segment', () => {
    expect(getViewFromSessionPath('session/other')).toBe('sweeping-dot')
  })
})

describe('getSessionPath', () => {
  const base = typeof import.meta.env.BASE_URL === 'string' ? import.meta.env.BASE_URL : '/'
  const pathnameForSession = base === '/' ? '/session/kitt' : `${base.replace(/\/$/, '')}/session/kitt`

  beforeEach(() => {
    vi.stubGlobal('location', {
      pathname: pathnameForSession,
      hash: '',
      assign: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns session path from pathname when path is session/kitt', () => {
    const path = getSessionPath()
    expect(path).toBe('session/kitt')
  })

  it('returns session path from hash when pathname is not session', () => {
    vi.stubGlobal('location', {
      pathname: base === '/' ? '/' : base,
      hash: '#session/finger',
      assign: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
    })
    const path = getSessionPath()
    expect(path).toBe('session/finger')
  })

  it('returns null when neither pathname nor hash is session', () => {
    vi.stubGlobal('location', {
      pathname: base === '/' ? '/' : base,
      hash: '',
      assign: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
    })
    const path = getSessionPath()
    expect(path).toBeNull()
  })
})
