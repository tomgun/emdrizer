import { useState, useCallback } from 'react'
import type { SessionState, SessionConfig, SessionTarget } from './sessionTypes'
import { DEFAULT_SESSION_CONFIG } from './sessionTypes'

export interface SessionActions {
  startSession: (
    config?: Partial<SessionConfig>,
    targets?: SessionTarget[],
    viewOverride?: SessionState['viewOverride']
  ) => void
  leavePreparation: () => void
  toBreak: () => void
  toClosure: () => void
  continueFromBreak: () => void
  endSession: () => void
  exitEarly: () => void
}

export function useSessionState(): [SessionState | null, SessionActions] {
  const [state, setState] = useState<SessionState | null>(null)

  const startSession = useCallback(
    (
      config?: Partial<SessionConfig>,
      targets: SessionTarget[] = [],
      viewOverride?: SessionState['viewOverride']
    ) => {
      const merged: SessionConfig = { ...DEFAULT_SESSION_CONFIG, ...config }
      setState({
        stage: 'preparation',
        currentSetIndex: 0,
        config: merged,
        targets,
        stageStartedAt: Date.now(),
        viewOverride,
      })
    },
    []
  )

  const leavePreparation = useCallback(() => {
    setState((s) =>
      s && s.stage === 'preparation'
        ? { ...s, stage: 'bls', stageStartedAt: Date.now() }
        : s
    )
  }, [])

  const toBreak = useCallback(() => {
    setState((s) =>
      s && s.stage === 'bls'
        ? { ...s, stage: 'break', stageStartedAt: Date.now() }
        : s
    )
  }, [])

  const toClosure = useCallback(() => {
    setState((s) => (s ? { ...s, stage: 'closure', stageStartedAt: Date.now() } : s))
  }, [])

  const continueFromBreak = useCallback(() => {
    setState((s) => {
      if (!s || s.stage !== 'break') return s
      const nextSet = s.currentSetIndex + 1
      if (nextSet >= s.config.setsCount) {
        return { ...s, stage: 'closure', stageStartedAt: Date.now() }
      }
      return {
        ...s,
        stage: 'bls',
        currentSetIndex: nextSet,
        stageStartedAt: Date.now(),
      }
    })
  }, [])

  const endSession = useCallback(() => setState(null), [])

  const exitEarly = useCallback(() => {
    setState((s) => (s ? { ...s, stage: 'closure', stageStartedAt: Date.now() } : s))
  }, [])

  const actions: SessionActions = {
    startSession,
    leavePreparation,
    toBreak,
    toClosure,
    continueFromBreak,
    endSession,
    exitEarly,
  }

  return [state, actions]
}
