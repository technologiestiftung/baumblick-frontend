import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { Hero } from '@components/Hero'
import { Intro } from '@components/Intro'
import { Outro } from '@components/Outro'
import { Partners } from '@components/Partners'
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
      <SideBySideScrollAnimation />
      <Outro />
      <Partners />

      <LegalLinks />
    </>
  )
}

export default Home
