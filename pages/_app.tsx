import { ParsedUrlQuery } from 'querystring'
import { FC, ReactElement, ReactNode } from 'react'
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
    <>
      <Head pageTitle={pageProps.title || ''} />
      <main
        id="main"
        className={classNames(
          'fixed top-0 md:left-[12px] md:w-[calc(100vw-12px)] z-0 min-h-[calc(100%-4rem)]',
          'bottom-16 grid',
          'overflow-x-hidden md:overflow-x-visible overflow-y-scroll '
        )}
      >
        <div className="w-screen max-w-3xl mx-auto">
          {getLayout(<Component />, pageProps)}
        </div>
      </main>
      <MainMenu />
    </>
  )
}

export default App
