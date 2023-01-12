import { FC } from 'react'
import { IconPropType } from './IconPropType'

export const ArrowDownHero: FC<IconPropType> = ({
  color1,
  strokeWidth = 2,
  size = 24,
  ...props
}) => {
  const col1 = color1
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.0861 3.7207L12.0861 20.0627"
        stroke={col1 || 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M4.50017 12.5625L11.8586 19.9212C11.9367 19.9993 12.0634 19.9993 12.1415 19.9212L19.5002 12.5625"
        stroke={col1 || 'currentColor'}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}
