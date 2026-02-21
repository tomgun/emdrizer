/**
 * F-0005: Therapy session with stages, breaks, and targets.
 * Flow: Preparation → (BLS → Break)* → Closure
 */

export type SessionStage = 'preparation' | 'bls' | 'break' | 'closure'

export interface SessionTarget {
  id: string
  label: string
  note?: string
  imageUrl?: string
  distress?: number
}

export interface SessionConfig {
  /** Number of BLS sets (each set followed by a break; last set followed by closure). */
  setsCount: number
  /** Duration in seconds per BLS set. */
  setDurationSeconds: number
  /** Minimum break duration in seconds before Continue is available (optional auto-continue). */
  minBreakSeconds: number
}

export const DEFAULT_SESSION_CONFIG: SessionConfig = {
  setsCount: 3,
  setDurationSeconds: 45,
  minBreakSeconds: 15,
}

export interface SessionState {
  stage: SessionStage
  /** 0-based index of current BLS set (0 .. setsCount-1). */
  currentSetIndex: number
  config: SessionConfig
  /** Optional target(s) for this session; first is primary. */
  targets: SessionTarget[]
  /** When we entered the current stage (for timers). */
  stageStartedAt: number
}
