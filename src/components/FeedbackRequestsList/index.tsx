import { FeedbackReportForm } from '@components/FeedbackReportForm'
import { FeedbackReportModal } from '@components/FeedbackReportModal'
import { IssueTypeType, useFeedbackData } from '@lib/hooks/useFeedbackData'
import { TreeDataType } from '@lib/requests/getTreeData'
import useTranslation from 'next-translate/useTranslation'
import { FC, useState } from 'react'

interface FeedbackRequestsListPropType {
  treeData: TreeDataType | undefined
  csrfToken: string
}

export const FeedbackRequestsList: FC<FeedbackRequestsListPropType> = ({
  treeData,
  csrfToken,
}) => {
  const { t } = useTranslation('common')
  const { issues, reportIssue, isLoading, error } = useFeedbackData(
    treeData?.id,
    csrfToken
  )
  const [openedIssueModal, setOpenedIssueModal] =
    useState<IssueTypeType | null>(null)

  return (
    <div className="relative bg-white z-0 pt-8">
      {!error &&
        issues?.map((issueType) => (
          <FeedbackReportForm
            key={issueType.id}
            {...issueType}
            onButtonClick={() => setOpenedIssueModal(issueType)}
          />
        ))}
      <FeedbackReportModal
        title={openedIssueModal?.title || ' '}
        address={
          (treeData?.strname &&
            treeData?.hausnr &&
            treeData?.bezirk &&
            `${treeData?.strname} ${treeData?.hausnr}, ${treeData?.bezirk}`) ||
          ''
        }
        imageUrl={openedIssueModal?.imageUrl}
        treeName={treeData?.art_dtsch || 'Baum'}
        isOpen={!!openedIssueModal}
        onConfirm={() => {
          if (!openedIssueModal) return
          setOpenedIssueModal(null)
          void reportIssue(openedIssueModal.id)
        }}
        onClose={() => setOpenedIssueModal(null)}
      />
      {isLoading && (
        <div className="p-8 font-serif md:text-lg">{t('feedback.loading')}</div>
      )}
      {error && (
        <div className="p-8 font-serif md:text-lg">
          {t('feedback.error')}
          <br />
          <span className="font-mono bg-gray-100 px-2 py-1 -ml-2 mt-2 inline-block">
            {error}
          </span>
        </div>
      )}
    </div>
  )
}
