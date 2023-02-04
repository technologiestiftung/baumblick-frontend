import { Story, Meta } from '@storybook/react'

import { DataListItem, DataListItemPropType, DataVizIconType } from '.'

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
