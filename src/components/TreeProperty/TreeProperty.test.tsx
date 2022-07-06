import { render, screen } from '@testing-library/react'
import { TreeProperty } from '.'

describe('TreeProperty component', () => {
  test('should render its passed props', () => {
    render(
      <TreeProperty
        label="I am a label"
        sublabel="I am a sublabel"
        value="123"
      />
    )

    const label = screen.getByText(/I am a label/i)
    expect(label).toBeInTheDocument()

    const sublabel = screen.getByText(/I am a sublabel/i)
    expect(sublabel).toBeInTheDocument()

    const value = screen.getByText(/123/i)
    expect(value).toBeInTheDocument()
  })
})
