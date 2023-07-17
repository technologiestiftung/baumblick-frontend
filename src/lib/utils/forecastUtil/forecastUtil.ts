import { ForecastDataType } from '@lib/requests/getForecastData'
import { NowcastDataType } from '@lib/requests/getNowcastData'
import {
  mapSuctionTensionToStatus,
  WaterSupplyStatusType,
} from '../mapSuctionTensionToStatus'

interface MapForecastDataToMinimumType {
  date: Date
  waterSupplyStatusId: WaterSupplyStatusType['id'] | undefined
}

interface ForecastMinimumType {
  timestamp: string
  value: number
}

const hasTimestampAndValue = (item?: NowcastDataType): boolean =>
  Boolean(item?.timestamp && item?.value)

const mapFilteredData = ({
  timestamp,
  value,
}: ForecastMinimumType): MapForecastDataToMinimumType => ({
  date: new Date(timestamp),
  waterSupplyStatusId: mapSuctionTensionToStatus(value)?.id,
})

export const mapForecastDataToMinimum = (
  forecastData: ForecastDataType[]
): MapForecastDataToMinimumType[] => {
  const combinedData = [...forecastData]
  const filteredData = combinedData.filter(
    hasTimestampAndValue
  ) as ForecastMinimumType[]
  return filteredData.map(mapFilteredData)
}
