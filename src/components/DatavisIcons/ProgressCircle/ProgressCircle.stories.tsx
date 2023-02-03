import { Story, Meta } from '@storybook/react'

import { ProgressCircle, ProgressCirclePropType } from '.'

export default {
  title: 'UI Elements/DatavisIcons',
  component: ProgressCircle,
  argTypes: {
    progress: {
      options: [0.01, 0.125, 0.25, 0.5, 0.615, 0.75, 0.95, 1],
      control: { type: 'radio' },
    },
  },
} as Meta

const Template: Story<ProgressCirclePropType> = (props) => (
  <ProgressCircle {...props} />
)

export const ProgressCircleTemplate = Template.bind({})
ProgressCircleTemplate.parameters = {
  layout: 'fullscreen',
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
ProgressCircleTemplate.args = {
  progress: 0.5,
  strokeColorBackground: '#9EA3AE',
  fillColor: '#111827',
  size: 50,
}
