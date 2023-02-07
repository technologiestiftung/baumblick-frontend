/**
 * Function that maps a value from one range to another
 * @param fromValue number
 * @param fromRange [number, number]
 * @param toRange [number, number]
 * @returns number
 */
export const mapToRange = (
  fromValue: number,
  [fromMin, fromMax]: [number, number],
  [toMin, toMax]: [number, number]
): number => {
  return ((fromValue - fromMin) / (fromMax - fromMin)) * (toMax - toMin) + toMin
}
