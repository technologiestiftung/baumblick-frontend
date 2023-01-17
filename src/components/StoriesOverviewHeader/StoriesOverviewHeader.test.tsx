import { render, screen } from '@testing-library/react'
import I18nProvider from 'next-translate/I18nProvider'
import * as nextRouter from 'next/router'
import { StoriesOverviewHeader } from '.'
import common from '../../../locales/de/common.json'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
nextRouter.useRouter = jest.fn().mockReturnValue({
  query: {},
})

describe('StoriesOverviewHeader', () => {
  test('should render the right tags', () => {
    render(
      <I18nProvider lang="de" namespaces={{ common }}>
        <StoriesOverviewHeader />
      </I18nProvider>
    )

    const title = screen.getByText('Stories')

    expect(title).toBeInTheDocument()
  })
})
