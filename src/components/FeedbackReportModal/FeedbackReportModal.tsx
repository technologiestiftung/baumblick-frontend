import { useImageLoadsSuccessfully } from '@lib/hooks/useLoadImage'
import { FC } from 'react'
import { Modal } from '@components/Modal'
import { ModalDescription } from './ModalDescription'
import { ModalFooter } from './ModalFooter'
import { ModalHeader } from './ModalHeader'

export interface FeedbackReportModalPropType {
  title: string
  address: string
  treeName: string
  imageUrl?: string | null
  isOpen?: boolean
  onConfirm?: () => void
  onClose?: () => void
}

export const FeedbackReportModal: FC<FeedbackReportModalPropType> = ({
  title,
  address,
  treeName,
  imageUrl,
  isOpen = true,
  onConfirm = () => undefined,
  onClose = () => undefined,
}) => {
  const isImageLoadable = useImageLoadsSuccessfully(imageUrl)
  const showImg = imageUrl && isImageLoadable

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={
        <ModalDescription title={title} address={address} treeName={treeName} />
      }
      onClose={onClose}
      header={<ModalHeader showImg={!!showImg} imageUrl={imageUrl} />}
      footer={<ModalFooter onClose={onClose} onConfirm={onConfirm} />}
    />
  )
}
