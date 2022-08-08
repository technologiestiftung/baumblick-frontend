import { WaterLevelLegend } from '@components/WaterLevelLegend'
import Trans from 'next-translate/Trans'
import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

const HomeSlide: FC = ({ children }) => (
  <div className="px-4">
    <div className="border border-gray-200 rounded-md h-full grid grid-rows-[1fr,auto] grid-cols-1">
      <div></div>
      <p className="p-4 font-serif border-t border-gray-100">{children}</p>
    </div>
  </div>
)

export const HomeSlider: FC = () => {
  const formattingComponents = {
    bold: <strong />,
    italic: <em />,
    legend: <WaterLevelLegend initiallyCollapsed />,
  }
  return (
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
  )
}
