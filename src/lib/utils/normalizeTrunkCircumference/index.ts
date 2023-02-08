import { mapToRange } from '../mapToRange'

const MIN_CIRCUMFERENCE = 0 // in mm
export const MAX_CIRCUMFERENCE = 800 // in mm

export const NORMALIZED_RANGE = {
  min: 0,
  max: 1,
}

/**
 * Function that normalizes a tree circumference to a value between 0 and 1.
 * @param inputCircumference: number
 * @returns number
 */
export const normalizeTrunkCircumference = (
  inputCircumference: number
): number => {
  if (inputCircumference > MAX_CIRCUMFERENCE) return NORMALIZED_RANGE.max
  return mapToRange(
    inputCircumference,
    [MIN_CIRCUMFERENCE, MAX_CIRCUMFERENCE],
    [NORMALIZED_RANGE.min, NORMALIZED_RANGE.max]
  )
}
