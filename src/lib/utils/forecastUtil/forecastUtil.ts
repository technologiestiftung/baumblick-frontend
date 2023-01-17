import { ForecastDataType } from '@lib/requests/getForecastData'
import { NowcastDataType } from '@lib/requests/getNowcastData'
import {
  mapSuctionTensionToStatus,
  WaterSupplyStatusType,
} from '../mapSuctionTensionToStatus'

interface CombinedNowAndForecastType {
  date: Date
  waterSupplyStatusId: WaterSupplyStatusType['id'] | undefined
}

interface nowAndForecastMinimumType {
  timestamp: string
  value: number
}

const hasTimestampAndValue = (item?: NowcastDataType): boolean =>
  Boolean(item?.timestamp && item?.value)

const mapFilteredData = ({
  timestamp,
  value,
}: nowAndForecastMinimumType): CombinedNowAndForecastType => ({
  date: new Date(timestamp),
  waterSupplyStatusId: mapSuctionTensionToStatus(value)?.id,
})

export const combineNowAndForecastData = (
  nowcastData: NowcastDataType[],
  forecastData: ForecastDataType[]
): CombinedNowAndForecastType[] => {
  const nowcastAvg = nowcastData.find(({ type_id }) => type_id === 4)
  const combinedData = [nowcastAvg, ...forecastData]
  const filteredData = combinedData.filter(
    hasTimestampAndValue
  ) as nowAndForecastMinimumType[]
  return filteredData.map(mapFilteredData)
}
