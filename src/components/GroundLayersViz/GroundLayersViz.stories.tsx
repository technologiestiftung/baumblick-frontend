import { Story, Meta } from '@storybook/react'

import { GroundLayersViz, GroundLayersVizType } from '.'

export default {
  title: 'UI Elements/GroundLayersViz',
  component: GroundLayersViz,
} as Meta

const Template: Story<GroundLayersVizType> = (props) => (
  <GroundLayersViz {...props} />
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
