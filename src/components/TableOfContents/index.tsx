import classNames from 'classnames'
import { DOMAttributes, FC } from 'react'

const scaleClasses = [
  'border-gradient-1',
  'border-gradient-2',
  'border-gradient-3',
  'border-gradient-4',
  'border-gradient-5',
]

interface ChapterType {
  title: string
}

export interface TableOfContentsPropType {
  chapters: ChapterType[]
  onChapterClick?: (title: ChapterType['title']) => void
  activeChapterTitle?: string
}

interface ChapterLinkPropType extends ChapterType {
  onClick: TableOfContentsPropType['onChapterClick']
  colorClass: string
  isActive?: boolean
}

const ChapterLink: FC<ChapterLinkPropType> = ({
  title,
  onClick = () => undefined,
  colorClass = scaleClasses[0],
  isActive = false,
}) => {
  const onChapterClick: DOMAttributes<HTMLElement>['onClick'] = (evt) => {
    evt.preventDefault()
    onClick(title)
  }
  const onKeyUp: DOMAttributes<HTMLElement>['onKeyUp'] = (evt) => {
    if (evt.key !== 'enter') return
    evt.preventDefault()
    onClick(title)
  }

  const wrapperStyles = classNames('block')
  const linkStyles = classNames(
    colorClass,
    'py-1 block transition-all pr-4',
    'hover:text-gray-900 text-left',
    'hover:border-l-8 md:hover:border-l-10 hover:pl-5 md:hover:pl-8',
    isActive ? 'font-bold text-gray-900' : 'font-medium text-gray-600',
    isActive ? 'border-l-[12px] pl-4 md:pl-6' : 'border-l-4 pl-6 md:pl-8',
    'focus:outline-none focus:ring-2 focus:ring-gray-900'
  )

  return (
    <li className={wrapperStyles}>
      <button onClick={onChapterClick} onKeyUp={onKeyUp} className={linkStyles}>
        {title}
      </button>
    </li>
  )
}

export const TableOfContents: FC<TableOfContentsPropType> = ({
  chapters,
  onChapterClick = () => undefined,
  activeChapterTitle,
}) => (
  <ul className={classNames()}>
    {chapters.map((chapter, idx) => (
      <ChapterLink
        key={chapter.title}
        {...chapter}
        onClick={onChapterClick}
        isActive={chapter.title === activeChapterTitle}
        colorClass={scaleClasses[Math.min(idx, scaleClasses.length - 1)]}
      />
    ))}
  </ul>
)
