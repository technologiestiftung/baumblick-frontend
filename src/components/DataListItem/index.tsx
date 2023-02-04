import { Headline } from '@components/Headline'
import { Paragraph } from '@components/Paragraph'
import { ProgressClock } from '@components/DatavisIcons/ProgressClock'
import { ProgressWaterDrop } from '@components/DatavisIcons/ProgressWaterDrop'
import { ProgressCircle } from '@components/DatavisIcons/ProgressCircle'
import { ProgressSquare } from '@components/DatavisIcons/ProgressSquare'
import classNames from 'classnames'
import { FC } from 'react'

export type DataVizIconType = 'clock' | 'water-drops' | 'circle' | 'square'

export interface DataListItemPropType {
  title: string
  subtitle: string
  iconType?: DataVizIconType
  iconValue?: number
  valueLabel: string
}

export const DataListItem: FC<DataListItemPropType> = ({
  title,
  subtitle,
  valueLabel,
  iconType,
  iconValue,
}) => (
  <li
    className={classNames(
      'grid grid-cols-[1fr,auto] px-8 pt-4 pb-1',
      'border-b border-gray-200'
    )}
  >
    <div>
      <Headline h2>{title}</Headline>
      {/* <span className="text-2xl">{valueLabel}</span> */}
      <Paragraph className="m-0">{subtitle}</Paragraph>
    </div>
    {iconType && iconValue && (
      <div className="col-start-2 flex flex-col justify-start items-center">
        {iconType === 'clock' && <ProgressClock progress={iconValue} />}
        {iconType === 'square' && <ProgressSquare progress={iconValue} />}
        {iconType === 'circle' && <ProgressCircle progress={iconValue} />}
        {iconType === 'water-drops' && (
          <ProgressWaterDrop numDrops={iconValue} className="mt-1" />
        )}
        <span className="text-base mt-1">{valueLabel}</span>
      </div>
    )}
    {(!iconType || !iconValue) && (
      <span className="text-base">{valueLabel}</span>
    )}
  </li>
)
