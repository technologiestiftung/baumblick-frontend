import { Button } from '@components/Button'
import { Check } from '@components/Icons'
import { Transition } from '@headlessui/react'
import { useImageLoadsSuccessfully } from '@lib/hooks/useLoadImage'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import colors from '../../style/colors'

export interface FeedbackReportFormPropType {
  title: string
  description: string
  imageUrl?: string | null
  onButtonClick?: () => void
  alreadyReported?: boolean
}

export const FeedbackReportForm: FC<FeedbackReportFormPropType> = ({
  title,
  description,
  imageUrl,
  alreadyReported = false,
  onButtonClick = () => undefined,
}) => {
  const { t } = useTranslation('common')
  const isImageLoadable = useImageLoadsSuccessfully(imageUrl)
  const showImg = imageUrl && isImageLoadable

  return (
    <div
      className={classNames(
        'grid p-6 gap-x-6 gap-y-2 border-b border-gray-200',
        'pr-0 grid-cols-[8fr,5fr]'
      )}
    >
      <div>
        <h2 className="font-semibold text-2xl">{title}</h2>
        <p className="font-serif mt-2">{description}</p>
        {alreadyReported && (
          <div
            className={classNames(
              'grid grid-cols-[1fr,24px] gap-x-6',
              'col-span-2 mr-6',
              'mt-4'
            )}
          >
            <h4 className="font-bold">{t('feedback.confirmationTitle')}</h4>
            <div className="row-span-2 flex items-center">
              <Check color1={colors.scale['1']} />
            </div>
            <p className="font-serif text-gray-500">
              {t('feedback.confirmationDescription')}
            </p>
          </div>
        )}
        {!alreadyReported && (
          <Button onClick={onButtonClick} className="col-span-2 mt-6" primary>
            {t('feedback.reportButton', { title })}
          </Button>
        )}
      </div>
      <div
        className={classNames(
          'w-full bg-gray-100 aspect-video rounded-l-md',
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
            className="w-full aspect-video rounded-l-md bg-cover bg-center"
            style={{ backgroundImage: `url("${imageUrl || ''}")` }}
          />
        </Transition>
      </div>
    </div>
  )
}
