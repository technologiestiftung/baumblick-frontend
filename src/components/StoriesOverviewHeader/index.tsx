import { Header } from '@components/Header'
import { useHasScrolledPastThreshold } from '@lib/hooks/useHasScrolledPastThreshold'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC, useRef } from 'react'

export const SCROLL_THRESHOLD = 10

export const StoriesOverviewHeader: FC = () => {
  const { t } = useTranslation('common')
  const headerRef = useRef<HTMLElement | null>(null)
  const { hasScrolledPastThreshold } = useHasScrolledPastThreshold({
    threshold: SCROLL_THRESHOLD,
    scrollParent: 'main',
  })

  return (
    <>
      <header
        className={classNames(
          'sticky top-0 left-0 bg-white shadow-gray-400/10 z-10',
          'max-w-3xl w-full',
          hasScrolledPastThreshold ? 'shadow-lg' : 'shadow-none'
        )}
        ref={headerRef}
      >
        <Header compact={hasScrolledPastThreshold} />
        <h1
          className={classNames(
            'border-b border-gray-200 px-4',
            'transition-all',
            hasScrolledPastThreshold ? 'pb-3 pt-0' : 'pb-6 pt-3',
            hasScrolledPastThreshold ? 'text-xl' : 'text-3xl',
            hasScrolledPastThreshold ? 'font-bold' : 'font-semibold'
          )}
        >
          {t('stories.title')}
        </h1>
      </header>
    </>
  )
}
