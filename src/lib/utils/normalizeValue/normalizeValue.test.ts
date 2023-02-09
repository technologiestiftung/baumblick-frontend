import { DEFAULT_RANGE, normalizeValue } from '.'

describe('normalizeValue util', () => {
  test('returns a mapped value within output range', () => {
    const inputValue = 400

    const normalizedValue = normalizeValue(inputValue, [0, 800])

    expect(normalizedValue).toBeGreaterThanOrEqual(DEFAULT_RANGE.min)
    expect(normalizedValue).toBeLessThanOrEqual(DEFAULT_RANGE.max)
  })
  test('returns maximum of normalized range if input value exceeds input range', () => {
    const inputValue = 201

    const normalizedValue = normalizeValue(inputValue, [0, 200])

    expect(normalizedValue).toEqual(DEFAULT_RANGE.max)
  })
})
