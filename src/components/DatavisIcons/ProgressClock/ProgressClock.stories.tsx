import { Story, Meta } from '@storybook/react'

import { ProgressClock, ProgressClockPropType } from '.'

export default {
  title: 'UI Elements/DatavisIcons',
  component: ProgressClock,
  argTypes: {
    progress: {
      options: [0.01, 0.125, 0.25, 0.5, 0.615, 0.75, 0.95, 1],
      control: { type: 'radio' },
    },
  },
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
