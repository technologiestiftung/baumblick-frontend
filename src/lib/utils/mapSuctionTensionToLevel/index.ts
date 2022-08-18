export type WaterSupplyLabelType = 'Gut' | 'Mäßig' | 'Kritisch'

export interface WaterSupplyLevelType {
  suctionTensionRange: [number, number]
  label: WaterSupplyLabelType
  id: 'good' | 'medium' | 'critical'
}

export const WATER_SUPPLY_LEVELS: WaterSupplyLevelType[] = [
  {
    suctionTensionRange: [0, 25],
    label: 'Gut',
    id: 'good',
  },
  {
    suctionTensionRange: [25, 62],
    label: 'Mäßig',
    id: 'medium',
  },
  {
    suctionTensionRange: [62, 250],
    label: 'Kritisch',
    id: 'critical',
  },
]

/**
 * Maps a real suction tension ("Saugspannung") value (usually between 0 and 240)
 * to one of the "levels" we have defined for the scale.
 * @param suctionTensionValue number
 * @returns WaterSupplyLevelType | undefined
 */
export const mapSuctionTensionToLevel = (
  suctionTensionValue: number
): WaterSupplyLevelType | undefined => {
  return WATER_SUPPLY_LEVELS.find((levelItem) => {
    const [minSuctionTensionValue, maxSuctionTensionValue] =
      levelItem.suctionTensionRange
    return (
      suctionTensionValue > minSuctionTensionValue &&
      suctionTensionValue <= maxSuctionTensionValue
    )
  })
}
