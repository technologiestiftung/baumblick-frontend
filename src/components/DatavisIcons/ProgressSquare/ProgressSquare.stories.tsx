import { Story, Meta } from '@storybook/react'

import { ProgressSquare, ProgressSquarePropType } from '.'

export default {
  title: 'UI Elements/DatavisIcons',
  component: ProgressSquare,
  argTypes: {
    progress: {
      options: [0.01, 0.125, 0.25, 0.5, 0.615, 0.75, 0.95, 1],
      control: { type: 'radio' },
    },
  },
} as Meta

const Template: Story<ProgressSquarePropType> = (props) => (
  <ProgressSquare {...props} />
)

export const ProgressSquareTemplate = Template.bind({})
ProgressSquareTemplate.parameters = {
  layout: 'fullscreen',
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
ProgressSquareTemplate.args = {
  progress: 0.5,
  strokeColorBackground: '#9EA3AE',
  fillColor: '#111827',
}
