import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { KittTarget } from './KittTarget'

describe('KittTarget', () => {
  it('renders a single target element (KITT style)', () => {
    render(<KittTarget hz={1} />)
    const container = document.querySelector('[aria-hidden="true"]')
    expect(container).toBeDefined()
    const dots = container?.querySelectorAll('[style*="border-radius"]')
    expect(dots?.length).toBe(1)
  })

  it('renders with dark and light theme', () => {
    const { unmount: u1 } = render(<KittTarget hz={1} dark />)
    expect(document.querySelector('[aria-hidden="true"]')).toBeDefined()
    u1()
    const { unmount: u2 } = render(<KittTarget hz={1} dark={false} />)
    expect(document.querySelector('[aria-hidden="true"]')).toBeDefined()
    u2()
  })
})
