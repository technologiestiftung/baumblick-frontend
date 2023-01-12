import { getBaseUrl } from '@lib/utils/urlUtil'

/**
 * According to the database schema all values except id are nullable.
 */
export type NowcastDataType = {
  id: number
  /** `tree_id? is what `id` is in the the trees table.
   * (Unfortunately it is marked as nullable in the database schema)
   */
  tree_id?: string
  /** 1 = value for 30cm depth.
   *  2 = value for 60cm depth.
   *  3 = value for 90cm depth.
   *  4 = value for average.
   */
  forecast_type_id?: number
  timestamp?: string
  value?: number
  created_at?: string
  model_id?: string
}

const TABLE_NAME = 'nowcast'
const TREE_ID_COLUMN_NAME = 'tree_id'
const COLUMN_TO_SORT_BY = 'timestamp'

/**
 * Fetches the most recent nowcast data for a tree.
 * @param treeId string
 * @returns Promise<NowcastDataType[] | undefined>
 */
export const getNowcastData = async (
  treeId: string,
  csrfToken: string
): Promise<NowcastDataType[] | undefined> => {
  if (!treeId) return

  const REQUEST_URL = `${getBaseUrl()}/api/ml-api-passthrough/${TABLE_NAME}`

  const REQUEST_PARAMS = new URLSearchParams({
    [TREE_ID_COLUMN_NAME]: `eq.${treeId}`,
    order: `${COLUMN_TO_SORT_BY}.desc`,
    limit: '4',
    offset: '0',
  })

  const response = await fetch(`${REQUEST_URL}?${REQUEST_PARAMS.toString()}`, {
    method: 'POST',
    headers: {
      'CSRF-Token': csrfToken,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const txt = await response.text()
    console.error(txt)
    throw new Error(txt)
  }

  const { data } = (await response.json()) as { data: NowcastDataType[] }

  return data
}
