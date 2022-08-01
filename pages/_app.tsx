import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC, ReactElement, ReactNode } from 'react'
import { Head } from '@components/Head'
import '../src/style/global.css'
import { useMatomo } from '@lib/hooks/useMatomo'
import { MainMenu } from '@components/MainMenu'
import { NextPage } from 'next'
import { AppProps } from 'next/app'

export interface PagePropType extends Record<string, unknown> {
  title?: string
  query: ParsedUrlQuery
}

interface ComponentPropType {
  title?: string
  query?: ReturnType<typeof mapRawQueryToState>
}

export type NextPageWithLayout = NextPage<ComponentPropType> & {
  getLayout?: (page: ReactElement, pageProps: ComponentPropType) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  pageProps: PagePropType
  Component: NextPageWithLayout
}

const App: FC<AppPropsWithLayout> = ({
  Component,
  pageProps,
}: AppPropsWithLayout) => {
  useMatomo()

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <StrictMode>
      <Head />
      <div className="fixed inset-0 bottom-16 overflow-x-hidden overflow-y-auto">
        {getLayout(<Component {...pageProps} />, pageProps)}
      </div>
      <MainMenu />
    </StrictMode>
  )
}

export default App
