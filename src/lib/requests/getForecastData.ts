import { getBaseUrl } from '@lib/utils/urlUtil'
import { startOfYesterday } from 'date-fns'

/**
 * According to the database schema all values except id are nullable.
 */
export type ForecastDataType = {
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
  type_id?: number
  timestamp?: string
  value?: number
  created_at?: string
  model_id?: string
}

const TABLE_NAME = 'forecast'
const TREE_ID_COLUMN_NAME = 'tree_id'
const TYPE_ID_COLUMN_NAME = 'type_id'
const TYPE_ID_FOR_AVERAGE = '4'

const TIMESTAMP_COLUMN = 'timestamp'
const TODAY = startOfYesterday().toISOString()
const FORECAST_MAX_ROWS = 13

/**
 * Fetches the forecast data for a tree (maximum 14 days).
 * @param treeId string
 * @returns Promise<ForecastDataType[] | undefined>
 */
export const getForecastData = async (
  treeId: string,
  csrfToken: string
): Promise<ForecastDataType[] | undefined> => {
  if (!treeId) return

  const REQUEST_URL = `${getBaseUrl()}/api/ml-api-passthrough/${TABLE_NAME}`

  const REQUEST_PARAMS = new URLSearchParams({
    [TREE_ID_COLUMN_NAME]: `eq.${treeId}`,
    [TYPE_ID_COLUMN_NAME]: `eq.${TYPE_ID_FOR_AVERAGE}`,
    [TIMESTAMP_COLUMN]: `gte.${TODAY}`,
    order: `${TIMESTAMP_COLUMN}`,
    limit: `${FORECAST_MAX_ROWS}`,
    offset: '1',
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

  const { data } = (await response.json()) as { data: ForecastDataType[] }

  return data
}
