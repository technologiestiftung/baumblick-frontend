import { Button } from '@components/Button'
import { Check } from '@components/Icons'
import { useImageLoadsSuccessfully } from '@lib/hooks/useLoadImage'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import colors from '../../style/colors'

export interface FeedbackReportFormPropType {
  title: string
  description: string
  imageUrl?: string
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
        showImg && 'pr-0 grid-cols-[8fr,5fr]'
      )}
    >
      <h2 className="font-semibold text-2xl">{title}</h2>
      {showImg && (
        <img
          src={imageUrl}
          alt={t('feedback.imageAlt', { title })}
          className="row-span-2 object-cover h-full rounded-l-md"
        />
      )}
      <p className="font-serif">{description}</p>
      {alreadyReported && (
        <div
          className={classNames(
            'grid grid-cols-[1fr,24px] gap-x-6',
            showImg && 'col-span-2 mr-6',
            'mt-4'
          )}
        >
          <h4 className="font-bold">{t('feedback.confirmationTitle')}</h4>
          <div className="row-span-2 flex items-center">
            <Check color1={colors.scale['good']} />
          </div>
          <p className="font-serif text-gray-500">
            {t('feedback.confirmationDescription')}
          </p>
        </div>
      )}
      {!alreadyReported && (
        <Button
          onClick={onButtonClick}
          className={classNames(showImg && 'col-span-2 mr-6 ', 'mt-4')}
          primary
        >
          {t('feedback.reportButton', { title })}
        </Button>
      )}
    </div>
  )
}
