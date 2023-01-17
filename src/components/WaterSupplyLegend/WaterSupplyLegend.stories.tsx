import { Story, Meta } from '@storybook/react'

import { WaterSupplyLegend, WaterSupplyLegendType } from '.'

export default {
  title: 'Map/WaterSupplyLegend',
  component: WaterSupplyLegend,
} as Meta

const Template: Story<WaterSupplyLegendType> = (args) => (
  <div className="absolute bottom-2 left-2 w-[200px]">
    <WaterSupplyLegend {...args} />
  </div>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {}
