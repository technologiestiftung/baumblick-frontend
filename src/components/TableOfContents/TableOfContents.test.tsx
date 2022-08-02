import { fireEvent, render, screen } from '@testing-library/react'
import * as nextRouter from 'next/router'
import { TableOfContents } from '.'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('TableOfContents', () => {
  test('should render the chapters', () => {
    const chapters = [
      {
        title: 'This is chapter 1',
      },
      {
        title: 'This is another chapter, the second one',
      },
      {
        title: 'Last but not least',
      },
    ]
    const onChapterClick = jest.fn()
    render(
      <TableOfContents chapters={chapters} onChapterClick={onChapterClick} />
    )

    const links = screen.getAllByRole('button')

    expect(links).toHaveLength(chapters.length)

    fireEvent.click(links[0])

    expect(onChapterClick).toHaveBeenCalledWith(chapters[0].title)
  })
})
