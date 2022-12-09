import { Header } from '@components/Header'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import LottieProgressPlayer from '@components/LottieProgressPlayer'
import { LegalLinks } from '@components/LegalLinks'
import { GPSButton } from '@components/GPSButton'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Willkommen',
    query,
  },
})

export const Home: FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto,1fr,auto] h-full">
        <Header />
        <LottieProgressPlayer
          animationData={{}}
          minFrame={0}
          maxFrame={81}
          progress={4}
          renderer={'svg'}
        />
        <div className="px-4 py-8 mx-auto max-w-md w-full">
          <GPSButton />
          <LegalLinks />
        </div>
      </div>
    </>
  )
}

export default Home
