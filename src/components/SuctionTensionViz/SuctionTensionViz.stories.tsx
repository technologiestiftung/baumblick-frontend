import { Story, Meta } from '@storybook/react'

import { SuctionTensionViz, SuctionTensionVizType } from '.'

export default {
  title: 'UI Elements/SuctionTensionViz',
  component: SuctionTensionViz,
} as Meta

const Template: Story<SuctionTensionVizType> = (props) => (
  <SuctionTensionViz {...props} />
)

export const Default = Template.bind({})

Default.args = {
  depth30Level: 4,
  depth60Level: 5,
  depth90Level: 2,
  averageLevel: 5,
}
