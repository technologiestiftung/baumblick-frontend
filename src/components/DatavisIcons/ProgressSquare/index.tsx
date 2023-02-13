import { FC } from 'react'
import colors from './../../../style/colors'

export interface ProgressSquarePropType {
  progress: number
  strokeColorBackground?: string
  fillColor?: string
  className?: string
}

export const ProgressSquare: FC<ProgressSquarePropType> = ({
  progress,
  strokeColorBackground = colors.gray['400'],
  fillColor = colors.gray['900'],
  className,
}) => {
  const hundredPercentArea = Math.pow(50, 2)
  const progressArea = progress * hundredPercentArea

  const progressAreaSideLength = Math.sqrt(progressArea)
  const sideLengthOffset = 50 - progressAreaSideLength

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="0.5"
        y="0.5"
        width="49"
        height="49"
        stroke={strokeColorBackground}
        strokeDasharray="2 2"
      />
      <rect
        x="0"
        y={sideLengthOffset}
        width={progressAreaSideLength}
        height={progressAreaSideLength}
        fill={fillColor}
      />
    </svg>
  )
}
