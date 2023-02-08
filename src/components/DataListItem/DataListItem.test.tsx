import { render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { DataListItem } from '.'
import { DatavisIcon } from '../DatavisIcons/DatavisIcon'

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
    datavisIcon: (
      <DatavisIcon iconType="water-drops" iconValue={2} valueLabel="30l" />
    ),
  },
  {
    title: 'Baumscheibe',
    subtitle: 'Unversiegelter Bereich um den Stamm',
    valueLabel: '2,2qm',
    datavisIcon: (
      <DatavisIcon iconType="square" iconValue={0.66} valueLabel="2,2qm" />
    ),
  },
  {
    title: 'Verschattung',
    subtitle: 'Anteil an Schattenzeit',
    valueLabel: '76%',
    datavisIcon: (
      <DatavisIcon iconType="clock" iconValue={0.76} valueLabel="76%" />
    ),
  },
  {
    title: 'Gießmenge',
    subtitle: 'Letzte 14 Tage',
    valueLabel: '30l',
    datavisIcon: (
      <DatavisIcon iconType="water-drops" iconValue={2} valueLabel="30l" />
    ),
  },
  {
    title: 'Stammumfang',
    subtitle: 'An der weiteste Stelle',
    valueLabel: '33cm',
    datavisIcon: (
      <DatavisIcon iconType="circle" iconValue={0.33} valueLabel="33cm" />
    ),
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
