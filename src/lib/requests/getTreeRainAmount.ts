import { getBaseUrl } from '@lib/utils/urlUtil'

type RawTreeRainAmountType = {
  table: {
    timestamp: string
    rainfall_in_mm: number
  }[]
  sum_rainfall_in_mm: number
}

export type TreeRainAmountType = number

const TREE_ID_COLUMN_NAME = 'gml_id'

/**
 * Fetches the rain data for a tree (in mm for the current day).
 * @param treeId string
 * @returns Promise<TreeRainAmountType[] | undefined>
 */
export const getTreeRainAmount = async (
  treeId: string
): Promise<TreeRainAmountType | undefined> => {
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

  const { data } = (await response.json()) as { data: RawTreeRainAmountType }

  return data.sum_rainfall_in_mm
}
