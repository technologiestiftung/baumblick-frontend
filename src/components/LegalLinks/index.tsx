import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

export const LegalLinks: FC = () => {
  const { t } = useTranslation('common')
  return (
    <section className="footer__wrapper">
      <a
        className="footer__link focus:outline-none focus:ring-offset-4 focus:ring-offset-white focus:ring-2 focus:ring-gray-900 hover:text-gray-900 transition-colors"
        href="https://www.technologiestiftung-berlin.de/de/impressum/"
      >
        <span>{t('legal.imprint')}</span>
      </a>
      <a
        className="footer__link focus:outline-none focus:ring-offset-4 focus:ring-offset-white focus:ring-2 focus:ring-gray-900 hover:text-gray-900 transition-colors"
        href="https://www.technologiestiftung-berlin.de/de/datenschutz/"
      >
        <span>{t('legal.privacy')}</span>
      </a>
    </section>
  )
}
