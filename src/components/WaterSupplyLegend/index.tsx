import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import ReactDOM from 'react-dom'
import { Pill } from '@components/Pill'
import { getClassesByStatusId } from '@lib/utils/getClassesByStatusId'
import { WaterSupplyStatusType } from '@lib/utils/mapSuctionTensionToStatus'

export interface WaterSupplyLegendType {
  hasShadow?: boolean
  className?: string
}

export const WaterSupplyLegend: FC<WaterSupplyLegendType> = ({
  hasShadow = false,
  className = '',
  children,
}) => {
  const { t } = useTranslation('common')
  const [bodyNode, setBodyNode] = useState<HTMLElement | null>(null)

  const levels = t('legend.map.levels', {}, { returnObjects: true })

  useEffect(() => {
    const domNode = document.querySelector('body')
    if (!domNode) return
    setBodyNode(domNode)
  }, [])

  if (!bodyNode) return null

  return ReactDOM.createPortal(
    <div className="fixed w-full left-0 top-2 md:top-4 pointer-events-none">
      <div className="w-full max-w-3xl mx-auto">
        <div
          className={classNames(
            className,
            'group ml-2 md:ml-4 pointer-events-auto',
            'inline-block',
            'w-[150px] min-w-[80px]',
            'py-2 px-3',
            'bg-white',
            'rounded border border-gray-300',
            'flex flex-wrap place-content-between gap-1',

            hasShadow && 'shadow-md'
          )}
        >
          <h2 className="w-full text-sm font-semibold">
            {t('legend.map.title')}
          </h2>
          <ul>
            {Object.entries(levels)
              .filter(([id]) => id !== 'unknown')
              .map(([id, label]) => {
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
                          getClassesByStatusId(
                            id as WaterSupplyStatusType['id']
                          )
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
          {children}
        </div>
      </div>
    </div>,
    bodyNode
  )
}
