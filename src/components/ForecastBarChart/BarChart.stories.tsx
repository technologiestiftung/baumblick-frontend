import { SuctionTensionLevel } from '@lib/utils/mapSuctionTensionToLevel'
import { Story, Meta } from '@storybook/react'
import { addDays } from 'date-fns'

import { ForecastBarChart, ForecastBarChartPropType } from '.'

export default {
  title: 'UI Elements/ForecastBarChart',
  component: ForecastBarChart,
} as Meta

const Template: Story<ForecastBarChartPropType> = (props) => (
  <div className="w-full h-72 border border-gray-200">
    <ForecastBarChart {...props} />
  </div>
)

const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const Default = Template.bind({})

Default.args = {
  data: Array.from(Array(14)).map((_, i: number) => {
    return {
      date: addDays(Date.now(), i),
      suctionTensionLevel: getRandomInt(1, 5) as SuctionTensionLevel,
    }
  }),
}

export const MissingData = Template.bind({})

MissingData.args = {}
