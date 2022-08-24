import { getBaseUrl } from '@lib/utils/urlUtil'

type RawRainDataType = {
  weekday: string
  daily_rainfall_sum_mm: number
}

export type RainDataType = {
  weekday: Date
  daily_rainfall_sum_mm: number
}

const TREE_ID_COLUMN_NAME = 'gml_id'

/**
 * Fetches the rain data for a tree (in mm for the current day).
 * @param treeId string
 * @returns Promise<RainDataType[] | undefined>
 */
export const getRainData = async (
  treeId: string
): Promise<RainDataType[] | undefined> => {
  if (!treeId) return

  const REQUEST_URL = `${getBaseUrl()}/api/trees/rainfall`

  const REQUEST_PARAMS = new URLSearchParams({
    [TREE_ID_COLUMN_NAME]: `${treeId}`,
  })

  const response = await fetch(`${REQUEST_URL}?${REQUEST_PARAMS.toString()}`)

  if (!response.ok) {
    const txt = await response.text()
    console.error(txt)
    throw new Error(txt)
  }

  const data = (await response.json()) as { data: RawRainDataType[] }

  return data.data.map(({ weekday, daily_rainfall_sum_mm }) => ({
    weekday: new Date(weekday),
    daily_rainfall_sum_mm,
  }))
}
