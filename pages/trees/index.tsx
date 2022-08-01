import { MapLayout } from '@layouts/MapLayout'
import { GetServerSideProps, NextPage } from 'next'
import router from 'next/router'
import { PagePropType } from 'pages/_app'
import { ReactElement, ReactNode } from 'react'

type MapPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, pageProps: PagePropType) => ReactNode
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        latitude={props.query?.latitude}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        longitude={props.query?.longitude}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        zoom={props.query?.zoom}
        onTreeSelect={(treeId) => {
          void router.push({ pathname: `/trees/${treeId}`, query: null })
        }}
      />
      {page}
    </>
  )
}

// export const Home: FC<TreesMapWithControlsPropType> = (props) => (
//   <>
//     <TreesMapWithControls {...props} />
//   </>
// )

export default MapPage
