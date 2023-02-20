import { ProgressClock } from '@components/DatavisIcons/ProgressClock'
import { ProgressWaterDrop } from '@components/DatavisIcons/ProgressWaterDrop'
import { ProgressCircle } from '@components/DatavisIcons/ProgressCircle'
import { ProgressSquare } from '@components/DatavisIcons/ProgressSquare'
import { FC } from 'react'

export type DataVizIconType = 'clock' | 'water-drops' | 'circle' | 'square'

export interface DatavisIconPropType {
  iconType: DataVizIconType
  iconValue: number
  valueLabel: string
}

export const DatavisIcon: FC<DatavisIconPropType> = ({
  iconType,
  iconValue,
  valueLabel,
}) => (
  <div className="col-start-2 flex flex-col justify-start items-center">
    {iconType === 'clock' && <ProgressClock progress={iconValue} />}
    {iconType === 'square' && <ProgressSquare progress={iconValue} />}
    {iconType === 'circle' && <ProgressCircle progress={iconValue} />}
    {iconType === 'water-drops' && (
      <ProgressWaterDrop numDrops={iconValue} className="mt-1" />
    )}
    <span className="text-base mt-1">{valueLabel}</span>
  </div>
)
