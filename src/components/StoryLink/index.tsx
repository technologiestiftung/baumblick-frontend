import { Headline } from '@components/Headline'
import { IconPropType } from '@components/Icons/IconPropType'
import { InternalLink } from '@components/InternalLink'
import { Paragraph } from '@components/Paragraph'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC, ReactNode } from 'react'
import colors from '../../style/colors'

export interface StoryLinkPropType {
  path: string
  title: string
  author: string
  readingDurationInMinutes: number
  excerpt: ReactNode
  Icon: FC<IconPropType>
  leadParagraph?: ReactNode
}

export const StoryLink: FC<StoryLinkPropType> = ({
  path,
  title,
  author,
  readingDurationInMinutes,
  excerpt,
  Icon,
}) => {
  const { t } = useTranslation('common')
  return (
    <InternalLink
      href={path}
      className={classNames(
        'grid grid-cols-[auto,1fr] gap-4 px-4 pt-6 pb-3',
        'border-b border-gray-200',
        'transition-colors last-of-type:border-b-0 last-of-type:md:border-b md:border-x',
        'hover:bg-gray-100 active:bg-gray-200',
        'focus:outline-none focus:ring-4 ring-gray-900',
        'focus:bg-gray-100'
      )}
    >
      <Icon
        color1={colors.gradient['1']}
        color2={colors.gradient['2']}
        color3={colors.gradient['3']}
        size={40}
      />
      <section>
        <Headline h2 className="leading-tight">
          {title}
        </Headline>
        <span className="font-serif italic text-gray-600 py-2 block">
          {author} · {readingDurationInMinutes} {t('time.minShortened')}
        </span>
        <Paragraph className="text-gray-500 leading-tight">{excerpt}</Paragraph>
      </section>
    </InternalLink>
  )
}
