import { mapToRange, RangeType } from '../mapToRange'

export const DEFAULT_RANGE = {
  min: 0,
  max: 1,
}

/**
 * Normalizes an input value from an input range to an output range ([0, 1] by default)
 * @param inputValue number
 * @param fromRange RangeType
 * @param toRange RangeType | undefined
 * @returns number
 */
export const normalizeValue = (
  inputValue: number,
  fromRange: RangeType,
  toRange: RangeType | undefined = [DEFAULT_RANGE.min, DEFAULT_RANGE.max]
): number => {
  if (inputValue > Math.max(...fromRange)) return Math.max(...toRange)
  return mapToRange(inputValue, fromRange, toRange)
}
