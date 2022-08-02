import { MapLayout } from '@layouts/MapLayout'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { GetServerSideProps, NextPage } from 'next'
import router from 'next/router'
import { ReactElement, ReactNode } from 'react'

export interface ComponentPropType {
  title?: string
  query?: ReturnType<typeof mapRawQueryToState>
}

type MapPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, pageProps: ComponentPropType) => ReactNode
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Karte',
    query,
  },
})

const MapPage: MapPageWithLayout = () => {
  return null
}

MapPage.getLayout = function getLayout(page, props) {
  return (
    <>
      <MapLayout
        latitude={props.query?.latitude || undefined}
        longitude={props.query?.longitude || undefined}
        zoom={props.query?.zoom || undefined}
        onTreeSelect={(treeId) => {
          void router.push({ pathname: `/trees/${treeId}`, query: null })
        }}
      />
      {page}
    </>
  )
}

export default MapPage
