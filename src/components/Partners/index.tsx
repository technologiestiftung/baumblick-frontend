import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { ContentGrid } from '@components/ContentGrid'

export const Partners: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="w-full py-[5.625rem] screen1200:py-[20vh]">
      <ContentGrid>
        <div
          className={classNames(
            'w-full flex flex-col col-start-1 col-span-6',
            'md:col-start-4 md:col-span-6',
            'screen1200:col-start-1 screen1200:col-span-12 screen1200:flex-row screen1200:justify-between'
          )}
        >
          {[
            {
              title: t('home.partners.consortium'),
              logos: [
                {
                  src: '/images/logos/logo-technologiestiftung-berlin-de.svg',
                  alt: '',
                  width: 280,
                },
                {
                  src: '/images/logos/logo-birds-on-mars.png',
                  alt: '',
                  width: 220,
                },
                {
                  src: '/images/logos/ba-mitte-logo.png',
                  alt: '',
                  width: 300,
                },
              ],
            },
            {
              title: t('home.partners.associated'),
              logos: [
                {
                  src: '/images/logos/ba-neukoelln-logo.png',
                  alt: '',
                  width: 300,
                },
                {
                  src: '/images/logos/logo-arbor-revital.png',
                  alt: '',
                  width: 250,
                },
              ],
            },
            {
              title: t('home.partners.funding'),
              logos: [
                {
                  src: '/images/logos/logo-zug.svg',
                  alt: '',
                  width: 280,
                },
                {
                  src: '/images/logos/logo-buns.png',
                  alt: '',
                  width: 300,
                },
              ],
            },
          ].map((column, columnIndex) => (
            <div key={`col-${columnIndex}`} className="w-[18.75rem]">
              <h4 className="font-sans text-base font-semibold tracking-normal text-left mb-6">
                {column.title}
              </h4>
              <div className="mb-[5.625rem] screen1200:mb-0">
                {column.logos.map((logo, logoIndex) => (
                  <img
                    key={`logo-${logoIndex}`}
                    className="mb-8"
                    src={logo.src}
                    alt={logo.alt}
                    style={{ width: logo.width }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </ContentGrid>
    </div>
  )
}
