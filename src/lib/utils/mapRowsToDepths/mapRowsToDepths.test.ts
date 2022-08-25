import { NowcastDataType } from '@lib/requests/getNowcastData'
import { mapRowsToDepths } from '.'

describe('mapRowsToDepths', () => {
  test('maps one row to one depth', () => {
    const ROWS_WITH_COMPLETE_DATA: NowcastDataType[] = [
      {
        id: 35223,
        type_id: 1,
      },
      {
        id: 89262,
        type_id: 2,
      },
      {
        id: 41729,
        type_id: 3,
      },
      {
        id: 15292,
        type_id: 4,
      },
    ]
    const mappedRows = mapRowsToDepths(ROWS_WITH_COMPLETE_DATA)
    expect(mappedRows.depth30Row).toHaveProperty('type_id', 1)
    expect(mappedRows.depth60Row).toHaveProperty('type_id', 2)
    expect(mappedRows.depth90Row).toHaveProperty('type_id', 3)
    expect(mappedRows.depthAverageRow).toHaveProperty('type_id', 4)
  })
  test('maps only the rows that match', () => {
    const ROWS_WITH_COMPLETE_DATA: NowcastDataType[] = [
      {
        id: 35223,
        type_id: 1,
      },
      {
        id: 15292,
        type_id: 4,
      },
    ]
    const mappedRows = mapRowsToDepths(ROWS_WITH_COMPLETE_DATA)
    expect(mappedRows.depth30Row).toHaveProperty('type_id', 1)
    expect(mappedRows.depth60Row).toBeUndefined()
    expect(mappedRows.depth90Row).toBeUndefined()
    expect(mappedRows.depthAverageRow).toHaveProperty('type_id', 4)
  })
  test('uses the latest timestamp if there are duplicates', () => {
    const EARLIEST_TIMESTAMP = '2022-08-21T11:00:00.000Z'
    const LATEST_TIMESTAMP = '2022-08-21T12:00:00.000Z'
    const ROWS_WITH_DUPLICATE_TYPES: NowcastDataType[] = [
      {
        id: 35223,
        type_id: 1,
      },
      {
        id: 89262,
        type_id: 2,
        timestamp: LATEST_TIMESTAMP,
      },
      {
        id: 41729,
        type_id: 2,
        timestamp: EARLIEST_TIMESTAMP,
      },
      {
        id: 15292,
        type_id: 2,
      },
    ]
    const mappedRows = mapRowsToDepths(ROWS_WITH_DUPLICATE_TYPES)
    expect(mappedRows.depth30Row).toHaveProperty('type_id', 1)
    expect(mappedRows.depth60Row).toHaveProperty('type_id', 2)
    expect(mappedRows.depth60Row).toHaveProperty('timestamp', LATEST_TIMESTAMP)
    expect(mappedRows.depth90Row).toBeUndefined()
    expect(mappedRows.depthAverageRow).toBeUndefined()
  })
})
