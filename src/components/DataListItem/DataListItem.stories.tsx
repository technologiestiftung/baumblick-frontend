import { Story, Meta } from '@storybook/react'

import { DataListItem, DataListItemPropType } from '.'
import { DatavisIcon } from '@components/DatavisIcons/DatavisIcon'

export default {
  title: 'UI Elements/DataListItem',
  component: DataListItem,
} as Meta

const Template: Story<{
  items: DataListItemPropType[]
}> = ({ items }) => (
  <ul>
    {items.map((item) => (
      <DataListItem {...item} key={item.title?.toString()} />
    ))}
  </ul>
)

const items = [
  {
    title: 'Wasserstand',
    subtitle: 'Durschnitt 30, 60, 90',
    valueLabel: 'Versorgt',
  },
  {
    title: 'Niederschlag',
    subtitle: 'Letzte 14 Tage',
    datavisIcon: (
      <DatavisIcon iconType="water-drops" iconValue={2} valueLabel="30l" />
    ),
  },
  {
    title: 'Baumscheibe',
    subtitle: 'Unversiegelter Bereich um den Stamm',
    datavisIcon: (
      <DatavisIcon iconType="square" iconValue={0.66} valueLabel="2,2qm" />
    ),
  },
  {
    title: 'Verschattung',
    subtitle: 'Anteil an Schattenzeit',
    datavisIcon: (
      <DatavisIcon iconType="clock" iconValue={0.76} valueLabel="76%" />
    ),
  },
  {
    title: 'Gießmenge',
    subtitle: 'Letzte 14 Tage',
    datavisIcon: (
      <DatavisIcon iconType="water-drops" iconValue={2} valueLabel="30l" />
    ),
  },
  {
    title: 'Stammumfang',
    subtitle: 'An der weiteste Stelle',
    datavisIcon: (
      <DatavisIcon iconType="circle" iconValue={0.33} valueLabel="33cm" />
    ),
  },
]

export const Default = Template.bind({})
Default.parameters = {
  layout: 'fullscreen',
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {
  items,
}
