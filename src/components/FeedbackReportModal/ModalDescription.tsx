import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { FeedbackReportModalPropType } from './FeedbackReportModal'
import classNames from 'classnames'

export const ModalDescription: FC<
  Pick<FeedbackReportModalPropType, 'title' | 'address' | 'treeName'>
> = ({ title, address, treeName }) => {
  const { t } = useTranslation('common')

  const formattingComponents = {
    bold: <strong />,
  }

  return (
    <>
      <div>
        <Trans
          i18nKey="common:feedback.modalHelp"
          components={formattingComponents}
          values={{
            address: address
              ? `${t('feedback.proximityWord')} <bold>${address}</bold>`
              : '',
            title,
            treeName,
          }}
        />
      </div>
      <div
        className={classNames(
          'mt-3',
          'text-xs font-medium font-sans',
          'border p-2'
        )}
      >
        <Trans
          i18nKey="common:feedback.modalDisclaimer"
          components={[
            // Anchor does have content, provided by our locale file.
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            <a
              key="link"
              className={classNames(
                'px-0.5',
                'underline',
                'transition-colors focus:outline-none',
                'focus:ring-2 focus:ring-gray-600',
                'hover:text-gray-500'
              )}
              href="https://ordnungsamt.berlin.de/frontend/meldungNeu/wo"
              aria-label={t('common:feedback.modalDisclaimerAriaLabel')}
              target="_blank"
              rel="noopener noreferrer"
            />,
          ]}
        />
      </div>
    </>
  )
}
