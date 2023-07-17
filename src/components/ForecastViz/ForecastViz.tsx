import { getClassesByStatusId } from '@lib/utils/getClassesByStatusId'
import { getStatusLabel } from '@lib/utils/getStatusLabel'
import { WaterSupplyStatusType } from '@lib/utils/mapSuctionTensionToStatus'
import classNames from 'classnames'
import { startOfToday } from 'date-fns'
import { addDays, differenceInDays, format, isSameDay } from 'date-fns'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

interface DataItem {
  waterSupplyStatusId: WaterSupplyStatusType['id'] | undefined
  date: Date
}

export interface ForecastVizPropType {
  data?: DataItem[]
  startDate?: Date
}

const getDateLabel = (date: Date, tomorrow: Date): string => {
  return `${format(date, 'dd.MM.')}${
    isSameDay(date, tomorrow) ? ' (Morgen)' : ''
  }`
}

/**
 * We display the forecast starting from tomorrow to avoid confusion with the nowcast that is actually the value from yesterday.
 * We also only go 13 days into the future as this is the maxiumum date for the forecast values.
 */
const NUMBER_OF_DAYS_TO_DISPLAY = 13

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
  startDate = addDays(new Date(), 1),
}) => {
  const { t } = useTranslation('common')
  const vizGridAxesClasses = {
    gridTemplateColumns: `repeat(${
      NUMBER_OF_DAYS_TO_DISPLAY || data?.length || 1
    }, minmax(0, 1fr))`,
  }
  const nextDaysWithoutData = getNextDaysWithoutData(startDate)

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
        const showRelativeDateLabel = i === 6
        const daysDiff = differenceInDays(dataItem.date, startOfToday())
        return (
          <li
            key={dataItem.date.toISOString()}
            className={classNames(
              'relative flex justify-center items-end',
              'overflow-visible',
              getClassesByStatusId(dataItem.waterSupplyStatusId).bg
            )}
            aria-label={`${getDateLabel(dataItem.date, startDate)}: ${
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
              {`${getDateLabel(dataItem.date, startDate)} ${
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
