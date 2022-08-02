import { Header } from '@components/Header'
import { useHasScrolledPastThreshold } from '@lib/hooks/useHasScrolledPastThreshold'
import classNames from 'classnames'
import { FC, useEffect, useRef, useState } from 'react'

export const SCROLL_THRESHOLD = 10

export const StoriesOverviewHeader: FC = () => {
  const headerRef = useRef<HTMLElement | null>(null)
  const [headerHeight, setHeaderHeight] = useState(120)
  const { hasScrolledPastThreshold } = useHasScrolledPastThreshold({
    threshold: SCROLL_THRESHOLD,
    scrollParent: 'main',
  })

  useEffect(() => {
    if (!headerRef.current) return
    setHeaderHeight(headerRef.current.getBoundingClientRect().height)
  }, [])

  return (
    <>
      <header
        className={classNames(
          'fixed bg-white shadow-gray-400/10 z-10',
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
          Stories
        </h1>
      </header>
      <div style={{ height: headerHeight || 121 }} />
    </>
  )
}
