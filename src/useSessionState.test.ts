import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSessionState } from './useSessionState'

describe('useSessionState', () => {
  it('starts with null state', () => {
    const { result } = renderHook(() => useSessionState())
    expect(result.current[0]).toBeNull()
  })

  it('startSession sets state to preparation with default config', () => {
    const { result } = renderHook(() => useSessionState())
    act(() => {
      result.current[1].startSession()
    })
    const state = result.current[0]
    expect(state).not.toBeNull()
    expect(state!.stage).toBe('preparation')
    expect(state!.currentSetIndex).toBe(0)
    expect(state!.config.setsCount).toBe(3)
    expect(state!.config.setDurationSeconds).toBe(45)
  })

  it('startSession merges custom config', () => {
    const { result } = renderHook(() => useSessionState())
    act(() => {
      result.current[1].startSession({ setsCount: 5, setDurationSeconds: 60 })
    })
    const state = result.current[0]
    expect(state!.config.setsCount).toBe(5)
    expect(state!.config.setDurationSeconds).toBe(60)
    expect(state!.config.minBreakSeconds).toBe(15)
  })

  it('startSession stores viewOverride', () => {
    const { result } = renderHook(() => useSessionState())
    act(() => {
      result.current[1].startSession(undefined, [], 'kitt')
    })
    expect(result.current[0]!.viewOverride).toBe('kitt')
  })

  it('leavePreparation moves from preparation to bls', () => {
    const { result } = renderHook(() => useSessionState())
    act(() => result.current[1].startSession())
    act(() => result.current[1].leavePreparation())
    expect(result.current[0]!.stage).toBe('bls')
    expect(result.current[0]!.currentSetIndex).toBe(0)
  })

  it('toBreak moves from bls to break', () => {
    const { result } = renderHook(() => useSessionState())
    act(() => result.current[1].startSession())
    act(() => result.current[1].leavePreparation())
    act(() => result.current[1].toBreak())
    expect(result.current[0]!.stage).toBe('break')
  })

  it('continueFromBreak goes to next BLS set when not last', () => {
    const { result } = renderHook(() => useSessionState())
    act(() => result.current[1].startSession())
    act(() => result.current[1].leavePreparation())
    act(() => result.current[1].toBreak())
    act(() => result.current[1].continueFromBreak())
    expect(result.current[0]!.stage).toBe('bls')
    expect(result.current[0]!.currentSetIndex).toBe(1)
  })

  it('continueFromBreak goes to closure after last set', () => {
    const { result } = renderHook(() => useSessionState())
    act(() => result.current[1].startSession({ setsCount: 2 }))
    act(() => result.current[1].leavePreparation())
    act(() => result.current[1].toBreak())
    act(() => result.current[1].continueFromBreak()) // set 2
    act(() => result.current[1].toBreak())
    act(() => result.current[1].continueFromBreak()) // finish
    expect(result.current[0]!.stage).toBe('closure')
  })

  it('endSession sets state to null', () => {
    const { result } = renderHook(() => useSessionState())
    act(() => result.current[1].startSession())
    act(() => result.current[1].endSession())
    expect(result.current[0]).toBeNull()
  })

  it('exitEarly moves to closure from any stage', () => {
    const { result } = renderHook(() => useSessionState())
    act(() => result.current[1].startSession())
    act(() => result.current[1].leavePreparation())
    act(() => result.current[1].exitEarly())
    expect(result.current[0]!.stage).toBe('closure')
  })
})
