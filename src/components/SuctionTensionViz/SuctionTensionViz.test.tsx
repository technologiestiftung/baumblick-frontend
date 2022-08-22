import { render, screen } from '@testing-library/react'
import { SuctionTensionViz } from '.'

describe('SuctionTensionViz', () => {
  test('renders all statuses and average circle', () => {
    render(
      <SuctionTensionViz
        depth30StatusId={'critical'}
        depth60StatusId={'good'}
        depth90StatusId={'medium'}
        averageStatusId={'medium'}
      />
    )

    const level30El = screen.getByLabelText(
      `Tiefe: 30 cm, Wasserversorgung: Kritisch`
    )
    expect(level30El).toBeInTheDocument()

    const level60El = screen.getByLabelText(
      `Tiefe: 60 cm, Wasserversorgung: Gut`
    )
    expect(level60El).toBeInTheDocument()

    const level90El = screen.getByLabelText(
      `Tiefe: 90 cm, Wasserversorgung: Mäßig`
    )
    expect(level90El).toBeInTheDocument()

    const averageEl = screen.getByLabelText(
      `Durschnittliche Wasserversorgung: Mäßig`
    )
    expect(averageEl).toBeInTheDocument()
  })

  test('falls back to gray colors without provided values', () => {
    render(
      <SuctionTensionViz
        depth30StatusId={'critical'}
        depth60StatusId={undefined}
        depth90StatusId={undefined}
        averageStatusId={undefined}
      />
    )

    const level30El = screen.getByLabelText(
      `Tiefe: 30 cm, Wasserversorgung: Kritisch`
    )
    expect(level30El).toBeInTheDocument()

    const level60El = screen.getByLabelText(
      `Tiefe: 60 cm, Wasserversorgung: unbekannt`
    )
    expect(level60El).toBeInTheDocument()

    const level90El = screen.getByLabelText(
      `Tiefe: 90 cm, Wasserversorgung: unbekannt`
    )
    expect(level90El).toBeInTheDocument()

    const averageEl = screen.getByLabelText(
      `Durschnittliche Wasserversorgung: unbekannt`
    )
    expect(averageEl).toBeInTheDocument()
  })
})
