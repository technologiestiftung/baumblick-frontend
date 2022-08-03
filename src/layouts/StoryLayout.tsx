import { Headline } from '@components/Headline'
import { useRouter } from 'next/router'
import { stories } from '../../pages/stories'
import colors from '../../src/style/colors'
import { FC, useRef, useState } from 'react'
import { Header } from '@components/Header'
import { InternalLink } from '@components/InternalLink'
import { Paragraph } from '@components/Paragraph'
import { LeadParagraph } from '@components/LeadParagraph'
import { useHasScrolledPastThreshold } from '@lib/hooks/useHasScrolledPastThreshold'
import { useHeadingsData } from '@lib/hooks/useHeadingData'
import { TableOfContents } from '@components/TableOfContents'
import classNames from 'classnames'
import { Button } from '@components/Button'
import { Cross, HamburgerMenu } from '@components/Icons'
import { StoryStickyHeader } from '@components/StoryStickyHeader'
import useTranslation from 'next-translate/useTranslation'
import I18nProvider from 'next-translate/I18nProvider'
import commonDE from '../../locales/de/common.json'

const StoryLayoutWithoutTranslation: FC = ({ children }) => {
  const { t } = useTranslation('common')
  const { query } = useRouter()
  const contentRef = useRef<HTMLElement | null>(null)
  const [showStickyTableOfContents, setShowStickyTOC] = useState(false)
  const { headings, scrollToHeading, activeHeadingTitle } = useHeadingsData(
    contentRef.current
  )
  const { hasScrolledPastThreshold, isScrollingUp } =
    useHasScrolledPastThreshold({
      threshold: 600,
    })
  const story =
    typeof query.id === 'string' && query.id in stories
      ? stories[query.id]
      : Object.values(stories)[0]

  return (
    <>
      <Header className="border-b border-gray-200" />
      <StoryStickyHeader
        headings={headings}
        activeHeadingTitle={activeHeadingTitle}
        story={story}
        isVisible={
          (hasScrolledPastThreshold && isScrollingUp) ||
          showStickyTableOfContents
        }
      />
      <section className="px-4 pt-6 pb-2">
        <InternalLink
          href="/stories"
          className="font-semibold text-gray-500 block mb-4"
        >
          ← {t('stories.backToStoriesLink')}
        </InternalLink>
        <div className="grid grid-cols-[1fr,auto] gap-2">
          <Headline h1>{story.title}</Headline>
          <story.Icon
            size={80}
            strokeWidth={4}
            color1={colors.scale[8]}
            color2={colors.scale[5]}
            color3={colors.scale[2]}
          />
        </div>
        <Paragraph className="italic text-gray-500">
          {story.author} · {story.readingDurationInMinutes}{' '}
          {t('time.minShortened')}
        </Paragraph>
        {story.leadParagraph && (
          <LeadParagraph>{story.leadParagraph}</LeadParagraph>
        )}
      </section>
      <nav className="mb-8">
        <TableOfContents chapters={headings} onChapterClick={scrollToHeading} />
      </nav>
      <div
        className={classNames(
          'fixed inset-0 top-16 bg-gradient-to-br',
          'from-white to-white/30 via-white/90',
          'transition-opacity pt-8 backdrop-blur-sm',
          hasScrolledPastThreshold && showStickyTableOfContents
            ? 'opacity-100'
            : 'opacity-0',
          !showStickyTableOfContents && 'pointer-events-none'
        )}
      >
        <TableOfContents
          chapters={headings}
          onChapterClick={(chap) => {
            setShowStickyTOC(false)
            scrollToHeading(chap)
          }}
          activeChapterTitle={activeHeadingTitle || undefined}
        />
      </div>
      <article className="px-4 prose font-serif pb-8" ref={contentRef}>
        {children}
      </article>
      <Button
        className={classNames(
          'fixed right-2 bottom-[4.5rem] shadow-md',
          'transition-all',
          hasScrolledPastThreshold ? 'opacity-100' : 'opacity-0 translate-y-4',
          !hasScrolledPastThreshold && 'pointer-events-none'
        )}
        onClick={() => setShowStickyTOC((v) => !v)}
      >
        {showStickyTableOfContents ? (
          <Cross color1={colors.scale['8']} color2={colors.scale['5']} />
        ) : (
          <HamburgerMenu
            color1={colors.scale['8']}
            color2={colors.scale['5']}
            color3={colors.scale['3']}
          />
        )}
        Inhalte
      </Button>
      <footer className="px-4 pb-12">
        <Paragraph className="italic text-gray-500">{story.author}</Paragraph>
        <br />
        <hr />
        <InternalLink
          href="/stories"
          className="font-semibold text-gray-500 block mt-8"
        >
          ← {t('stories.backToStoriesLink')}
        </InternalLink>
      </footer>
    </>
  )
}

export const StoryLayout: FC = ({ children }) => (
  <I18nProvider lang="de" namespaces={{ common: commonDE }}>
    <StoryLayoutWithoutTranslation>{children}</StoryLayoutWithoutTranslation>
  </I18nProvider>
)
