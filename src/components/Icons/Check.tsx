import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const Check: FC<IconPropType> = ({
  color1,
  color2,
  color3,
  strokeWidth = 2,
  size = 24,
  ...props
}) => {
  const col1 = color1 || color2 || color3 || color1
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      {...props}
    >
      <polyline
        fill="none"
        stroke={col1}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        points="0 5 5 10 15 0"
        transform="translate(5 7)"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
