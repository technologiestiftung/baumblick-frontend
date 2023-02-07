import { mapToRange } from './mapToRange'

const MIN_CIRCUMFERENCE = 0
const MAX_CIRCUMFERENCE = 250

/**
 * Function that normalizes a tree circumference to a value between 0 and 1.
 * @param inputCircumference: number
 * @returns number
 */
export const normalizeCircumference = (inputCircumference: number): number =>
  mapToRange(inputCircumference, [MIN_CIRCUMFERENCE, MAX_CIRCUMFERENCE], [0, 1])
