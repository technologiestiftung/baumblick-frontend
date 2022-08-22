import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import ReactDOM from 'react-dom'
import { Pill } from '@components/Pill'
import { getClassesByScaleId } from '@lib/utils/getClassesByScaleId'
import { WaterSupplyLevelType } from '@lib/utils/mapSuctionTensionToLevel'

export interface SuctionTensionLegendType {
  collapsable?: boolean
  initiallyCollapsed?: boolean
  hasShadow?: boolean
  className?: string
}

export const SuctionTensionLegend: FC<SuctionTensionLegendType> = ({
  collapsable = false,
  initiallyCollapsed = false,
  hasShadow = false,
  className = '',
}) => {
  const { t } = useTranslation('common')
  const [isCollapsed, setIsCollapsed] = useState(initiallyCollapsed)
  const [bodyNode, setBodyNode] = useState<HTMLElement | null>(null)

  const levels = t('legend.map.levels', {}, { returnObjects: true })

  useEffect(() => {
    const domNode = document.querySelector('body')
    if (!domNode) return
    setBodyNode(domNode)
  }, [])

  const toggleCollapsed = (): void => {
    setIsCollapsed(!isCollapsed)
  }
  if (!bodyNode) return null

  return ReactDOM.createPortal(
    <div className="fixed w-full left-0 top-2 md:top-4 pointer-events-none">
      <div className="w-full max-w-3xl mx-auto">
        <div
          {...(collapsable
            ? { role: 'button', tabIndex: 0, onClick: toggleCollapsed }
            : {})}
          className={classNames(
            className,
            'group ml-2 md:ml-4 pointer-events-auto',
            'inline-block',
            'w-[150px] min-w-[80px]',
            collapsable && isCollapsed && 'translate-y-3',
            collapsable && 'w-full px-3',
            collapsable &&
              !isCollapsed &&
              'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white',
            !isCollapsed && [
              'py-2',
              'bg-white',
              'rounded border border-gray-300',
              'flex flex-wrap place-content-between gap-1',
            ],
            hasShadow && !isCollapsed && 'shadow-md'
          )}
        >
          <h2 className="w-full text-sm font-semibold">
            {t('legend.map.title')}
          </h2>
          <ul>
            {Object.entries(levels).map(([id, label]) => {
              return (
                <li
                  key={id}
                  className={classNames(
                    'mt-1 first-of-type:mt-0',
                    'flex gap-2 items-center'
                  )}
                >
                  <Pill
                    className={classNames(
                      'border',
                      Object.values(
                        getClassesByScaleId(id as WaterSupplyLevelType['id'])
                      )
                    )}
                  />
                  <span className="text-xs font-semibold text-gray-800">
                    {label}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>,
    bodyNode
  )
}
