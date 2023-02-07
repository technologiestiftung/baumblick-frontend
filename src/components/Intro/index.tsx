import useTranslation from 'next-translate/useTranslation'
import classNames from 'classnames'
import { FC } from 'react'
import { Button } from '@components/Button'
import { GPSButton } from '@components/GPSButton'
import { ArrowDown } from '@components/Icons'
import { ContentGrid, GridDefault } from '@components/ContentGrid'

export const Intro: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="bg-green py-[5.625rem] screen1200:py-[20vh]">
      <ContentGrid>
        <GridDefault>
          <div
            className={classNames(
              'relative',
              'after:block after:absolute after:top-0 after:w-full after:h-full',
              'after:bg-scale-good after:mix-blend-hue'
            )}
          >
            <img src="/images/intro-image.jpg" alt="" />
          </div>
          <div className="mt-6 mb-12 screen1200:mt-12">
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

          <Button primary className="w-full mt-4">
            <ArrowDown className="text-gray-400" />
            Mehr erfahren
          </Button>
        </GridDefault>
      </ContentGrid>
    </div>
  )
}
