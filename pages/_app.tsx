import { ParsedUrlQuery } from 'querystring'
import { FC } from 'react'
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
    <>
      <Head pageTitle={pageProps.title || ''} />
      <main
        id="main"
        className={classNames(
          'main__wrapper',
          'fixed top-0 z-0',
          'bottom-16 grid',
          'overflow-x-hidden md:overflow-x-visible overflow-y-scroll '
        )}
      >
        <div className="w-screen">{getLayout(<Component />, pageProps)}</div>
      </main>
      <MainMenu />
    </>
  )
}

export default App
