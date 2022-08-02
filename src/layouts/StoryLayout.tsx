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
import { ArrowLeft, Cross, HamburgerMenu } from '@components/Icons'

export const StoryLayout: FC = ({ children }) => {
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

  console.log(hasScrolledPastThreshold, isScrollingUp)
  return (
    <>
      <Header className="border-b border-gray-200" />
      <header
        className={classNames(
          'grid grid-cols-[24px,32px,1fr] gap-4 items-center',
          'transition-all bg-white shadow-lg border-b border-b-gray-300',
          'px-4 py-5 fixed inset-0 bottom-auto z-10',
          (hasScrolledPastThreshold && isScrollingUp) ||
            showStickyTableOfContents
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-full'
        )}
      >
        <InternalLink href="/stories" className="text-gray-600">
          <ArrowLeft />
        </InternalLink>
        <story.Icon
          size={32}
          color1={colors.scale[8]}
          color2={colors.scale[5]}
          color3={colors.scale[2]}
        />
        <span className="font-bold text-lg block whitespace-nowrap text-ellipsis overflow-hidden">
          {story.title}
        </span>
      </header>
      <section className="px-4 pt-6 pb-2">
        <InternalLink
          href="/stories"
          className="font-semibold text-gray-500 block mb-4"
        >
          ← Zurück zu der Stories
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
          {story.author} · {story.readingDurationInMinutes} Min
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
          ← Zurück zu der Stories
        </InternalLink>
      </footer>
    </>
  )
}
