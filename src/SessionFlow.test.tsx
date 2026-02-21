import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { SessionFlow } from './SessionFlow'
import type { SessionState } from './sessionTypes'
import { DEFAULT_SESSION_CONFIG } from './sessionTypes'
import type { SessionActions } from './useSessionState'
import { createRef } from 'react'

function makeState(overrides: Partial<SessionState> = {}): SessionState {
  return {
    stage: 'preparation',
    currentSetIndex: 0,
    config: DEFAULT_SESSION_CONFIG,
    targets: [],
    stageStartedAt: Date.now(),
    ...overrides,
  }
}

function makeActions(): SessionActions {
  return {
    startSession: () => {},
    leavePreparation: () => {},
    toBreak: () => {},
    toClosure: () => {},
    continueFromBreak: () => {},
    endSession: () => {},
    exitEarly: () => {},
  }
}

describe('SessionFlow', () => {
  afterEach(cleanup)

  const defaultProps = {
    hz: 1,
    dark: true,
    sillyHand: false,
    sessionContainerRef: createRef<HTMLDivElement>(null),
  }

  it('preparation stage shows intro and Begin button', () => {
    const state = makeState({ stage: 'preparation' })
    const actions = makeActions()
    render(
      <SessionFlow
        state={state}
        actions={actions}
        view="sweeping-dot"
        {...defaultProps}
      />
    )
    expect(screen.getByRole('heading', { name: /session preparation/i })).toBeDefined()
    expect(screen.getByText(/follow the moving target with your eyes/i)).toBeDefined()
    expect(screen.getByRole('button', { name: /begin/i })).toBeDefined()
  })

  it('preparation stage shows focus label when target is set', () => {
    const state = makeState({
      stage: 'preparation',
      targets: [{ id: '1', label: 'Job interview' }],
    })
    const actions = makeActions()
    render(
      <SessionFlow
        state={state}
        actions={actions}
        view="sweeping-dot"
        {...defaultProps}
      />
    )
    expect(screen.getByText(/focus for this session/i)).toBeDefined()
    expect(screen.getByText(/job interview/i)).toBeDefined()
  })

  it('preparation stage shows sets info', () => {
    const state = makeState({ stage: 'preparation', config: { ...DEFAULT_SESSION_CONFIG, setsCount: 5 } })
    const actions = makeActions()
    render(
      <SessionFlow
        state={state}
        actions={actions}
        view="sweeping-dot"
        {...defaultProps}
      />
    )
    expect(screen.getByText(/5 sets × 45 s each/i)).toBeDefined()
  })

  it('break stage shows Take a breath and Continue', () => {
    const state = makeState({ stage: 'break', currentSetIndex: 0 })
    const actions = makeActions()
    render(
      <SessionFlow
        state={state}
        actions={actions}
        view="sweeping-dot"
        {...defaultProps}
      />
    )
    expect(screen.getByRole('heading', { name: /break/i })).toBeDefined()
    expect(screen.getByText(/take a breath/i)).toBeDefined()
    expect(screen.getByRole('button', { name: /continue to next set/i })).toBeDefined()
  })

  it('break stage shows Finish session on last set', () => {
    const state = makeState({
      stage: 'break',
      currentSetIndex: 2,
      config: { ...DEFAULT_SESSION_CONFIG, setsCount: 3 },
    })
    const actions = makeActions()
    render(
      <SessionFlow
        state={state}
        actions={actions}
        view="sweeping-dot"
        {...defaultProps}
      />
    )
    expect(screen.getByRole('button', { name: /finish session/i })).toBeDefined()
  })

  it('closure stage shows Session complete and Back to main', () => {
    const state = makeState({ stage: 'closure' })
    const actions = makeActions()
    render(
      <SessionFlow
        state={state}
        actions={actions}
        view="sweeping-dot"
        {...defaultProps}
      />
    )
    expect(screen.getByRole('heading', { name: /session complete/i })).toBeDefined()
    expect(screen.getByRole('button', { name: /back to main/i })).toBeDefined()
  })

  it('Begin button calls leavePreparation', () => {
    const leavePreparation = vi.fn()
    const state = makeState({ stage: 'preparation' })
    const actions = { ...makeActions(), leavePreparation }
    const { container } = render(
      <SessionFlow
        state={state}
        actions={actions}
        view="sweeping-dot"
        {...defaultProps}
      />
    )
    const beginBtn = container.querySelector('.session-preparation button')
    expect(beginBtn).toBeTruthy()
    fireEvent.click(beginBtn!)
    expect(leavePreparation).toHaveBeenCalledTimes(1)
  })

  it('Back to main calls endSession', () => {
    const endSession = vi.fn()
    const state = makeState({ stage: 'closure' })
    const actions = { ...makeActions(), endSession }
    const { container } = render(
      <SessionFlow
        state={state}
        actions={actions}
        view="sweeping-dot"
        {...defaultProps}
      />
    )
    const backBtn = container.querySelector('.session-closure button')
    expect(backBtn).toBeTruthy()
    fireEvent.click(backBtn!)
    expect(endSession).toHaveBeenCalledTimes(1)
  })
})
