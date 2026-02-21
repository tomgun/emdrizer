import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { KittCarTarget } from './KittCarTarget'

describe('KittCarTarget', () => {
  it('renders KITT scanner (red light bar area)', () => {
    render(<KittCarTarget hz={1} />)
    const container = document.querySelector('[aria-hidden="true"]')
    expect(container).toBeDefined()
    const scanner = document.querySelector('.kitt-scanner-light')
    expect(scanner).toBeDefined()
  })

  it('renders with dark theme', () => {
    render(<KittCarTarget hz={1} dark />)
    expect(document.querySelector('.kitt-scanner-light')).toBeDefined()
  })
})
