import { getClassesByStatusId } from '@lib/utils/getClassesByStatusId'
import { WaterSupplyStatusType } from '@lib/utils/mapSuctionTensionToStatus'
import classNames from 'classnames'
import { addDays, format, isSameDay, isToday } from 'date-fns'
import { FC } from 'react'

interface DataItem {
  waterSupplyStatusId: WaterSupplyStatusType['id'] | undefined
  date: Date
}

export interface ForecastVizPropType {
  data?: DataItem[]
}

const getDateLabel = (date: Date): string => {
  return `${format(date, 'dd.MM.')}${isToday(date) ? ' (Heute)' : ''}`
}

const NUMBER_OF_DAYS_TO_DISPLAY = 14
const NOW = Date.now()

const NEXT_14_DAYS_WITHOUT_DATA: DataItem[] = Array.from(
  Array(NUMBER_OF_DAYS_TO_DISPLAY)
).map((_, i) => {
  return {
    date: addDays(NOW, i),
    waterSupplyStatusId: undefined,
  }
})

export const ForecastViz: FC<ForecastVizPropType> = ({ data }) => {
  const VIZ_GRID_AXES_CLASSES = {
    gridTemplateColumns: `repeat(${
      NUMBER_OF_DAYS_TO_DISPLAY || data?.length || 1
    }, minmax(0, 1fr))`,
  }

  const NEXT_14_DAYS_WITH_DATA = NEXT_14_DAYS_WITHOUT_DATA.map(
    (emptyDataItem) => {
      return {
        date: emptyDataItem.date,
        waterSupplyStatusId:
          data?.find((dataItem) => isSameDay(dataItem.date, emptyDataItem.date))
            ?.waterSupplyStatusId || emptyDataItem.waterSupplyStatusId,
      }
    }
  )

  return (
    <div
      className={classNames('w-full h-full', 'bg-white', 'grid gap-x-[2px]')}
      style={{ ...VIZ_GRID_AXES_CLASSES }}
    >
      {NEXT_14_DAYS_WITH_DATA.map((dataItem) => {
        return (
          <div
            key={dataItem.date.toISOString()}
            className={classNames(
              'relative flex justify-center items-end',
              'overflow-visible',
              getClassesByStatusId(dataItem.waterSupplyStatusId).bg
            )}
          >
            <span
              className={classNames(
                'absolute bottom-0 w-[45px]',
                '-rotate-90 -translate-y-4 origin-center',
                'text-gray-900 text-opacity-50 font-semibold text-sm md:text-base whitespace-nowrap'
              )}
            >
              {getDateLabel(dataItem.date)}
            </span>
          </div>
        )
      })}
    </div>
  )
}
