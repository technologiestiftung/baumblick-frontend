import { Button } from '@components/Button'
import { useImageLoadsSuccessfully } from '@lib/hooks/useLoadImage'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

export interface FeedbackReportFormPropType {
  title: string
  description: string
  imageUrl?: string
  onButtonClick?: () => void
}

export const FeedbackReportForm: FC<FeedbackReportFormPropType> = ({
  title,
  description,
  imageUrl,
  onButtonClick = () => undefined,
}) => {
  const { t } = useTranslation('common')
  const isImageLoadable = useImageLoadsSuccessfully(imageUrl)
  const showImg = imageUrl && isImageLoadable

  return (
    <div
      className={classNames(
        'grid p-6 gap-x-4 gap-y-2 border-b border-gray-200',
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
      <Button
        onClick={onButtonClick}
        className={classNames(showImg && 'col-span-2 mr-6 ', 'mt-4')}
        primary
      >
        {t('feedback.reportButton', { title })}
      </Button>
    </div>
  )
}
