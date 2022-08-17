import { Story, Meta } from '@storybook/react'

import { ForecastBarChart, ForecastBarChartPropType } from '.'

export default {
  title: 'UI Elements/ForecastBarChart',
  component: ForecastBarChart,
} as Meta

const Template: Story<ForecastBarChartPropType> = (props) => (
  <div className="w-full h-72">
    <ForecastBarChart {...props} />
  </div>
)

export const Default = Template.bind({})

Default.args = {
  data: [
    {
      date: '2022-08-11',
      suctionTensionLevel: 5,
    },
    {
      date: '2022-08-12',
      suctionTensionLevel: 3,
    },
    {
      date: '2022-08-13-kjkjkjkj',
      suctionTensionLevel: 4,
    },
    {
      date: '2022-08-14',
      suctionTensionLevel: 3,
    },
    {
      date: '2022-08-15',
      suctionTensionLevel: 2,
    },
    {
      date: '2022-08-16',
      suctionTensionLevel: 3,
    },
    {
      date: '2022-08-17',
      suctionTensionLevel: 1,
    },
  ],
}
