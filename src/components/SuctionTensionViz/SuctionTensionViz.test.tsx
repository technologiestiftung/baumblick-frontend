import { render, screen } from '@testing-library/react'
import { SuctionTensionViz } from '.'

describe('SuctionTensionViz', () => {
  test('renders all levels and average circle', () => {
    render(
      <SuctionTensionViz
        depth30Level={2}
        depth60Level={1}
        depth90Level={3}
        averageLevel={3}
      />
    )

    const level30El = screen.getByLabelText(`Tiefe: 30 cm, Stufe: 2`)
    expect(level30El).toBeInTheDocument()

    const level60El = screen.getByLabelText(`Tiefe: 60 cm, Stufe: 1`)
    expect(level60El).toBeInTheDocument()

    const level90El = screen.getByLabelText(`Tiefe: 90 cm, Stufe: 3`)
    expect(level90El).toBeInTheDocument()

    const averageEl = screen.getByLabelText(`Durchschnitt-Stufe: 3`)
    expect(averageEl).toBeInTheDocument()
  })

  test('falls back to gray colors without provided values', () => {
    render(
      <SuctionTensionViz
        depth30Level={2}
        depth60Level={undefined}
        depth90Level={undefined}
        averageLevel={undefined}
      />
    )

    const level30El = screen.getByLabelText(`Tiefe: 30 cm, Stufe: 2`)
    expect(level30El).toBeInTheDocument()

    const level60El = screen.getByLabelText(`Tiefe: 60 cm, Stufe: unbekannt`)
    expect(level60El).toBeInTheDocument()

    const level90El = screen.getByLabelText(`Tiefe: 90 cm, Stufe: unbekannt`)
    expect(level90El).toBeInTheDocument()

    const averageEl = screen.getByLabelText(`Durchschnitt-Stufe: unbekannt`)
    expect(averageEl).toBeInTheDocument()
  })
})
