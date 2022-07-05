import classNames from 'classnames'
import { FC, useState } from 'react'
import colors from '../../style/colors'

export interface WaterLevelLegendType {
  collapsable?: boolean
  initiallyCollapsed?: boolean
}

const wrapperWhenExpandedStyles = classNames(
  'py-2',
  'bg-white',
  'rounded-sm border border-gray-200',
  'flex flex-wrap place-content-between'
)

export const WaterLevelLegend: FC<WaterLevelLegendType> = ({
  collapsable = true,
  initiallyCollapsed = false,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed)

  const toggleCollapsed = (): void => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div
      className={classNames('px-3', !isCollapsed && wrapperWhenExpandedStyles)}
    >
      {!isCollapsed && <h2 className="w-full font-semibold">Wasserstand</h2>}
      <div
        className={classNames(
          'mt-2 mb-1',
          'w-full h-4',
          'bg-gray-200',
          'rounded-full border border-gray-900 border-opacity-10',
          'grid grid-flow-col gap-0'
        )}
      >
        {Object.values(colors.scale).map((color) => {
          return (
            <div
              key={color}
              style={{ backgroundColor: color }}
              className={classNames(
                'w-auto h-full',
                'first-of-type:rounded-l-full last-of-type:rounded-r-full'
              )}
            ></div>
          )
        })}
      </div>
      {!isCollapsed && (
        <>
          <span className="text-xs font-semibold text-gray-800">Trocken</span>
          <span className="text-xs font-semibold text-gray-800">Versorgt</span>
        </>
      )}
      {collapsable && (
        <button
          className={classNames(
            'absolute top-0 right-0',
            'bg-white',
            'rounded-full',
            'w-8 h-8',
            'border border-gray-200',
            'justify-center items-center',
            'transition-transform',
            isCollapsed ? 'rotate-[135deg]' : '-rotate-45'
          )}
          onClick={toggleCollapsed}
        >
          ←
        </button>
      )}
    </div>
  )
}
