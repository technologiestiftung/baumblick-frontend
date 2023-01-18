import { Story, Meta } from '@storybook/react'

import { ProgressClock, ProgressClockPropType } from '.'

export default {
  title: 'UI Elements/DatavisIcons',
  component: ProgressClock,
} as Meta

const Template: Story<ProgressClockPropType> = (props) => (
  <ProgressClock {...props} />
)

export const ProgressClockTemplate = Template.bind({})
ProgressClockTemplate.parameters = {
  layout: 'fullscreen',
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
ProgressClockTemplate.args = {
  progress: 0.5,
  strokeColorBackground: '#9EA3AE',
  fillColor: '#111827',
}
