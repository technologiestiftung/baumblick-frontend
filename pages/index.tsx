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
      <div className="hero__wrapper">
        <div className="hero__image-container">
          <img src="/images/intro-image-1200px.png" alt="" />
        </div>

        <div className="hero__content-container">
          <h1 className="hero__headline">Willkommen bei Baumblick</h1>
          <p className="hero__text">
            Die App, die dir einen Ein- und Ausblick in den Zustand und die
            Wasserversorgung der Stadtbäume Berlins gibt.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-[auto,1fr,auto] h-full max-w-3xl mx-auto">
        <div className="intro__wrapper"></div>
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
