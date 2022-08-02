import { useIntersectingElements } from '../useIntersectingElements'

type UseActiveElementTitleType = (opts: {
  setActiveTitle: (title: string | null) => void
  parent: Element | null
  selector: string
}) => void

export const useActiveElementTitle: UseActiveElementTitleType = ({
  setActiveTitle,
  parent,
  selector,
}) => {
  useIntersectingElements({
    elements: Array.from(parent?.querySelectorAll(selector) || []),
    setActiveElement: (el) => {
      setActiveTitle(el?.textContent || null)
    },
  })
}
