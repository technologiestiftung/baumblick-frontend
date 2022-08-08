export type SaugspannungLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export const mapNowcastToScale = (
  nowcastValue: number
): SaugspannungLevel | undefined => {
  switch (true) {
    case nowcastValue > 1 && nowcastValue <= 30:
      return 1
    case nowcastValue > 30 && nowcastValue <= 60:
      return 2
    case nowcastValue > 60 && nowcastValue <= 90:
      return 3
    case nowcastValue > 90 && nowcastValue <= 120:
      return 4
    case nowcastValue > 120 && nowcastValue <= 150:
      return 5
    case nowcastValue > 150 && nowcastValue <= 180:
      return 6
    case nowcastValue > 180 && nowcastValue <= 210:
      return 7
    case nowcastValue > 210:
      return 8
    default:
      return undefined
  }
}
