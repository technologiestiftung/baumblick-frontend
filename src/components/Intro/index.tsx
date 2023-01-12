import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { Button } from '@components/Button'
import { GPSButton } from '@components/GPSButton'
import { ArrowDownHero } from '@components/Icons'

export const Intro: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="intro__wrapper">
      <div className="content-grid">
        <div className="content-grid__default">
          <div className="intro__image-container">
            <img
              className="intro__image"
              src="/images/intro-image.jpg"
              alt=""
            />
          </div>
          <div className="intro__text-block">
            <p className="intro__text text__copy--home">
              {t('home.intro.text.1')}
            </p>
            <p className="intro__text text__copy--home">
              {t('home.intro.text.2')}
            </p>
          </div>

          <GPSButton />

          <Button primary className="w-full intro__button__learn-more">
            <ArrowDownHero className="text-gray-400" />
            Mehr erfahren
          </Button>
        </div>
      </div>
    </div>
  )
}
