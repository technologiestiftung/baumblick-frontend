import { getClassesByScaleId } from '@lib/utils/getClassesByScaleId'
import { WaterSupplyLevelType } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { format, isToday } from 'date-fns'
import { FC } from 'react'

interface DataItem {
  waterSupplyLevelId: WaterSupplyLevelType['id']
  date: Date
}

export interface ForecastVizPropType {
  data?: DataItem[]
}

const getDateLabel = (date: Date): string => {
  return `${format(date, 'dd.MM.')}${isToday(date) ? ' (Heute)' : ''}`
}

export const ForecastViz: FC<ForecastVizPropType> = ({ data }) => {
  const VIZ_GRID_AXES_CLASSES = {
    gridTemplateColumns: `repeat(${data?.length || 1}, minmax(0, 1fr))`,
  }

  return (
    <div
      className={classNames('w-full h-full', 'bg-white', 'grid gap-x-[2px]')}
      style={{ ...VIZ_GRID_AXES_CLASSES }}
    >
      {data &&
        data.map((dataItem) => {
          return (
            <div
              key={dataItem.date.toISOString()}
              className={classNames(
                'relative flex justify-center items-end',
                'overflow-visible',
                getClassesByScaleId(dataItem.waterSupplyLevelId).bg
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
