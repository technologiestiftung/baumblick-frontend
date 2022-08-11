import { Affiliate, Plant, WateringCan } from '@components/Icons'
import { StoriesOverviewHeader } from '@components/StoriesOverviewHeader'
import { StoryLink, StoryLinkPropType } from '@components/StoryLink'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

export const stories: Record<string, StoryLinkPropType> = {
  'wie-giesse-ich-richtig': {
    path: `/stories/wie-giesse-ich-richtig`,
    title: `Wie gieße ich richtig?`,
    author: `Markus Voß`,
    readingDurationInMinutes: 2,
    excerpt: (
      <>
        TreeWatch zeigt dir den{' '}
        <strong>Wasserstand der Berliner Stadtbäume</strong>.
      </>
    ),
    leadParagraph:
      'Gießen ist gut. Kann man aber auch falsch machen. Haste net gedacht oder wat?',
    Icon: WateringCan,
  },
  'wie-ist-ki-fuer-die-berechnung-des-wasserbedarfs-eingesetzt': {
    path: `/stories/wie-ist-ki-fuer-die-berechnung-des-wasserbedarfs-eingesetzt`,
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
    title: `Das "Quantified Trees" Konsortium`,
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
  'wie-ist-ki-fuer-die-berechnung-des-wasserbedarfs-eingesetzt-2': {
    path: `/stories/wie-ist-ki-fuer-die-berechnung-des-wasserbedarfs-eingesetzt`,
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
  'das-quantified-trees-konsortium-2': {
    path: `/stories/das-quantified-trees-konsortium`,
    title: `Das "Quantified Trees" Konsortium`,
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
  'wie-ist-ki-fuer-die-berechnung-des-wasserbedarfs-eingesetzt-3': {
    path: `/stories/wie-ist-ki-fuer-die-berechnung-des-wasserbedarfs-eingesetzt`,
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
  'das-quantified-trees-konsortium-3': {
    path: `/stories/das-quantified-trees-konsortium`,
    title: `Das "Quantified Trees" Konsortium`,
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

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Stories',
    query,
  },
})

export const Stories: FC = () => (
  <>
    <StoriesOverviewHeader />
    {Object.values(stories).map((story) => (
      <StoryLink {...story} key={story.path} />
    ))}
  </>
)

export default Stories
