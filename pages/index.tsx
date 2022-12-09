import { Header } from '@components/Header'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { SideBySideScrollAnimation } from '@components/SideBySideScrollAnimation'
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
        <SideBySideScrollAnimation />
        <div className="px-4 py-8 mx-auto max-w-md w-full">
          <GPSButton />
          <LegalLinks />
        </div>
      </div>
    </>
  )
}

export default Home
