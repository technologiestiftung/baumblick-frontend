import { SuctionTensionLevel } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { getRingClassesByLevel } from 'pages/trees/[id]'
import { FC } from 'react'

interface DataItem {
  suctionTensionLevel: SuctionTensionLevel
  date: string
}

export interface ForecastBarChartPropType {
  data: DataItem[]
}

export const ForecastBarChart: FC<ForecastBarChartPropType> = ({ data }) => {
  const MAX_Y_VALUE = 5 // Max suction tension

  return (
    <div
      className="w-full h-full grid gap-[2px]"
      style={{
        gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${MAX_Y_VALUE}, minmax(0, 1fr))`,
      }}
    >
      {data.map((dataItem) => {
        return (
          <div
            key={dataItem.date}
            className={classNames(
              'relative flex justify-center',
              'overflow-hidden',
              'row-start-[-1]',
              getRingClassesByLevel(dataItem.suctionTensionLevel).bg
            )}
            style={{ gridRowEnd: -(dataItem.suctionTensionLevel + 1) }}
          >
            {/* <span className="absolute bottom-0 w-full -rotate-90 -translate-y-full whitespace-nowrap">
              {dataItem.xValue}
            </span> */}
          </div>
        )
      })}
    </div>
  )
}
