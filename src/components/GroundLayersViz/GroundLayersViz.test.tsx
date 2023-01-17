import { render, screen } from '@testing-library/react'
import I18nProvider from 'next-translate/I18nProvider'
import { GroundLayersViz } from '.'
import commoDE from '../../../locales/de/common.json'

describe('GroundLayersViz', () => {
  test('renders all statuses and average circle', () => {
    render(
      <I18nProvider lang={'de'} namespaces={{ common: commoDE }}>
        <GroundLayersViz
          depth30StatusId={'critical'}
          depth60StatusId={'good'}
          depth90StatusId={'medium'}
          averageStatusId={'medium'}
        />
      </I18nProvider>
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
      <I18nProvider lang={'de'} namespaces={{ common: commoDE }}>
        <GroundLayersViz
          depth30StatusId={'critical'}
          depth60StatusId={undefined}
          depth90StatusId={undefined}
          averageStatusId={undefined}
        />
      </I18nProvider>
    )

    const level30El = screen.getByLabelText(
      `Tiefe: 30 cm, Wasserversorgung: Kritisch`
    )
    expect(level30El).toBeInTheDocument()

    const level60El = screen.getByLabelText(
      `Tiefe: 60 cm, Wasserversorgung: Unbekannt`
    )
    expect(level60El).toBeInTheDocument()

    const level90El = screen.getByLabelText(
      `Tiefe: 90 cm, Wasserversorgung: Unbekannt`
    )
    expect(level90El).toBeInTheDocument()

    const averageEl = screen.getByLabelText(
      `Durschnittliche Wasserversorgung: Unbekannt`
    )
    expect(averageEl).toBeInTheDocument()
  })
})
