// Source: https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
import { useRef, useEffect, useCallback, DependencyList } from 'react'

interface Position {
  x: number
  y: number
  height: number
}

// helper function
const getScrollPosition = (
  element?: React.MutableRefObject<HTMLElement>
): Position => {
  const isBrowser = typeof window !== `undefined`
  if (!isBrowser) {
    return { x: 0, y: 0, height: 0 }
  }

  // if no element is declared, track the scroll position of the document body
  const target = element ? element.current : document.body

  if (target) {
    const { left, top, height } = target.getBoundingClientRect()
    return { x: left, y: top, height }
  } else {
    return { x: 0, y: 0, height: 0 }
  }
}

//  hook
interface EffectProps {
  prevPos: Position
  currPos: Position
  height: number
  inside: number
}
interface UseInViewProgressProps {
  windowHeight: number
  element: React.MutableRefObject<HTMLElement>
  deps: DependencyList
  effect: (props: EffectProps) => void
  wait?: number
  offset?: number
}
const useInViewProgress = (props: UseInViewProgressProps): void => {
  const {
    windowHeight: height,
    effect,
    deps,
    element,
    wait,
    offset = 0,
  } = props
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null)

  // when a bounding element is given, track its position instead of the elements position
  const position = useRef(getScrollPosition(element))
  const prevInside = useRef(0)

  const callback = useCallback(() => {
    // get the current position
    const currPos = getScrollPosition(element)
    if (currPos) {
      const posY = currPos.y + offset

      let inside = 0
      const diff = height - posY

      if (diff >= 0 && diff <= currPos.height) {
        inside = diff / currPos.height
      } else if (diff > currPos.height) {
        inside = 1
      }

      if (inside !== prevInside.current) {
        effect({
          prevPos: position.current,
          currPos,
          height: currPos.height,
          inside,
        })
      }

      // save current position as previous position for next event
      position.current = currPos
      prevInside.current = inside

      // reset throttle timeout
      throttleTimeout.current = null
    }
  }, [effect, element, offset, height])

  useEffect(() => {
    const handleScroll = (): void => {
      if (wait) {
        if (throttleTimeout.current === null) {
          throttleTimeout.current = setTimeout(callback, wait)
        }
      } else {
        callback()
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
    // eslint-disable-next-line  @typescript-eslint/no-unsafe-assignment, react-hooks/exhaustive-deps
  }, [callback, wait, ...deps])
}

export default useInViewProgress
