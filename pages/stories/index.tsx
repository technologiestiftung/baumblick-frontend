import { Affiliate, Plant, WateringCan } from '@components/Icons'
import { StoriesOverviewHeader } from '@components/StoriesOverviewHeader'
import { StoryLink, StoryLinkPropType } from '@components/StoryLink'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

export const stories: Record<string, StoryLinkPropType> = {
  'wie-giesse-ich-richtig': {
    path: `/stories/wie-giesse-ich-richtig`,
    title: `Wie gieße ich richtig?`,
    author: `Grünflächenamt Berlin-Mitte`,
    readingDurationInMinutes: 3,
    excerpt: (
      <>
        Baumblick zeigt dir den{' '}
        <strong>Wasserstand der Berliner Stadtbäume</strong>.
      </>
    ),
    leadParagraph:
      'Gießen ist gut. Kann man aber auch falsch machen. Haste net gedacht, wat?',
    Icon: WateringCan,
  },
  'ki-fuer-die-berechnung-des-wasserbedarfs': {
    path: `/stories/ki-fuer-die-berechnung-des-wasserbedarfs`,
    title: `Wie wird KI für die Berechnung des Wasserbedarfs eingesetzt?`,
    author: `Marcus Voß`,
    readingDurationInMinutes: 12,
    excerpt: (
      <>
        Wie kann künstliche Intelligenz{' '}
        <strong>Messwerte von Sensoren vorhersagen</strong> – auch wenn diese
        gar nicht existieren?
      </>
    ),
    Icon: Affiliate,
  },
  'saugspannung-und-sensoren': {
    path: `/stories/saugspannung-und-sensoren`,
    title: `Über Saugspannung und Sensoren`,
    author: `Arbor Revital`,
    readingDurationInMinutes: 4,
    excerpt: (
      <>
        Was genau ist eine Saugspannung und welche Sensoren nutzt die Stadt
        Berlin bereits?
      </>
    ),
    Icon: Plant,
  },
  'qtrees-konsortium': {
    path: `/stories/qtrees-konsortium`,
    title: `Das "Quantified Trees" Konsortium`,
    author: `Julia Zimmermann`,
    readingDurationInMinutes: 6,
    excerpt: <>Das Konsortium: wer steckt hinter Qtrees und Baumblick?</>,
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
