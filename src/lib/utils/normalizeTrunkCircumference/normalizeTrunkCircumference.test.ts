import {
  MAX_CIRCUMFERENCE,
  NORMALIZED_RANGE,
  normalizeTrunkCircumference,
} from '.'

describe('normalizeTrunkCircumference util', () => {
  test('returns a mapped value within output range', () => {
    const inputCircumference = 400

    const normalizedCircumference =
      normalizeTrunkCircumference(inputCircumference)

    expect(normalizedCircumference).toBeGreaterThanOrEqual(NORMALIZED_RANGE.min)
    expect(normalizedCircumference).toBeLessThanOrEqual(NORMALIZED_RANGE.max)
  })
  test('returns maximum of normalized range if input value exceeds than input range', () => {
    const inputCircumference = MAX_CIRCUMFERENCE + 1

    const normalizedCircumference =
      normalizeTrunkCircumference(inputCircumference)

    expect(normalizedCircumference).toEqual(NORMALIZED_RANGE.max)
  })
})
