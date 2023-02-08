import { FC } from 'react'
import classNames from 'classnames'

export interface IconWaterDropPropType {
  fill?: string
  stroke?: string
}
const IconWaterDrop: FC<IconWaterDropPropType> = ({
  fill = '#111827',
  stroke = '#9EA3AE',
}) => (
  <svg
    width="14"
    height="18"
    viewBox="0 0 14 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.00212 0.713873C7.02675 0.732309 7.05358 0.752788 7.0826 0.775383C7.27783 0.927392 7.54729 1.1557 7.86698 1.44976C8.50574 2.03731 9.32986 2.87346 10.1435 3.85961C11.7936 5.85952 13.3071 8.36515 13.3071 10.6284C13.3071 12.9507 12.4848 14.5719 11.3134 15.6174C10.1318 16.6722 8.55493 17.176 7.00074 17.176C5.4466 17.176 3.86976 16.6719 2.68806 15.617C1.51668 14.5713 0.694336 12.9501 0.694336 10.6284C0.694336 8.3658 2.20813 5.8605 3.85852 3.86071C4.67232 2.87462 5.49659 2.03852 6.13546 1.45097C6.45521 1.15692 6.72472 0.928616 6.91998 0.776607C6.94965 0.753511 6.97703 0.732625 7.00212 0.713873Z"
      fill={fill}
      stroke={stroke}
    />
  </svg>
)

export interface ProgressWaterDropPropType {
  numDrops: number
  strokeColor?: string
  fillColor?: string
  className?: string
}
export const ProgressWaterDrop: FC<ProgressWaterDropPropType> = ({
  numDrops,
  strokeColor = '#9EA3AE',
  fillColor = '#111827',
  className,
}) => {
  return (
    <ul
      dir="rtl" // right to left, so that drops overlap correctly whithout the need for z-indicies
      className={classNames('inline-flex flex-row', className)}
    >
      {Array(5)
        .fill(null, 0)
        .map((_, index) => {
          return (
            <li
              className="-ml-[5px] last-of-type:ml-0"
              key={`water-drop-${index}`}
            >
              <IconWaterDrop
                stroke={strokeColor}
                fill={index + 1 <= 5 - numDrops ? 'white' : fillColor}
              />
            </li>
          )
        })}
    </ul>
  )
}
