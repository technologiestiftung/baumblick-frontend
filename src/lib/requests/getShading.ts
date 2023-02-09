import { Database } from '@lib/types/database'
import { getCurrentSeason } from '@lib/utils/getCurrentSeason'
import { getBaseUrl } from '@lib/utils/urlUtil'

const TABLE_NAME = 'shading'
const TREE_ID_COLUMN_NAME = 'tree_id'

export type ShadingType = Database['public']['Tables']['shading']['Row']

/**
 * Fetches the current shading data for a tree.
 * @param treeId string
 * @returns Promise<number | undefined>
 */
export const getShading = async (
  treeId: string,
  csrfToken: string
): Promise<number | undefined> => {
  if (!treeId) return

  const REQUEST_URL = `${getBaseUrl()}/api/ml-api-passthrough/${TABLE_NAME}`

  const REQUEST_PARAMS = new URLSearchParams({
    [TREE_ID_COLUMN_NAME]: `eq.${treeId}`,
    limit: '1',
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

  const {
    // We destructure a lot because PostgREST always returns an array:
    data: [shadingData],
  } = (await response.json()) as { data: ShadingType[] }

  const currentSeason = getCurrentSeason()

  if (!currentSeason) {
    console.error('Unable to find shading data for current season')
    return
  }

  return shadingData && (shadingData[currentSeason] as number)
}
