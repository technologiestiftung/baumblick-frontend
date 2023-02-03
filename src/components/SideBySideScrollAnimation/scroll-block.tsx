import React, { useRef } from 'react'

import useInViewProgress from '@lib/hooks/useElementInViewProgress'

interface ScrollBlockProps {
  windowHeight: number | undefined
  callback: (inside: number) => void
  offset?: number
  subtractScreenHeight?: boolean
  children?: JSX.Element | JSX.Element[]
}
const ScrollBlock = ({
  windowHeight,
  callback,
  children,
  offset = 0,
}: ScrollBlockProps): JSX.Element => {
  const scrollBlockRef: React.RefObject<HTMLDivElement> | null = useRef(null)

  useInViewProgress({
    windowHeight,
    scrollEventElementId: 'main',
    trackedElementRef: scrollBlockRef,
    effect: (p) => {
      callback(p.inside)
    },
    deps: [scrollBlockRef.current, windowHeight, callback],
    offset,
  })

  return (
    <div className="h-[50vh] mb-40" ref={scrollBlockRef}>
      {children && children}
    </div>
  )
}

export default ScrollBlock
