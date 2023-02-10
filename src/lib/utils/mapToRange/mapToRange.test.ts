import { mapToRange } from '.'

describe('mapToRange util', () => {
  test('maps a number from one range to another', () => {
    const input = 5
    const FROM_RANGE = [0, 10] as [number, number]
    const TO_RANGE = [0, 1] as [number, number]

    const mappedValue = mapToRange(input, FROM_RANGE, TO_RANGE)

    expect(mappedValue).toEqual(0.5)
  })
})
