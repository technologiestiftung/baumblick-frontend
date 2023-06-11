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
    ]
    const mappedRows = mapRowsToDepths(ROWS_WITH_COMPLETE_DATA)
    expect(mappedRows.depth30Row).toHaveProperty('type_id', 1)
    expect(mappedRows.depth60Row).toHaveProperty('type_id', 2)
    expect(mappedRows.depth90Row).toHaveProperty('type_id', 3)
  })
  test('calculates average from latest rows with type_id 1, 2, or 3', () => {
    const EARLIEST_TIMESTAMP = '2022-08-21T11:00:00.000Z'
    const LATEST_TIMESTAMP = '2022-08-21T12:00:00.000Z'

    // From this rows we want the average of 2, 4, and 6. We mix in an older datum for type_id 3 and a row for type_id 4 to make sure that we calculate the average from the desired rows.
    const ROWS_WITH_MESSY_DATA: NowcastDataType[] = [
      {
        id: 35223,
        type_id: 1,
        value: 2,
      },
      {
        id: 89262,
        type_id: 2,
        value: 4,
      },
      {
        id: 546292,
        type_id: 3,
        value: 1000,
        timestamp: EARLIEST_TIMESTAMP,
      },
      {
        id: 41729,
        type_id: 3,
        value: 6,
        timestamp: LATEST_TIMESTAMP,
      },
      {
        id: 15292,
        type_id: 4,
        value: 1,
      },
    ]
    const mappedRows = mapRowsToDepths(ROWS_WITH_MESSY_DATA)
    expect(mappedRows.averageNowcastValue).toEqual(4)
  })
  test('maps only the rows that match', () => {
    const ROWS_WITH_COMPLETE_DATA: NowcastDataType[] = [
      {
        id: 35223,
        type_id: 1,
        value: 10,
      },
    ]
    const mappedRows = mapRowsToDepths(ROWS_WITH_COMPLETE_DATA)
    expect(mappedRows.depth30Row).toHaveProperty('type_id', 1)
    expect(mappedRows.depth60Row).toBeUndefined()
    expect(mappedRows.depth90Row).toBeUndefined()
    expect(mappedRows.averageNowcastValue).toEqual(10)
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
  })
})
