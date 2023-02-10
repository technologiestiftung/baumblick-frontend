import { Headline } from '@components/Headline'
import { Paragraph } from '@components/Paragraph'
import classNames from 'classnames'
import { FC } from 'react'

export type DataVizIconType = 'clock' | 'water-drops' | 'circle' | 'square'

export interface DataListItemPropType {
  title: string
  subtitle: string
  valueLabel?: string
  datavisIcon?: JSX.Element
}

export const DataListItem: FC<DataListItemPropType> = ({
  title,
  subtitle,
  valueLabel,
  datavisIcon,
}) => (
  <li
    className={classNames(
      'grid grid-cols-[1fr,auto] px-8 pt-4 pb-1',
      'border-b border-gray-200'
    )}
  >
    <div>
      <Headline h2>{title}</Headline>
      <Paragraph className="m-0">{subtitle}</Paragraph>
    </div>
    {datavisIcon}

    {!datavisIcon && valueLabel && (
      <span className="text-base">{valueLabel}</span>
    )}
  </li>
)
