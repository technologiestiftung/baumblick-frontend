import { WaterSupplyStatusType } from '@lib/utils/mapSuctionTensionToStatus'
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

export const StartingToday = Template.bind({})

StartingToday.args = {
  data: Array.from(Array(14)).map((_, i: number) => {
    return {
      date: addDays(Date.now(), i),
      waterSupplyStatusId: ['good', 'medium', 'critical'][
        Math.floor(Math.random() * 3)
      ] as WaterSupplyStatusType['id'],
    }
  }),
}

export const NotStartingToday = Template.bind({})

NotStartingToday.args = {
  data: Array.from(Array(14)).map((_, i: number) => {
    return {
      date: addDays(Date.now(), i + 2),
      waterSupplyStatusId: ['good', 'medium', 'critical'][
        Math.floor(Math.random() * 3)
      ] as WaterSupplyStatusType['id'],
    }
  }),
}

export const WithIncompleteDays = Template.bind({})

WithIncompleteDays.args = {
  data: Array.from(Array(4)).map((_, i: number) => {
    return {
      date: addDays(Date.now(), i),
      waterSupplyStatusId: ['good', 'medium', 'critical'][
        Math.floor(Math.random() * 3)
      ] as WaterSupplyStatusType['id'],
    }
  }),
}

export const WithCroppedDays = Template.bind({})

WithCroppedDays.args = {
  data: Array.from(Array(25)).map((_, i: number) => {
    return {
      date: addDays(Date.now(), i),
      waterSupplyStatusId: ['good', 'medium', 'critical'][
        Math.floor(Math.random() * 3)
      ] as WaterSupplyStatusType['id'],
    }
  }),
}

export const WithoutData = Template.bind({})

WithoutData.args = {
  data: undefined,
}
