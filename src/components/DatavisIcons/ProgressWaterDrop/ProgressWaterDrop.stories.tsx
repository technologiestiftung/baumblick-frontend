import { Story, Meta } from '@storybook/react'

import { ProgressWaterDrop, ProgressWaterDropPropType } from '.'

export default {
  title: 'UI Elements/DatavisIcons',
  component: ProgressWaterDrop,
} as Meta

const Template: Story<ProgressWaterDropPropType> = (props) => (
  <ProgressWaterDrop {...props} />
)

export const ProgressWaterDropTemplate = Template.bind({})
ProgressWaterDropTemplate.parameters = {
  layout: 'fullscreen',
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
ProgressWaterDropTemplate.args = {
  numDrops: 3,
  strokeColor: '#9EA3AE',
  fillColor: '#111827',
}
