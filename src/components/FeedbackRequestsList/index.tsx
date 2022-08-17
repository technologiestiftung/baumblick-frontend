import { FeedbackReportForm } from '@components/FeedbackReportForm'
import { useFeedbackData } from '@lib/hooks/useFeedbackData'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

interface FeedbackRequestsListPropType {
  treeId: string
}

export const FeedbackRequestsList: FC<FeedbackRequestsListPropType> = ({
  treeId,
}) => {
  const { t } = useTranslation('common')
  const { issues, reportIssue, isLoading, error } = useFeedbackData(treeId)
  return (
    <>
      <p className="px-8 py-8 font-serif md:text-lg">
        {t('feedback.introduction')}
      </p>
      {issues?.map((issueType) => (
        <FeedbackReportForm
          key={issueType.id}
          {...issueType}
          onButtonClick={() => reportIssue(treeId)}
        />
      ))}
      {isLoading && (
        <div className="p-8 font-serif md:text-lg">{t('feedback.loading')}</div>
      )}
      {error && (
        <div className="p-8 font-serif md:text-lg">
          {t('feedback.error')}
          <br />
          <span className="font-mono bg-gray-100 px-2 py-1 -ml-2 mt-2 inline-block">
            {error.message}
          </span>
        </div>
      )}
    </>
  )
}
