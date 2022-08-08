import { Story, Meta } from '@storybook/react'

import { SoilLayersViz, SoilLayersVizType } from '.'

export default {
  title: 'UI Elements/SoilLayersViz',
  component: SoilLayersViz,
} as Meta

const Template: Story<SoilLayersVizType> = (props) => (
  <SoilLayersViz {...props} />
)

export const Default = Template.bind({})

Default.args = {
  depth30Level: 4,
  depth60Level: 5,
  depth90Level: 2,
  averageLevel: 3,
}
