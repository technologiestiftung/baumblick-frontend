import { WaterLevelLegend } from '@components/WaterLevelLegend'
import { RefreshmentMap, RefreshmentMapPropType } from '@modules/RefreshmentMap'
import classNames from 'classnames'
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
    <div className={classNames('absolute bottom-2 left-2', 'w-[162px]')}>
      <WaterLevelLegend collapsable={true} />
    </div>
  </>
)

export default Home
