import { NowcastDataType } from '@lib/requests/getNowcastData'

export interface MappedNowcastRowsType {
  depth30Row: NowcastDataType | undefined
  depth60Row: NowcastDataType | undefined
  depth90Row: NowcastDataType | undefined
  depthAverageRow: NowcastDataType | undefined
}

export const mapRowsToDepths = (
  nowcastRows: NowcastDataType[]
): MappedNowcastRowsType => {
  return {
    depth30Row: nowcastRows.find((row) => row.type_id === 1),
    depth60Row: nowcastRows.find((row) => row.type_id === 2),
    depth90Row: nowcastRows.find((row) => row.type_id === 3),
    depthAverageRow: nowcastRows.find((row) => row.type_id === 4),
  }
}
