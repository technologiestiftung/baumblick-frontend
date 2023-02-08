import { mapToRange } from '../mapToRange'

const MIN_CIRCUMFERENCE = 0 // in mm
const MAX_CIRCUMFERENCE = 800 // in mm

/**
 * Function that normalizes a tree circumference to a value between 0 and 1.
 * @param inputCircumference: number
 * @returns number
 */
export const normalizeTrunkCircumference = (
  inputCircumference: number
): number =>
  mapToRange(inputCircumference, [MIN_CIRCUMFERENCE, MAX_CIRCUMFERENCE], [0, 1])
