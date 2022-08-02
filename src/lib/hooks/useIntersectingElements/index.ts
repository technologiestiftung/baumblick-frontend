import { useEffect, useRef } from 'react'

type ElementsMapType = Record<string, IntersectionObserverEntry>

interface IntersectionObserverOptionsType {
  rootMargin?: string
  elements: Element[]
  setActiveElement: (el: Element | null) => void
}

export const useIntersectingElements = ({
  rootMargin = '0px 0px -40% 0px',
  elements,
  setActiveElement,
}: IntersectionObserverOptionsType): void => {
  const elementsMapRef = useRef<ElementsMapType>({})

  useEffect(() => {
    if (elements.length === 0) return

    const callback = (els: IntersectionObserverEntry[]): void => {
      elementsMapRef.current = els.reduce((map, el): ElementsMapType => {
        map[el.target.textContent || ''] = el
        return map
      }, elementsMapRef.current)

      const visibleElements: IntersectionObserverEntry[] = []
      Object.keys(elementsMapRef.current).forEach((key) => {
        const element = elementsMapRef.current[key]
        if (element.isIntersecting) visibleElements.push(element)
      })

      if (visibleElements.length === 1) {
        setActiveElement(visibleElements[0].target)
      } else if (visibleElements.length > 1) {
        const sortedVisibleHeadings = visibleElements.sort(
          (a, b) => a.intersectionRatio - b.intersectionRatio
        )
        setActiveElement(sortedVisibleHeadings[0].target)
      }
    }

    const observer = new IntersectionObserver(callback, { rootMargin })

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [rootMargin, setActiveElement, elements])
}
