import { NowcastDataType } from '@lib/requests/getNowcastData'

export interface MappedNowcastRowsType {
  depth30Row: NowcastDataType | undefined
  depth60Row: NowcastDataType | undefined
  depth90Row: NowcastDataType | undefined
  depthAverageRow: NowcastDataType | undefined
}

/**
 * Maps raw nowcast rows to named fields according to their type (type_id 1 -> -30cm, type_id 2 -> 60cm, type_id 3 -> 90cm, type_id 4 -> average)
 * @param nowcastRows NowcastDataType[]
 * @returns MappedNowcastRowsType
 */
export const mapRowsToDepths = (
  nowcastRows: NowcastDataType[]
): MappedNowcastRowsType => {
  const descendingRows = nowcastRows.sort((a, b) => {
    if (
      typeof a.timestamp === 'undefined' ||
      typeof b.timestamp === 'undefined'
    ) {
      return 0
    }
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
  return {
    depth30Row: descendingRows.find((row) => row.type_id === 1),
    depth60Row: descendingRows.find((row) => row.type_id === 2),
    depth90Row: descendingRows.find((row) => row.type_id === 3),
    depthAverageRow: descendingRows.find((row) => row.type_id === 4),
  }
}
