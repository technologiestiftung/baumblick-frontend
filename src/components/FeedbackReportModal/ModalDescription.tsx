import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { FeedbackReportModalPropType } from './FeedbackReportModal'

export const ModalDescription: FC<
  Pick<FeedbackReportModalPropType, 'title' | 'address' | 'treeName'>
> = ({ title, address, treeName }) => {
  const { t } = useTranslation('common')

  const formattingComponents = {
    bold: <strong />,
  }

  return (
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
  )
}
