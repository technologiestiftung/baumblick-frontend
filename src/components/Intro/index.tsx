import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { Button } from '@components/Button'
import { GPSButton } from '@components/GPSButton'
import { ArrowDown } from '@components/Icons'
import { ContentGrid, GridDefault } from '@components/ContentGrid'

export const Intro: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="intro__wrapper">
      <ContentGrid>
        <GridDefault>
          <div className="intro__image-container">
            <img
              className="intro__image"
              src="/images/intro-image.jpg"
              alt=""
            />
          </div>
          <div className="intro__text-block">
            {['home.intro.text.1', 'home.intro.text.2'].map((text, index) => {
              return (
                <p
                  className="mb-4 last-of-type:mb-0 font-serif text-base font-normal tracking-normal"
                  key={index}
                >
                  {t(text)}
                </p>
              )
            })}
          </div>

          <GPSButton />

          <Button primary className="w-full intro__button__learn-more">
            <ArrowDown className="text-gray-400" />
            Mehr erfahren
          </Button>
        </GridDefault>
      </ContentGrid>
    </div>
  )
}
