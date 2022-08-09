import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import ReactDOM from 'react-dom'
import { SuctionTensionScale } from '@components/SuctionTensionScale'

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
    <span
      {...(collapsable
        ? { role: 'button', tabIndex: 0, onClick: toggleCollapsed }
        : {})}
      className={classNames(
        className,
        'group',
        'inline-block',
        'fixed top-2 left-2',
        'w-[130px] min-w-[80px]',
        collapsable && isCollapsed && 'translate-y-3',
        collapsable && 'w-full px-3',
        collapsable &&
          !isCollapsed &&
          'focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 focus:ring-offset-white',
        !isCollapsed && [
          'py-2',
          'bg-white',
          'rounded-sm border border-gray-200',
          'flex flex-wrap place-content-between gap-1',
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
          'w-full',
          'inline-block',
          'rounded-full',
          isCollapsed && 'ring-2 ring-white',
          collapsable &&
            isCollapsed &&
            'group-focus:outline-none group-focus:ring-2 group-focus:ring-gray-900 group-focus:ring-offset-2 group-focus:ring-offset-white'
        )}
      >
        <SuctionTensionScale className="w-full float-left" />
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
    </span>,
    bodyNode
  )
}
