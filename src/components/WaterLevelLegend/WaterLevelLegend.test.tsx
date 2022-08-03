import { render, screen } from '@testing-library/react'
import I18nProvider from 'next-translate/I18nProvider'
import { WaterLevelLegend } from '.'
import common from '../../../locales/de/common.json'

describe('WaterLevelLegend component', () => {
  it('renders title, scale, labels and collapse button by default', () => {
    render(
      <I18nProvider lang="de" namespaces={{ common }}>
        <WaterLevelLegend collapsable />
      </I18nProvider>
    )
    const title = screen.getByText(/Wasserstand/i)
    expect(title).toBeInTheDocument()

    const min = screen.getByText(/Trocken/i)
    expect(min).toBeInTheDocument()

    const max = screen.getByText(/Versorgt/i)
    expect(max).toBeInTheDocument()

    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })
})
