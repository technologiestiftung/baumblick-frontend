import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { ContentGrid } from '@components/ContentGrid'

export const Partners: FC = () => {
  const { t } = useTranslation('common')
  return (
    <div className="w-full py-16 lg:py-20">
      <ContentGrid>
        <div
          className={classNames(
            'w-full flex flex-col gap-y-12 col-start-1 col-span-6',
            'md:col-start-4 md:col-span-6',
            'lg:col-start-1 lg:col-span-12 lg:flex-row lg:justify-between'
          )}
        >
          {[
            {
              title: t('home.partners.consortium'),
              logos: [
                {
                  src: '/images/logos/logo-technologiestiftung-berlin-de.svg',
                  alt: 'Logo Technologiestiftung Berlin',
                  width: 200,
                },
                {
                  src: '/images/logos/logo-birds-on-mars.png',
                  alt: 'Logo Birds on Mars',
                  width: 170,
                },
                {
                  src: '/images/logos/ba-mitte-logo.png',
                  alt: 'Logo Bezirksamt Mitte von Berlin',
                  width: 220,
                },
              ],
            },
            {
              title: t('home.partners.associated'),
              logos: [
                {
                  src: '/images/logos/ba-neukoelln-logo.png',
                  alt: 'Logo Bezirksamt Neukölln von Berlin',
                  width: 220,
                },
                {
                  src: '/images/logos/logo-arbor-revital.png',
                  alt: 'Logo Arbor Revital',
                  width: 220,
                },
                {
                  src: '/images/logos/logo-winterdienst.svg',
                  alt: 'Logo Winterdienst im Norden',
                  width: 220,
                },
              ],
            },
            {
              title: t('home.partners.funding'),
              logos: [
                {
                  src: '/images/logos/logo-zug.svg',
                  alt: 'Logo Zukunft Umwelt Gesellschaft',
                  width: 200,
                },
                {
                  src: '/images/logos/logo-bumv.svg',
                  alt: 'Logo Bundesministerium für Umwelt, Naturschutz, nukleare Sicherheit und Verbraucherschutz',
                  width: 200,
                },
              ],
            },
          ].map((column, columnIndex) => (
            <div key={`col-${columnIndex}`} className="w-[18.75rem]">
              <h4 className="font-sans text-base font-semibold tracking-normal text-left mb-6">
                {column.title}
              </h4>
              <div>
                {column.logos.map((logo, logoIndex) => (
                  <img
                    key={`logo-${logoIndex}`}
                    className="mb-12 last-of-type:mb-0"
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
