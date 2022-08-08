export type SuctionTensionLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

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
    case suctionTensionValue > 1 && suctionTensionValue <= 30:
      return 1
    case suctionTensionValue > 30 && suctionTensionValue <= 60:
      return 2
    case suctionTensionValue > 60 && suctionTensionValue <= 90:
      return 3
    case suctionTensionValue > 90 && suctionTensionValue <= 120:
      return 4
    case suctionTensionValue > 120 && suctionTensionValue <= 150:
      return 5
    case suctionTensionValue > 150 && suctionTensionValue <= 180:
      return 6
    case suctionTensionValue > 180 && suctionTensionValue <= 210:
      return 7
    case suctionTensionValue > 210:
      return 8
    default:
      return undefined
  }
}
