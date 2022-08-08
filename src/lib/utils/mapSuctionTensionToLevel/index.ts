export type SuctionTensionLevel = 1 | 2 | 3 | 4 | 5

/**
 * Maps a real suction tension ("Saugspannung") value (usually between 0 and 240)
 * to one of the "levels" we have defined for the scale.
 * @param suctionTensionValue number
 * @returns SuctionTensionLevel | undefined
 */
export const mapSuctionTensionToLevel = (
  suctionTensionValue: number
): SuctionTensionLevel | undefined => {
  switch (true) {
    case suctionTensionValue > 0 && suctionTensionValue <= 50:
      return 1
    case suctionTensionValue > 50 && suctionTensionValue <= 100:
      return 2
    case suctionTensionValue > 100 && suctionTensionValue <= 150:
      return 3
    case suctionTensionValue > 150 && suctionTensionValue <= 200:
      return 4
    case suctionTensionValue > 200:
      return 5
    default:
      return undefined
  }
}
