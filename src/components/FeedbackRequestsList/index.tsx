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
  const { issues } = useFeedbackData(treeId)
  return (
    <>
      <p>{t('feedback.introduction')}</p>
      {issues?.map((issueType) => (
        <div key={issueType.id}>{issueType.title}</div>
      ))}
    </>
  )
}
