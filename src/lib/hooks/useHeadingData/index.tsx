import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { useActiveElementTitle } from '../useActiveElementTitle'

interface HeadingElement {
  title: string
  element: Element
}

type UseHeadingsDataType = (
  parent: MutableRefObject<HTMLElement | null>['current']
) => {
  headings: HeadingElement[]
  scrollToHeading: (title: HeadingElement['title']) => void
  activeHeadingTitle: string | null
}

export const useHeadingsData: UseHeadingsDataType = (parent) => {
  const [headings, setHeadings] = useState<HeadingElement[]>([])
  const [activeHeadingTitle, setActiveHeadingTitle] = useState<string | null>(
    null
  )
  useActiveElementTitle({
    setActiveTitle: setActiveHeadingTitle,
    selector: 'h2, h3',
    parent,
  })

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
    activeHeadingTitle,
  }
}
