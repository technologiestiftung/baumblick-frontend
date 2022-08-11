import { ArrowLeft } from '@components/Icons'
import { InternalLink } from '@components/InternalLink'
import { StoryLinkPropType } from '@components/StoryLink'
import { useHeadingsData } from '@lib/hooks/useHeadingData'
import classNames from 'classnames'
import { FC } from 'react'
import colors from 'src/style/colors'

const scaleClasses = [
  'bg-scale-1',
  'bg-scale-2',
  'bg-scale-3',
  'bg-scale-4',
  'bg-scale-5',
]

interface StoryStickyHeaderPropsType {
  headings: ReturnType<typeof useHeadingsData>['headings']
  isVisible: boolean
  story: StoryLinkPropType
  activeHeadingTitle: string | null
}

export const StoryStickyHeader: FC<StoryStickyHeaderPropsType> = ({
  headings,
  isVisible,
  story,
  activeHeadingTitle,
}) => (
  <header className="w-full fixed inset-0 bottom-auto z-10">
    <div
      className={classNames(
        'mx-auto max-w-3xl ',
        'transition-all bg-white shadow-lg border-b border-b-gray-300',
        'md:border-r md:border-l border-l-gray-200 border-r-gray-200',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
      )}
    >
      <div className="relative px-4 py-5 grid grid-cols-[24px,32px,1fr] gap-4 items-center">
        <InternalLink href="/stories" className="text-gray-600">
          <ArrowLeft />
        </InternalLink>
        <story.Icon
          size={32}
          color1={colors.scale['1']}
          color2={colors.scale['2']}
          color3={colors.scale['3']}
        />
        <span className="font-bold text-lg block whitespace-nowrap text-ellipsis overflow-hidden">
          {story.title}
        </span>
        <ul className="absolute left-0 bottom-0 flex h-1 w-full">
          {headings.map(({ title }, idx) => (
            <li
              key={title}
              className={classNames(
                'h-1 w-full',
                idx <=
                  headings.findIndex(
                    ({ element }) => element.textContent === activeHeadingTitle
                  )
                  ? 'opacity-100'
                  : 'opacity-0',
                scaleClasses[Math.min(scaleClasses.length - 1, idx)]
              )}
            />
          ))}
        </ul>
      </div>
    </div>
  </header>
)
