import { Button } from '@components/Button'
import { useImageLoadsSuccessfully } from '@lib/hooks/useLoadImage'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Trans from 'next-translate/Trans'

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
  const { t } = useTranslation('common')
  const isImageLoadable = useImageLoadsSuccessfully(imageUrl)
  const showImg = imageUrl && isImageLoadable

  const formattingComponents = {
    bold: <strong />,
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" aria-hidden="true" />
        </Transition.Child>

        <div
          className={classNames(
            'fixed inset-0 flex items-center justify-center p-4'
          )}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={classNames(
                'mx-auto rounded-md shadow-2xl bg-white max-w-full w-[400px]',
                'grid gap-x-4 gap-y-2 border-b border-gray-200'
              )}
            >
              <div
                className={classNames(
                  'bg-gray-100 w-full h-[120px] rounded-t overflow-hidden',
                  !showImg && imageUrl && 'animate-pulse'
                )}
              >
                <Transition
                  show={!!showImg}
                  enter="transition-opacity duration-500"
                  enterFrom="opacity-0  delay-1000"
                  enterTo="opacity-100"
                  leave="transition-opacity duration-150"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div
                    className="w-full h-[120px] bg-cover bg-center"
                    style={{ backgroundImage: `url("${imageUrl || ''}")` }}
                  />
                </Transition>
              </div>
              <Dialog.Title
                className={classNames('px-6 pt-4 pb-1 font-semibold text-2xl')}
              >
                {title}
              </Dialog.Title>
              <p className="font-serif px-6">
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
              </p>
              <footer className="flex p-6 justify-between">
                <Button onClick={onClose}>{t('feedback.modalCancel')}</Button>
                <Button primary onClick={onConfirm}>
                  {t('feedback.modalConfirm')}
                </Button>
              </footer>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
