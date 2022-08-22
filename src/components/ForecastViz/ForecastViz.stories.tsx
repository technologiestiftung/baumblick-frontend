import { WaterSupplyLevelType } from '@lib/utils/mapSuctionTensionToLevel'
import { Story, Meta } from '@storybook/react'
import { addDays } from 'date-fns'

import { ForecastViz, ForecastVizPropType } from '.'

export default {
  title: 'UI Elements/ForecastViz',
  component: ForecastViz,
} as Meta

const Template: Story<ForecastVizPropType> = (props) => (
  <div className="w-full h-72">
    <ForecastViz {...props} />
  </div>
)

export const Default = Template.bind({})

Default.args = {
  data: Array.from(Array(14)).map((_, i: number) => {
    return {
      date: addDays(Date.now(), i),
      waterSupplyLevelId: ['good', 'medium', 'critical'][
        Math.floor(Math.random() * 3)
      ] as WaterSupplyLevelType['id'],
    }
  }),
}
