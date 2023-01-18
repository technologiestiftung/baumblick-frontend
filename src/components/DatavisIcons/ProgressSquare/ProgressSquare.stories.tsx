import { Story, Meta } from '@storybook/react'

import { ProgressSquare, ProgressSquarePropType } from '.'

export default {
  title: 'UI Elements/DatavisIcons',
  component: ProgressSquare,
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
