import { render, screen } from '@testing-library/react'
import I18nProvider from 'next-translate/I18nProvider'
import { SuctionTensionLegend } from '.'
import common from '../../../locales/de/common.json'

describe('SuctionTensionLegend component', () => {
  it('renders title, scale, labels and collapse button by default', () => {
    render(
      <I18nProvider lang="de" namespaces={{ common }}>
        <SuctionTensionLegend collapsable />
      </I18nProvider>
    )
    const title = screen.getByText(/Saugspannung/i)
    expect(title).toBeInTheDocument()

    const min = screen.getByText(/Gering/i)
    expect(min).toBeInTheDocument()

    const max = screen.getByText(/Hoch/i)
    expect(max).toBeInTheDocument()

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
