import {
  TreesMapWithControls,
  TreesMapWithControlsPropType,
} from '@modules/TreesMapWithControls'
import { GetServerSideProps } from 'next'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Karte',
    query,
  },
})

export const Home: FC<TreesMapWithControlsPropType> = (props) => (
  <>
    <TreesMapWithControls {...props} />
  </>
)

export default Home
