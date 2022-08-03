import { Header } from '@components/Header'
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

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
  return (
    <>
      <Header />
      <Slider arrows={false} infinite={false} dots>
        <HomeSlide>
          Der QTrees Baummonitor zeigt dir den{' '}
          <b>Wasserstand der Berliner Stadtbäume</b> - von{' '}
          <LegendDot className="bg-scale-8 border-scale-8-dark" /> gut versorgt
          bis <LegendDot className="bg-scale-1 border-scale-1-dark" />{' '}
          bedenklich trocken.
        </HomeSlide>
        <HomeSlide>B</HomeSlide>
        <HomeSlide>C</HomeSlide>
        <HomeSlide>D</HomeSlide>
        <HomeSlide>E</HomeSlide>
        <HomeSlide>F</HomeSlide>
      </Slider>
    </>
  )
}

export default Home
