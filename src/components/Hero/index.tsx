import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { ArrowDown } from '@components/Icons/ArrowDown'

export const Hero: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="hero__wrapper">
      <div className="hero__image-container">
        <img src="/images/hero-image-1200px.png" alt="" />
      </div>

      <div className="hero__content-container">
        <div className="hero__content-container__text-container">
          <h1 className="hero__content-container__headline">
            {t('home.hero.title')}
          </h1>
          <p className="hero__content-container__text">{t('home.hero.text')}</p>
        </div>

        <ArrowDown className="hero__content-container__arrow" />
      </div>
    </div>
  )
}
