import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { ContentGrid, GridDefault } from '@components/ContentGrid'

export const Intro: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="bg-turquoise py-16 lg:py-20">
      <ContentGrid>
        <GridDefault>
          <img
            src="/images/berlin_trees.webp"
            alt="Straßenbäume in Berlin rund um eine U-Bahn-Station"
          />
          <div className="mt-6 screen1200:mt-12">
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
          <div id="end-of-intro" className="lg:pb-8"></div>
        </GridDefault>
      </ContentGrid>
    </div>
  )
}
