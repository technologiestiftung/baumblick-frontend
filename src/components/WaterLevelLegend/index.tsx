import { ArrowsDiagonal } from '@components/Icons/ArrowsDiagonal'
import { ArrowsDiagonalMinimize2 } from '@components/Icons/ArrowsDiagonalMinimize2'
import classNames from 'classnames'
import { FC, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import colors from '../../style/colors'

export interface WaterLevelLegendType {
  collapsable?: boolean
  initiallyCollapsed?: boolean
  hasShadow?: boolean
}

const wrapperWhenExpandedStyles = classNames(
  'py-2',
  'bg-white',
  'rounded-sm border border-gray-200',
  'flex flex-wrap place-content-between'
)

const legendColors = Object.entries(colors.scale)
  .filter(([colorKey]) => !colorKey.includes('-dark'))
  .map(([, colorValue]) => colorValue)

export const WaterLevelLegend: FC<WaterLevelLegendType> = ({
  collapsable = false,
  initiallyCollapsed = false,
  hasShadow = false,
}) => {
  const { t } = useTranslation('common')
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed)

  const toggleCollapsed = (): void => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div
      className={classNames(
        'relative px-3',
        isCollapsed && 'translate-y-3',
        !isCollapsed && wrapperWhenExpandedStyles,
        hasShadow && !isCollapsed && 'shadow-md'
      )}
    >
      {!isCollapsed && (
        <h2 className="w-full text-sm font-semibold">
          {t('legend.map.title')}
        </h2>
      )}
      <div
        className={classNames(
          'my-1',
          'w-full',
          'bg-gray-200',
          'rounded-full',
          isCollapsed && 'ring-2 ring-white',
          'grid grid-flow-col gap-0'
        )}
      >
        {legendColors.map((color, idx) => {
          return (
            <div
              key={color}
              style={{ backgroundColor: color }}
              className={classNames(
                'w-auto h-full text-xs flex text-center place-content-center',
                'first-of-type:rounded-l-full last-of-type:rounded-r-full',
                'text-gray-900/50'
              )}
            >
              {idx + 1}
            </div>
          )
        })}
      </div>
      {!isCollapsed && (
        <>
          <span className="text-xs font-semibold text-gray-800">
            {t('legend.map.start')}
          </span>
          <span className="text-xs font-semibold text-gray-800">
            {t('legend.map.end')}
          </span>
        </>
      )}
      {collapsable && (
        <button
          className={classNames(
            'absolute bottom-0 right-0',
            'bg-white',
            'rounded-full',
            'w-8 h-8',
            'border border-gray-200',
            'translate-x-1/2 translate-y-1/2',
            'flex justify-center items-center'
          )}
          onClick={toggleCollapsed}
        >
          {isCollapsed ? (
            <ArrowsDiagonal className="rotate-90" />
          ) : (
            <ArrowsDiagonalMinimize2 className="rotate-90" />
          )}
        </button>
      )}
    </div>
  )
}
