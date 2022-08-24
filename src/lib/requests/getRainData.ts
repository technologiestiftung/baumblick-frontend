import { getBaseUrl } from '@lib/utils/urlUtil'

type RawRainDataType = {
  table: {
    timestamp: string
    rainfall_in_mm: number
  }[]
  sum_rainfall_in_mm: number
}

export type RainDataType = number

const TREE_ID_COLUMN_NAME = 'gml_id'

/**
 * Fetches the rain data for a tree (in mm for the current day).
 * @param treeId string
 * @returns Promise<RainDataType[] | undefined>
 */
export const getRainData = async (
  treeId: string
): Promise<RainDataType | undefined> => {
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

  const { data } = (await response.json()) as { data: RawRainDataType }

  return data.sum_rainfall_in_mm
}
