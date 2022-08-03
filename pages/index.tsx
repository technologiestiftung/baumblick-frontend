import { Header } from '@components/Header'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import { HomeSlider } from '@components/HomeSlider'
import { Button } from '@components/Button'
import { GPS } from '@components/Icons'
import useTranslation from 'next-translate/useTranslation'
import { LegalLinks } from '@components/LegalLinks'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Willkommen',
    query,
  },
})

export const Home: FC = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <div className="grid grid-cols-1 grid-rows-[auto,1fr,auto] h-full">
        <Header />
        <HomeSlider />
        <div className="px-4 py-8">
          <Button href="/map" primary className="w-full">
            <GPS />
            {t('home.cta')}
          </Button>
          <LegalLinks />
        </div>
      </div>
    </>
  )
}

export default Home
