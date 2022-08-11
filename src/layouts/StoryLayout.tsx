import { Headline } from '@components/Headline'
import { useRouter } from 'next/router'
import { stories } from '../../pages/stories'
import colors from '../../src/style/colors'
import { FC, useEffect, useRef, useState } from 'react'
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
  const [contentParent, setContentParent] = useState<HTMLElement | null>(null)
  const [showStickyTableOfContents, setShowStickyTOC] = useState(false)
  const { headings, scrollToHeading, activeHeadingTitle } =
    useHeadingsData(contentParent)
  const { hasScrolledPastThreshold, isScrollingUp } =
    useHasScrolledPastThreshold({
      threshold: 600,
    })
  const story =
    typeof query.id === 'string' && query.id in stories
      ? stories[query.id]
      : Object.values(stories)[0]

  useEffect(() => {
    if (!contentRef.current) return
    setContentParent(contentRef.current)
  }, [])

  const backLink = (
    <InternalLink
      href="/stories"
      className={classNames(
        'font-semibold text-gray-500 block mb-4',
        'focus:outline-none focus:ring-2 focus:ring-gray-900',
        'focus:ring-offset-2 focus:ring-offset-white'
      )}
    >
      ← {t('stories.backToStoriesLink')}
    </InternalLink>
  )

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
      <section className="px-4 md:px-8 pt-6 pb-2">
        {backLink}
        <div className="grid grid-cols-[1fr,auto] gap-2">
          <Headline h1>{story.title}</Headline>
          <story.Icon
            size={80}
            strokeWidth={4}
            color1={colors.scale[1]}
            color2={colors.scale[2]}
            color3={colors.scale[3]}
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
          'fixed w-full left-0 top-16 pointer-events-none h-full'
        )}
      >
        <div
          className={classNames(
            'w-full max-w-3xl mx-auto',
            'bg-gradient-to-br h-full',
            'md:border-r md:border-l border-gray-200',
            'from-white to-white/30 via-white/90',
            'transition-opacity pt-8 backdrop-blur-sm',
            hasScrolledPastThreshold && showStickyTableOfContents
              ? 'opacity-100'
              : 'opacity-0'
          )}
        >
          <div
            className={classNames(
              showStickyTableOfContents && 'pointer-events-auto'
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
        </div>
      </div>
      <article className="px-4 md:px-8 prose font-serif pb-8" ref={contentRef}>
        {children}
      </article>
      <div className="fixed w-full left-0 bottom-[4.5rem] pointer-events-none">
        <div className="w-full max-w-3xl flex justify-end mx-auto">
          <Button
            className={classNames(
              'shadow-md pointer-events-auto',
              'transition-all mr-2',
              hasScrolledPastThreshold
                ? 'opacity-100'
                : 'opacity-0 translate-y-4',
              !hasScrolledPastThreshold && 'pointer-events-none'
            )}
            onClick={() => setShowStickyTOC((v) => !v)}
          >
            {showStickyTableOfContents ? (
              <Cross color1={colors.scale['1']} color2={colors.scale['3']} />
            ) : (
              <HamburgerMenu
                color1={colors.scale['1']}
                color2={colors.scale['2']}
                color3={colors.scale['3']}
              />
            )}
            Inhalte
          </Button>
        </div>
      </div>
      <footer className="px-4 pb-12">
        <Paragraph className="italic text-gray-500">{story.author}</Paragraph>
        <br />
        <hr />
        <br />
        {backLink}
      </footer>
    </>
  )
}

export const StoryLayout: FC = ({ children }) => (
  <I18nProvider lang="de" namespaces={{ common: commonDE }}>
    <StoryLayoutWithoutTranslation>{children}</StoryLayoutWithoutTranslation>
  </I18nProvider>
)
