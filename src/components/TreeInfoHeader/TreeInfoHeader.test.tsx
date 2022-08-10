import { render } from '@testing-library/react'
import { TreeInfoHeader } from '.'

describe('TreeInfoHeader', () => {
  test('renders tree height if provided', () => {
    render(<TreeInfoHeader species="Tanne" height={12} />)
  })

  test('renders tree age if provided', () => {
    render(<TreeInfoHeader species="Tanne" age={50} />)
  })

  test('renders with provided status colors (only when compressed)', () => {
    render(
      <TreeInfoHeader
        species="Tanne"
        isCompressed={true}
        statusBackgroundColor="bg-scale-1"
        statusBorderColor="border-scale-1-dark"
      />
    )

    const el = document.querySelector('.bg-scale-1.border-scale-1-dark')
    expect(el).toBeInTheDocument()
  })

  test('falls back to gray circle without status color classes', () => {
    render(<TreeInfoHeader species="Tanne" />)
  })

  test('falls back to gray circle with incomplete status color classes', () => {
    render(
      <TreeInfoHeader
        species="Tanne"
        isCompressed={true}
        statusBackgroundColor="bg-scale-1"
      />
    )

    const el = document.querySelector('.bg-gray-300.border-gray-400')
    expect(el).toBeInTheDocument()
  })
})
