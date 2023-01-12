import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { Hero } from '@components/Hero'
import { Intro } from '@components/Intro'
import { SideBySideScrollAnimation } from '@components/SideBySideScrollAnimation'
import { LegalLinks } from '@components/LegalLinks'

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
      <Hero />

      <Intro />
      <div className="grid grid-cols-1 grid-rows-[auto,1fr,auto] h-full max-w-3xl mx-auto">
        <SideBySideScrollAnimation />

        <div className="px-4 py-8 mx-auto max-w-md w-full">
          <LegalLinks />
        </div>
      </div>
    </>
  )
}

export default Home
