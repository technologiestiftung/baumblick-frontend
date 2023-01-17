import { ParsedUrlQuery } from 'querystring'
import { StrictMode, FC } from 'react'
import { Head } from '@components/Head'
import 'maplibre-gl/dist/maplibre-gl.css'
import '../src/style/global.css'
import { Page } from '@common/types/nextPage'
import { useMatomo } from '@lib/hooks/useMatomo'
import { MainMenu } from '@components/MainMenu'
import type { AppProps as NextAppProps } from 'next/app'
import classNames from 'classnames'

interface PagePropsType extends Record<string, unknown> {
  title?: string
  query: ParsedUrlQuery
}

interface AppPropsType extends NextAppProps {
  Component: Page
  pageProps: PagePropsType
}

const App: FC<AppPropsType> = ({ Component, pageProps }) => {
  useMatomo()

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <StrictMode>
      <Head pageTitle={pageProps.title || ''} />
      <main
        className={classNames(
          'fixed top-0 md:left-[12px] md:w-[calc(100vw-12px)] z-0 min-h-[calc(100%-4rem)]',
          'bottom-16 grid',
          'overflow-x-hidden md:overflow-x-visible overflow-y-scroll '
        )}
      >
        <div className="w-screen max-w-3xl mx-auto">
          {getLayout(<Component {...pageProps} />, pageProps)}
        </div>
      </main>
      <MainMenu />
    </StrictMode>
  )
}

export default App
