import { RefreshmentMap, RefreshmentMapPropType } from '@modules/RefreshmentMap'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Karte',
    query,
  },
})

export const Home: FC<RefreshmentMapPropType> = (props) => (
  <>
    <RefreshmentMap {...props} />
  </>
)

export default Home
