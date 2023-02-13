import { ShadingType } from '@lib/requests/getShading'

// Ideally, the tree_id should be omitted for SeasonType
// I couldn't figure out how, though.
export type SeasonType = keyof ShadingType

// Taken from: https://gist.github.com/jossef/d904cd0838304b0e6c01?permalink_comment_id=4291699#gistcomment-4291699

/**
 * Retrieves the current season (Nothern hemisphere):
 *
 * Winter:  21 Dec - 20 Mar
 * Spring:  21 Mar - 20 Jun
 * Summer:  21 Jun - 20 Sep
 * Fall:    21 Sep - 20 Dec
 *
 * @returns SeasonType
 */
export const getCurrentSeason = (): SeasonType | undefined => {
  const NOW = new Date()
  const MONTH = NOW.getMonth() + 1

  if (MONTH > 3 && MONTH < 6) {
    return 'spring'
  }

  if (MONTH > 6 && MONTH < 9) {
    return 'summer'
  }

  if (MONTH > 9 && MONTH < 12) {
    return 'fall'
  }

  if (MONTH >= 1 && MONTH < 3) {
    return 'winter'
  }

  const DAY = NOW.getDate()
  if (MONTH === 3) {
    return DAY < 21 ? 'winter' : 'spring'
  }

  if (MONTH === 6) {
    return DAY < 21 ? 'spring' : 'summer'
  }

  if (MONTH === 9) {
    return DAY < 21 ? 'summer' : 'fall'
  }

  if (MONTH === 12) {
    return DAY < 21 ? 'fall' : 'winter'
  }

  console.error('Unable to calculate current season')
  return
}
