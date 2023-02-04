import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import classNames from 'classnames'

export const LegalLinks: FC = () => {
  const { t } = useTranslation('common')
  return (
    <section
      className={classNames(
        'h-[3.25rem] flex items-center border-none justify-evenly',
        'screen1200:justify-start screen1200:border-t screen1200:border-solid screen1200:border-uiLightGrey'
      )}
    >
      <a
        className={classNames(
          'focus:outline-none focus:ring-offset-4 focus:ring-offset-white focus:ring-2 focus:ring-gray-900 hover:text-gray-900 transition-colors',
          'font-sans text-uiMidGrey not-italic font-semibold text-base leading-6 w-40 flex justify-center items-center'
        )}
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
