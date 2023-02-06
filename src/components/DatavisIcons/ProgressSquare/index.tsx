import { FC } from 'react'

export interface ProgressSquarePropType {
  progress: number
  strokeColorBackground?: string
  fillColor?: string
}

export const ProgressSquare: FC<ProgressSquarePropType> = ({
  progress,
  strokeColorBackground = '#9EA3AE',
  fillColor = '#111827',
}) => {
  const hundredPercentArea = Math.pow(50, 2)
  const progressArea = progress * hundredPercentArea

  const progressAreaSideLength = Math.sqrt(progressArea)

  return (
    <div className="datavis-icons__progress-square__wrapper">
      <svg
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
          y="0"
          width={progressAreaSideLength}
          height={progressAreaSideLength}
          fill={fillColor}
        />
      </svg>
    </div>
  )
}
