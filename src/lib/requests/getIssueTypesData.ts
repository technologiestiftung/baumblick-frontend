import { Database } from '@lib/types/database'
import { getBaseUrl } from '@lib/utils/urlUtil'

type IssueTypesDataType = Database['public']['Tables']['issue_types']['Row']
const TABLE_NAME = 'issue_types'
export const getIssueTypesData = async (): Promise<
  IssueTypesDataType[] | undefined
> => {
  const REQUEST_URL = `${getBaseUrl()}/api/ml-api-passthrough/${TABLE_NAME}`

  const response = await fetch(REQUEST_URL, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  if (!response.ok) {
    const txt = await response.text()
    console.error(txt)
    throw new Error(txt)
  }
  const { data } = (await response.json()) as { data: IssueTypesDataType[] }
  return data
}
