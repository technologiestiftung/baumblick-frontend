import { Header } from '@components/Header'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import Trans from 'next-translate/Trans'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Willkommen',
    query,
  },
})

const HomeSlide: FC = ({ children }) => (
  <div className="px-4">
    <div className="border border-gray-200 rounded-md h-96 grid grid-rows-[1fr,auto] grid-cols-1">
      <div></div>
      <p className="p-4 font-serif border-t border-gray-100">{children}</p>
    </div>
  </div>
)

const LegendDot: FC<{ className: string }> = ({ className }) => (
  <span
    className={`${className} border w-3 h-3 inline-block rounded-full align-middle`}
  />
)

export const Home: FC = () => {
  const formattingComponents = [
    /* eslint-disable react/jsx-key */
    <strong />,
    <LegendDot className="bg-scale-8 border-scale-8-dark" />,
    <LegendDot className="bg-scale-1 border-scale-1-dark" />,
    /* eslint-enable react/jsx-key */
  ]
  return (
    <>
      <Header />
      <Slider arrows={false} infinite={false} dots>
        <HomeSlide>
          <Trans
            i18nKey="common:home.slides.1"
            components={formattingComponents}
          />
        </HomeSlide>
        <HomeSlide>
          <Trans
            i18nKey="common:home.slides.2"
            components={formattingComponents}
          />
        </HomeSlide>
        <HomeSlide>
          <Trans
            i18nKey="common:home.slides.3"
            components={formattingComponents}
          />
        </HomeSlide>
        <HomeSlide>
          <Trans
            i18nKey="common:home.slides.4"
            components={formattingComponents}
          />
        </HomeSlide>
        <HomeSlide>
          <Trans
            i18nKey="common:home.slides.5"
            components={formattingComponents}
          />
        </HomeSlide>
        <HomeSlide>
          <Trans
            i18nKey="common:home.slides.6"
            components={formattingComponents}
          />
        </HomeSlide>
      </Slider>
    </>
  )
}

export default Home
