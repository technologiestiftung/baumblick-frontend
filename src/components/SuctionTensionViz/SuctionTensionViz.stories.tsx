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
  depth30StatusId: 'critical',
  depth60StatusId: 'good',
  depth90StatusId: 'good',
  averageStatusId: 'medium',
}

export const WithMissingLevels = Template.bind({})

WithMissingLevels.args = {
  depth30StatusId: 'good',
}
