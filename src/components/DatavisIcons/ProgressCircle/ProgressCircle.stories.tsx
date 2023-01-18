import { Story, Meta } from '@storybook/react'

import { ProgressCircle, ProgressCirclePropType } from '.'

export default {
  title: 'UI Elements/DatavisIcons',
  component: ProgressCircle,
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
