import { Database } from '@lib/types/database'
import { getBaseUrl } from '@lib/utils/urlUtil'

export type TreeDataType = Database['public']['Tables']['trees']['Row']

const TABLE_NAME = 'trees'
/** The API requires the search param to be the `id` column */
const TREE_ID_COLUMN_NAME = 'id'

export const getTreeData = async (
  treeId: string
): Promise<TreeDataType[] | undefined> => {
  if (!treeId) return

  const REQUEST_URL = `${getBaseUrl()}/api/ml-api-passthrough/${TABLE_NAME}?${TREE_ID_COLUMN_NAME}=eq.${treeId}`

  const response = await fetch(REQUEST_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    const txt = await response.text()
    console.error(txt)
    throw new Error(txt)
  }

  const { data } = (await response.json()) as { data: TreeDataType[] }

  return data
}
