import { Button } from '@components/Button'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import { FeedbackReportModalPropType } from './FeedbackReportModal'

export const ModalFooter: FC<
  Pick<FeedbackReportModalPropType, 'onClose' | 'onConfirm'>
> = ({ onClose, onConfirm }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <Button onClick={onClose}>{t('feedback.modalCancel')}</Button>
      <Button primary onClick={onConfirm}>
        {t('feedback.modalConfirm')}
      </Button>
    </>
  )
}
