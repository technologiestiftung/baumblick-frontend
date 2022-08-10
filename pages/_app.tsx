import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC, ReactElement, ReactNode } from 'react'
import { Head } from '@components/Head'
import 'maplibre-gl/dist/maplibre-gl.css'
import '../src/style/global.css'
import { useMatomo } from '@lib/hooks/useMatomo'
import { MainMenu } from '@components/MainMenu'
import { NextPage } from 'next'
import type { AppProps as NextAppProps } from 'next/app'
import classNames from 'classnames'

type AppProps<P = unknown> = {
  pageProps: P
} & Omit<NextAppProps<P>, 'pageProps'>

export interface PagePropType extends Record<string, unknown> {
  title?: string
  query: ParsedUrlQuery
}

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, pageProps: PagePropType) => ReactNode
}

type AppPropsWithLayout = AppProps<PagePropType> & {
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
      <Head pageTitle={pageProps.title || ''} />
      <main
        className={classNames(
          'absolute top-0 left-0 z-0',
          'overflow-x-hidden overflow-y-auto bottom-16',
          'w-full'
        )}
      >
        {getLayout(<Component {...pageProps} />, pageProps)}
      </main>
      <MainMenu />
    </StrictMode>
  )
}

export default App
