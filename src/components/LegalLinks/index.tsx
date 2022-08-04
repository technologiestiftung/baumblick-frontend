import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

export const LegalLinks: FC = () => {
  const { t } = useTranslation('common')
  return (
    <section className="flex justify-evenly text-sm mt-6 font-medium text-gray-500 leading-4">
      <a
        className="outline-none focus:outline-none focus:ring-offset-4 focus:ring-offset-white focus:ring-2 focus:ring-gray-900 hover:text-gray-900 transition-colors"
        href="https://www.technologiestiftung-berlin.de/de/impressum/"
      >
        {t('legal.imprint')}
      </a>
      <a
        className="outline-none focus:outline-none focus:ring-offset-4 focus:ring-offset-white focus:ring-2 focus:ring-gray-900 hover:text-gray-900 transition-colors"
        href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
      >
        {t('legal.privacy')}
      </a>
    </section>
  )
}
