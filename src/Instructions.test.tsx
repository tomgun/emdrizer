import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@testing-library/react'
import { Instructions } from './Instructions'

describe('Instructions', () => {
  it('shows position copy and common copy', () => {
    render(<Instructions />)
    expect(screen.getByText(/follow the moving target smoothly/i)).toBeDefined()
    expect(
      screen.getByText(/head still and move only your eyes/i)
    ).toBeDefined()
  })

  it('has toggle to show or hide instructions and can reopen', () => {
    render(<Instructions />)
    const hideBtns = screen.getAllByText('Hide instructions')
    fireEvent.click(hideBtns[0]!)
    const showBtns = screen.getAllByText('Show instructions')
    expect(showBtns.length).toBeGreaterThanOrEqual(1)
    fireEvent.click(showBtns[0]!)
    expect(screen.getAllByText('Hide instructions').length).toBeGreaterThanOrEqual(1)
  })
})
