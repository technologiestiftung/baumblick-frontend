import { useCallback, useRef, useState } from 'react'
import { useAnimationFrame } from '../useAnimationFrame'

type UseHasScrolledPastThresholdType = (opts: {
  threshold: number
  scrollParent?: string | HTMLElement | null
}) => {
  hasScrolledPastThreshold: boolean
  isScrollingUp: boolean
}

export const useHasScrolledPastThreshold: UseHasScrolledPastThresholdType = ({
  threshold,
  scrollParent,
}) => {
  const prevScrollY = useRef(0)
  const [isScrollingUp, setIsScrollingUp] = useState(false)
  const [hasScrolledPastThreshold, setHasScrolledPastThreshold] =
    useState(false)

  const animationFrameCallback = useCallback(
    function onAnimationFrame(): void {
      let currentScrollY = 0

      if (typeof scrollParent === 'string') {
        const scrollParentEl = document.querySelector(scrollParent)
        if (!scrollParentEl) return
        currentScrollY = scrollParentEl.scrollTop
      } else if (scrollParent?.scrollTop) {
        currentScrollY = scrollParent.scrollTop
      } else {
        currentScrollY = document.querySelector('main')?.scrollTop || 0
      }
      if (currentScrollY > threshold) {
        setHasScrolledPastThreshold(true)
      }
      if (currentScrollY < threshold) {
        setHasScrolledPastThreshold(false)
      }

      if (prevScrollY.current < currentScrollY) {
        setIsScrollingUp(false)
      } else if (prevScrollY.current > currentScrollY) {
        setIsScrollingUp(true)
      }

      prevScrollY.current = currentScrollY
    },
    [scrollParent, threshold]
  )

  useAnimationFrame(animationFrameCallback)

  return {
    hasScrolledPastThreshold,
    isScrollingUp,
  }
}
