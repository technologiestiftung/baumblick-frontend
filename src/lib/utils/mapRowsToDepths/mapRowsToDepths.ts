import { NowcastDataType } from '@lib/requests/getNowcastData'

export interface MappedNowcastRowsType {
  depth30Row: NowcastDataType | undefined
  depth60Row: NowcastDataType | undefined
  depth90Row: NowcastDataType | undefined
  averageNowcastValue: number | undefined
}

/**
 * Maps raw nowcast rows to named fields according to their type (type_id 1 -> -30cm, type_id 2 -> 60cm, type_id 3 -> 90cm). Also returns the average nowcast value for these rows.
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

  const depth30Row = descendingRows.find((row) => row.type_id === 1)
  const depth60Row = descendingRows.find((row) => row.type_id === 2)
  const depth90Row = descendingRows.find((row) => row.type_id === 3)

  const foundRows = [depth30Row, depth60Row, depth90Row].filter(
    Boolean
  ) as NowcastDataType[]

  const sumOfValues = (accumulator: number, obj: NowcastDataType): number =>
    accumulator + (obj?.value || 0)

  const averageNowcastValue =
    foundRows.reduce(sumOfValues, 0) / foundRows.length

  return {
    depth30Row,
    depth60Row,
    depth90Row,
    averageNowcastValue: averageNowcastValue,
  }
}
