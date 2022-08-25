import { getClassesByStatusId } from '@lib/utils/getClassesByStatusId'
import { getStatusLabel } from '@lib/utils/getStatusLabel'
import { WaterSupplyStatusType } from '@lib/utils/mapSuctionTensionToStatus'
import classNames from 'classnames'
import { addDays, differenceInDays, format, isSameDay } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

interface DataItem {
  waterSupplyStatusId: WaterSupplyStatusType['id'] | undefined
  date: Date
}

export interface ForecastVizPropType {
  data?: DataItem[]
  today?: Date
}

const getDateLabel = (date: Date, today: Date): string => {
  return `${format(date, 'dd.MM.')}${isSameDay(date, today) ? ' (Heute)' : ''}`
}

const NUMBER_OF_DAYS_TO_DISPLAY = 15 // 14 days forecast + today for context

const getNextDaysWithoutData = (
  today: Date = new Date(),
  numberOfDaysToDisplay: number = NUMBER_OF_DAYS_TO_DISPLAY
): DataItem[] =>
  Array.from(Array(numberOfDaysToDisplay)).map((_, i) => {
    return {
      date: addDays(today, i),
      waterSupplyStatusId: undefined,
    }
  })

export const ForecastViz: FC<ForecastVizPropType> = ({
  data,
  today = new Date(),
}) => {
  const { t } = useTranslation('common')
  const vizGridAxesClasses = {
    gridTemplateColumns: `repeat(${
      NUMBER_OF_DAYS_TO_DISPLAY || data?.length || 1
    }, minmax(0, 1fr))`,
  }
  const nextDaysWithoutData = getNextDaysWithoutData(today)

  const nextDaysWithData = nextDaysWithoutData.map((emptyDataItem) => {
    const waterSupply = data?.find(({ date }) =>
      isSameDay(date, emptyDataItem.date)
    )
    return {
      date: emptyDataItem.date,
      waterSupplyStatusId:
        waterSupply?.waterSupplyStatusId || emptyDataItem.waterSupplyStatusId,
    }
  })

  return (
    <ul
      className={classNames('w-full h-full', 'bg-white', 'grid gap-x-[2px]')}
      style={{ ...vizGridAxesClasses }}
    >
      {nextDaysWithData.map((dataItem, i) => {
        const showRelativeDateLabel =
          i === Math.floor(nextDaysWithData.length / 2) ||
          i === nextDaysWithData.length - 1
        const daysDiff = differenceInDays(dataItem.date, today)
        return (
          <li
            key={dataItem.date.toISOString()}
            className={classNames(
              'relative flex justify-center items-end',
              'overflow-visible',
              getClassesByStatusId(dataItem.waterSupplyStatusId).bg
            )}
            aria-label={`${getDateLabel(dataItem.date, today)}: ${
              getStatusLabel(dataItem.waterSupplyStatusId || '') ||
              t('legend.map.levels.unknown') ||
              ''
            }`}
          >
            <span
              className={classNames(
                'absolute bottom-0 w-[45px]',
                '-rotate-90 -translate-y-4 origin-center',
                'text-gray-900 text-opacity-50 font-semibold text-sm md:text-base whitespace-nowrap'
              )}
            >
              {`${getDateLabel(dataItem.date, today)} ${
                showRelativeDateLabel
                  ? `(${t(`treeView.forecastViz.relativeDays`, { daysDiff })})`
                  : ``
              }`.trim()}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
