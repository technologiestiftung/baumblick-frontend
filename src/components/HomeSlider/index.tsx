import { WaterLevelLegend } from '@components/WaterLevelLegend'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

interface HomeSlidePropType {
  img: {
    url: string
    alt: string
  }
}

const HomeSlide: FC<HomeSlidePropType> = ({ img: { url, alt }, children }) => (
  <div className="px-4">
    <div className="border border-gray-200 rounded-md h-full grid grid-rows-[1fr,auto] grid-cols-1">
      <img src={url} alt={alt} className="object-cover" />
      <p className="p-4 font-serif border-t border-gray-100">{children}</p>
    </div>
  </div>
)

export const HomeSlider: FC = () => {
  const { t } = useTranslation('common')
  const formattingComponents = {
    bold: <strong />,
    italic: <em />,
    legend: <WaterLevelLegend initiallyCollapsed />,
  }
  return (
    <Slider arrows={false} infinite={false} dots>
      <HomeSlide
        img={{
          url: '/images/home-slider/1.svg',
          alt: t('home.slides.1.alt'),
        }}
      >
        <Trans
          i18nKey="common:home.slides.1.text"
          components={formattingComponents}
        />
      </HomeSlide>
      <HomeSlide
        img={{
          url: '/images/home-slider/2.svg',
          alt: t('home.slides.2.alt'),
        }}
      >
        <Trans
          i18nKey="common:home.slides.2.text"
          components={formattingComponents}
        />
      </HomeSlide>
      <HomeSlide
        img={{
          url: '/images/home-slider/3.svg',
          alt: t('home.slides.3.alt'),
        }}
      >
        <Trans
          i18nKey="common:home.slides.3.text"
          components={formattingComponents}
        />
      </HomeSlide>
      <HomeSlide
        img={{
          url: '/images/home-slider/4.svg',
          alt: t('home.slides.4.alt'),
        }}
      >
        <Trans
          i18nKey="common:home.slides.4.text"
          components={formattingComponents}
        />
      </HomeSlide>
      <HomeSlide
        img={{
          url: '/images/home-slider/5.svg',
          alt: t('home.slides.5.alt'),
        }}
      >
        <Trans
          i18nKey="common:home.slides.5.text"
          components={formattingComponents}
        />
      </HomeSlide>
      <HomeSlide
        img={{
          url: '/images/home-slider/6.svg',
          alt: t('home.slides.6.alt'),
        }}
      >
        <Trans
          i18nKey="common:home.slides.6.text"
          components={formattingComponents}
        />
      </HomeSlide>
    </Slider>
  )
}
