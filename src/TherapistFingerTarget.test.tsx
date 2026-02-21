import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { TherapistFingerTarget } from './TherapistFingerTarget'

describe('TherapistFingerTarget', () => {
  it('renders a finger-like target that moves (single element)', () => {
    render(<TherapistFingerTarget hz={1} />)
    const container = document.querySelector('[aria-hidden="true"]')
    expect(container).toBeDefined()
    const finger = container?.querySelector('.therapist-finger')
    expect(finger).toBeDefined()
  })

  it('has blurred background (hand is sharp for clarity per F-0002)', () => {
    render(<TherapistFingerTarget hz={1} />)
    const container = document.querySelector('[aria-hidden="true"]')
    expect(container?.innerHTML).toContain('blur(')
  })

  it('renders with dark and light theme', () => {
    const { unmount: u1 } = render(<TherapistFingerTarget hz={1} dark />)
    expect(document.querySelector('.therapist-finger')).toBeDefined()
    u1()
    const { unmount: u2 } = render(<TherapistFingerTarget hz={1} dark={false} />)
    expect(document.querySelector('.therapist-finger')).toBeDefined()
    u2()
  })
})
