import { Story, Meta } from '@storybook/react'

import { SuctionTensionLegend, SuctionTensionLegendType } from '.'

export default {
  title: 'Map/SuctionTensionLegend',
  component: SuctionTensionLegend,
} as Meta

const Template: Story<SuctionTensionLegendType> = (args) => (
  <div className="absolute bottom-2 left-2 w-[200px]">
    <SuctionTensionLegend {...args} />
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

export const Collapsed = Template.bind({})
Collapsed.parameters = {
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Collapsed.args = {
  collapsable: true,
  initiallyCollapsed: true,
}
