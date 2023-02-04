import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { DataListItem, DataVizIconType } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

const items = [
  {
    title: 'Wasserstand',
    subtitle: 'Durschnitt 30, 60, 90',
    valueLabel: 'Versorgt',
  },
  {
    title: 'Niederschlag',
    subtitle: 'Letzte 14 Tage',
    valueLabel: '30l',
    iconType: 'water-drops' as DataVizIconType,
    iconValue: 3,
  },
  {
    title: 'Baumscheibe',
    subtitle: 'Unversiegelter Bereich um den Stamm',
    valueLabel: '2,2qm',
    iconType: 'square' as DataVizIconType,
    iconValue: 0.66,
  },
  {
    title: 'Verschattung',
    subtitle: 'Anteil an Schattenzeit',
    valueLabel: '76%',
    iconType: 'clock' as DataVizIconType,
    iconValue: 0.76,
  },
  {
    title: 'Gießmenge',
    subtitle: 'Letzte 14 Tage',
    valueLabel: '30l',
    iconType: 'water-drops' as DataVizIconType,
    iconValue: 2,
  },
  {
    title: 'Stammumfang',
    subtitle: 'An der weiteste Stelle',
    valueLabel: '33cm',
    iconType: 'circle' as DataVizIconType,
    iconValue: 0.33,
  },
]

describe('DataListItem', () => {
  test('should render the chapters with # links', () => {
    items.forEach((item) => {
      const { unmount } = render(<DataListItem {...item} />)
      const title = screen.getByText(item.title)
      const subtitle = screen.getByText(item.subtitle)
      const value = screen.getByText(item.valueLabel)

      expect(title).toBeInTheDocument()
      expect(subtitle).toBeInTheDocument()
      expect(value).toBeInTheDocument()
      unmount()
    })
  })
})
