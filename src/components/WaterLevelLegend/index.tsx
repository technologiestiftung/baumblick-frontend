import classNames from 'classnames'
import { FC, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import colors from '../../style/colors'

export interface WaterLevelLegendType {
  collapsable?: boolean
  initiallyCollapsed?: boolean
  hasShadow?: boolean
}

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
    <span
      {...(collapsable
        ? { role: 'button', tabIndex: 0, onClick: toggleCollapsed }
        : {})}
      className={classNames(
        'group',
        'relative inline-block min-w-[80px] font-sans',
        collapsable && isCollapsed && 'translate-y-3',
        collapsable && 'w-full px-3',
        collapsable &&
          !isCollapsed &&
          'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white',
        !isCollapsed && [
          'py-2',
          'bg-white',
          'rounded-sm border border-gray-200',
          'flex flex-wrap place-content-between',
        ],
        hasShadow && !isCollapsed && 'shadow-md'
      )}
    >
      {!isCollapsed && (
        <h2 className="w-full text-sm font-semibold">
          {t('legend.map.title')}
        </h2>
      )}
      <span
        className={classNames(
          collapsable && 'my-1',
          'w-full',
          'bg-gray-200',
          'rounded-full',
          isCollapsed && 'ring-2 ring-white',
          'grid grid-flow-col gap-0',
          collapsable &&
            isCollapsed &&
            'group-focus:outline-none group-focus:ring-2 group-focus:ring-gray-900 group-focus:ring-offset-2 group-focus:ring-offset-white'
        )}
      >
        {legendColors.map((color, idx) => {
          return (
            <span
              key={color}
              style={{ backgroundColor: color }}
              className={classNames(
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
    </span>
  )
}
