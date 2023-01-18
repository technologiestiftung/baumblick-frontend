import { FC } from 'react'

export interface ProgressCirclePropType {
  progress: number
  strokeColorBackground?: string
  fillColor?: string
  size?: number
}

export const ProgressCircle: FC<ProgressCirclePropType> = ({
  progress,
  strokeColorBackground = '#9EA3AE',
  fillColor = '#111827',
  size = 50,
}) => {
  const adjustedSize = size - 1 // do not make the circle full width of the stage, or it will look cut off
  const hundredPercentArea = Math.PI * Math.pow(adjustedSize / 2, 2)
  const progressArea = progress * hundredPercentArea

  const progressRadius = Math.sqrt(progressArea / Math.PI)

  return (
    <div className="datavis-icons__progress-circle__wrapper">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={adjustedSize / 2}
          stroke={strokeColorBackground}
          strokeDasharray="2 2"
          strokeWidth="1"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={progressRadius}
          fill={fillColor}
          stroke="none"
        />
      </svg>
    </div>
  )
}
