import { getBaseUrl } from '@lib/utils/urlUtil'

const VIEW_NAME = 'watering'
const TREE_ID_COLUMN_NAME = 'tree_id'

// Note that we have to define this type ourselves because the type generator
// is currently not able to type database views.
interface WateringType {
  tree_id: string
  sum: number
  date: Date
}

/**
 * Fetches the watering value in liters for a tree.
 * Currently this fetches the waterings of the past 60 days.
 * @param treeId string
 * @param csrfToken string
 * @returns number | undefined
 */
export const getWateringValue = async (
  treeId: string,
  csrfToken: string
): Promise<number | undefined> => {
  if (!treeId) return

  const REQUEST_URL = `${getBaseUrl()}/api/ml-api-passthrough/${VIEW_NAME}`

  const REQUEST_PARAMS = new URLSearchParams({
    [TREE_ID_COLUMN_NAME]: `eq.${treeId}`,
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

  const { data: waterings } = (await response.json()) as {
    data: WateringType[]
  }

  if (!waterings || waterings.length === 0) return

  const wateringValue = waterings
    .map((watering) => watering.sum)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    })

  return wateringValue
}
