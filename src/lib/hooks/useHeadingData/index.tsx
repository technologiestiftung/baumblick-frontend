import { MutableRefObject, useCallback, useEffect, useState } from 'react'

interface HeadingElement {
  title: string
  element: Element
}

export const useHeadingsData = (
  parent: MutableRefObject<HTMLElement | null>['current']
): {
  headings: HeadingElement[]
  scrollToHeading: (title: HeadingElement['title']) => void
} => {
  const [headings, setHeadings] = useState<HeadingElement[]>([])

  useEffect(() => {
    if (!parent) return
    const headingElements = Array.from(parent.querySelectorAll('h2, h3'))

    setHeadings(
      headingElements
        .filter((el) => el.textContent)
        .map((el) => ({
          title: el.textContent || '',
          element: el,
        }))
    )
  }, [parent])

  const scrollToHeading = useCallback(
    (title) => {
      const allHeadings = Array.from(parent?.querySelectorAll('h2, h3') || [])
      const hEl = allHeadings.find((headEl) => headEl.textContent === title)
      if (!hEl) return
      hEl.scrollIntoView({ behavior: 'smooth' })
    },
    [parent]
  )

  return {
    headings,
    scrollToHeading,
  }
}
