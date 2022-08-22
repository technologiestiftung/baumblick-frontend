import { getBaseUrl } from '@lib/utils/urlUtil'

export const reportIssue = async (issue: {
  issueTypeId: number
  treeId: string
  csrfToken: string
}): Promise<void> => {
  const { treeId, issueTypeId, csrfToken } = issue
  const REQUEST_URL = `${getBaseUrl()}/api/issues`

  const response = await fetch(REQUEST_URL, {
    method: 'POST',
    headers: {
      'CSRF-Token': csrfToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      issue_type_id: issueTypeId,
      gml_id: treeId,
    }),
  })

  if (!response.ok) {
    const error = (await response.json()) as { error: string }
    throw new Error(error.error)
  }
}
