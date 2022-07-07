import { Header } from '@components/Header'
import { Headline } from '@components/Headline'
import { Affiliate, Plant, WateringCan } from '@components/Icons'
import { IconPropType } from '@components/Icons/IconPropType'
import { InternalLink } from '@components/InternalLink'
import { Paragraph } from '@components/Paragraph'
import classNames from 'classnames'
import { GetServerSideProps } from 'next'
import { FC, ReactNode } from 'react'
import colors from '../../src/style/colors'

interface StoryLinkPropType {
  path: string
  title: string
  author: string
  readingDurationInMinutes: number
  excerpt: ReactNode
  Icon: FC<IconPropType>
}

export const stories: Record<string, StoryLinkPropType> = {
  'wie-giesse-ich-richtig': {
    path: `/stories/wie-giesse-ich-richtig`,
    title: `Wie gieße ich richtig?`,
    author: `Markus Voß`,
    readingDurationInMinutes: 2,
    excerpt: (
      <>
        Der QTrees Baummonitor zeigt dir den{' '}
        <strong>Wasserstand der Berliner Stadtbäume</strong>.
      </>
    ),
    Icon: WateringCan,
  },
  'wie-ist-ki-für-die-berechnung-des-wasserbedarfs-eingesetzt': {
    path: `/stories/wie-ist-ki-für-die-berechnung-des-wasserbedarfs-eingesetzt`,
    title: `Wie ist KI für die Berechnung des Wasserbedarfs eingesetzt?`,
    author: `Juan Carlos Carvajal Bermúdez`,
    readingDurationInMinutes: 20,
    excerpt: (
      <>
        Küsntliche Intelligenz kann fehlende <strong>Sensordaten</strong>{' '}
        ergänzen.
      </>
    ),
    Icon: Affiliate,
  },
  'das-quantified-trees-konsortium': {
    path: `/stories/das-quantified-trees-konsortium`,
    title: `Das "Quantified Trees" (QTrees) Konsortium`,
    author: `Julia Zimmermann`,
    readingDurationInMinutes: 12,
    excerpt: (
      <>
        Das Konsortium will dem Baumsterben langfristig entgegenwirken, indem es
        ein durch künstliche Intelligenz unterstütztes Vorhersagesystem
        entwickelt
      </>
    ),
    Icon: Plant,
  },
}

const StoryLink: FC<StoryLinkPropType> = ({
  path,
  title,
  author,
  readingDurationInMinutes,
  excerpt,
  Icon,
}) => (
  <InternalLink
    href={path}
    className={classNames(
      'grid grid-cols-[auto,1fr] gap-4 px-4 pt-6 pb-3',
      'border-b border-gray-200',
      'transition-colors',
      'hover:bg-gray-100 active:bg-gray-200',
      'focus:outline-none focus:ring-4 ring-gray-900',
      'focus:bg-gray-100'
    )}
  >
    <Icon
      color1={colors.scale['8']}
      color2={colors.scale['5']}
      color3={colors.scale['2']}
      size={40}
    />
    <section>
      <Headline h2 className="leading-tight">
        {title}
      </Headline>
      <span className="font-serif italic text-gray-600 py-2 block">
        {author} · {readingDurationInMinutes} Min
      </span>
      <Paragraph className="text-gray-500 leading-tight">{excerpt}</Paragraph>
    </section>
  </InternalLink>
)

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Stories',
    query,
  },
})

export const Stories: FC = () => (
  <>
    <Header />
    <Headline h1 className="pb-6 pt-3 px-4 border-b border-gray-200">
      Stories
    </Headline>
    {Object.values(stories).map((story) => (
      <StoryLink {...story} key={story.path} />
    ))}
  </>
)

export default Stories
