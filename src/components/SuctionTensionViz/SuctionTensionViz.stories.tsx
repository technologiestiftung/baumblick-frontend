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
  depth30LevelId: 'critical',
  depth60LevelId: 'good',
  depth90LevelId: 'good',
  averageLevelId: 'medium',
}

export const WithMissingLevels = Template.bind({})

WithMissingLevels.args = {
  depth30LevelId: 'good',
}
