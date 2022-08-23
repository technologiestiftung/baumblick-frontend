import { getBaseUrl } from '@lib/utils/urlUtil'

/**
 * According to the database schema all values except gml_id are nullable.
 * The gml_id is what is the baum_id in the nowcast table.
 */
export type TreeDataType = {
  gml_id: string
  baumid?: string
  standortnr?: string
  kennzeich?: string
  namenr?: string
  /** Genus in German  */
  art_dtsch?: string
  /** Botanical genus  */
  art_bot?: string
  gattung_deutsch?: string
  hausnr?: string
  strname?: string
  pflanzjahr?: number
  standalter?: number
  /** Circumference of the tree trunk  */
  stammumfg?: number
  baumhoehe?: number
  bezirk?: string
  eigentuemer?: string
  zusatz?: string
  /** Diameter of the treetop  */
  kronedurch?: number
  /** `geometry` is actually a PostGIS Point type but we receive it already parsed. */
  geometry?: {
    type: 'Point'
    coordinates: [number, number]
  }
  lat?: number
  lng?: number
  created_at?: string
  updated_at?: string
}

const TABLE_NAME = 'trees'
/** The API requires the search param to be the `gml_id` column */
const TREE_ID_COLUMN_NAME = 'gml_id'

export const getTreeData = async (
  treeId: string,
  csrfToken: string
): Promise<TreeDataType[] | undefined> => {
  if (!treeId) return

  const REQUEST_URL = `${getBaseUrl()}/api/ml-api-passthrough/${TABLE_NAME}?${TREE_ID_COLUMN_NAME}=eq.${treeId}`

  const response = await fetch(REQUEST_URL, {
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

  const { data } = (await response.json()) as { data: TreeDataType[] }

  return data
}
