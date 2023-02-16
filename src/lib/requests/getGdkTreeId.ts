import { getBaseUrl } from '@lib/utils/urlUtil'

const TREE_ID_COLUMN_NAME = 'gmlid'

export interface GdkTreeIdReturnType {
  id: string // Gieß den Kiez tree ID
  gmlid: string
}

/**
 * Fetches a tree's Gieß den Kiez ID which differs from the ID we use
 * in this project.
 * @param treeId string
 * @returns Promise<string | undefined>
 */
export const getGdkTreeId = async (
  treeId: string
): Promise<GdkTreeIdReturnType['id'] | undefined> => {
  if (!treeId) return

  const REQUEST_URL = `${getBaseUrl()}/api/trees/gdk`

  const REQUEST_PARAMS = new URLSearchParams({
    [TREE_ID_COLUMN_NAME]: treeId,
  })

  const response = await fetch(`${REQUEST_URL}?${REQUEST_PARAMS.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const txt = await response.text()
    console.error(txt)
    throw new Error(txt)
  }

  const { data } = (await response.json()) as { data: GdkTreeIdReturnType[] }

  if (!data || data.length !== 1) return

  return data[0].id
}
