import classNames from 'classnames'
import { FC } from 'react'
import colors from '../../style/colors'

const legendColors = Object.entries(colors.scale)
  .filter(([colorKey]) => !colorKey.includes('-dark'))
  .map(([, colorValue]) => colorValue)

export const SuctionTensionScale: FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <span
      className={classNames(
        className,
        'font-sans',
        'inline-grid grid-flow-col gap-0'
      )}
    >
      {legendColors.map((color, idx) => {
        return (
          <span
            key={color}
            style={{ backgroundColor: color }}
            className={classNames(
              'px-1',
              'w-auto h-full text-xs flex text-center place-content-center',
              'first-of-type:rounded-l-full last-of-type:rounded-r-full',
              'text-gray-900/50 font-bold'
            )}
          >
            {idx + 1}
          </span>
        )
      })}
    </span>
  )
}
