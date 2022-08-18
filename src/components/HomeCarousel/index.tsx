import { Carousel } from '@components/Carousel'
import { SuctionTensionScale } from '@components/SuctionTensionScale'
import classNames from 'classnames'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

interface HomeCarouselPropType {
  img: {
    url: string
    alt: string
  }
}

const HomeSlide: FC<HomeCarouselPropType> = ({
  img: { url, alt },
  children,
}) => (
  <div className="px-4">
    <div className="border border-gray-200 rounded-lg h-full grid grid-rows-[auto,1fr] grid-cols-1">
      <img src={url} alt={alt} className="w-full float-left rounded-t-lg" />
      <p className="p-4 md:p-6 font-serif border-t border-gray-100 md:text-xl">
        {children}
      </p>
    </div>
  </div>
)

const Pill: FC<{ className?: string }> = ({ className = '', children }) => (
  <span
    className={classNames(
      className,
      'h-4 w-4 font-sans text-center font-bold',
      'inline-flex place-content-center leading-tight',
      'text-xs text-gray-900/50 rounded-full'
    )}
  >
    {children}
  </span>
)

export const HomeCarousel: FC = () => {
  const { t } = useTranslation('common')
  const formattingComponents = {
    bold: <strong />,
    italic: <em />,
    legend: <SuctionTensionScale />,
    '1': <Pill className="bg-scale-1 border-scale-1-dark">1</Pill>,
    '5': <Pill className="bg-scale-5 border-scale-5-dark">5</Pill>,
  }
  return (
    <Carousel>
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
      <HomeSlide
        img={{
          url: '/images/home-slider/7.svg',
          alt: t('home.slides.7.alt'),
        }}
      >
        <Trans
          i18nKey="common:home.slides.7.text"
          components={formattingComponents}
        />
      </HomeSlide>
    </Carousel>
  )
}