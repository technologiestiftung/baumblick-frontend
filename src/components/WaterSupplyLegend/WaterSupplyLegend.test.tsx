import { render, screen } from '@testing-library/react'
import I18nProvider from 'next-translate/I18nProvider'
import { WaterSupplyLegend } from '.'
import common from '../../../locales/de/common.json'

describe('WaterSupplyLegend component', () => {
  it('renders title, scale, labels and collapse button by default', () => {
    render(
      <I18nProvider lang="de" namespaces={{ common }}>
        <WaterSupplyLegend />
      </I18nProvider>
    )
    const title = screen.getByText(/Wasserversorgung/i)
    expect(title).toBeInTheDocument()

    const good = screen.getByText(/Gut/i)
    expect(good).toBeInTheDocument()

    const medium = screen.getByText(/Mäßig/i)
    expect(medium).toBeInTheDocument()

    const critical = screen.getByText(/Kritisch/i)
    expect(critical).toBeInTheDocument()
  })
})
