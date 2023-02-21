export type WaterSupplyLabelType = 'Gut' | 'Mäßig' | 'Kritisch'

export interface WaterSupplyStatusType {
  suctionTensionRange: [number, number]
  label: WaterSupplyLabelType
  id: 'good' | 'medium' | 'critical'
}

export const WATER_SUPPLY_STATUSES: WaterSupplyStatusType[] = [
  {
    suctionTensionRange: [0, 33],
    label: 'Gut',
    id: 'good',
  },
  {
    suctionTensionRange: [33, 81],
    label: 'Mäßig',
    id: 'medium',
  },
  {
    suctionTensionRange: [81, 270],
    label: 'Kritisch',
    id: 'critical',
  },
]

/**
 * Maps a real suction tension ("Saugspannung") value (usually between 0 and 240)
 * to one of the "levels" we have defined for the scale.
 * @param suctionTensionValue number
 * @returns WaterSupplyStatusType | undefined
 */
export const mapSuctionTensionToStatus = (
  suctionTensionValue: number
): WaterSupplyStatusType | undefined => {
  return WATER_SUPPLY_STATUSES.find((statusItem) => {
    const [minSuctionTensionValue, maxSuctionTensionValue] =
      statusItem.suctionTensionRange
    return (
      suctionTensionValue > minSuctionTensionValue &&
      suctionTensionValue <= maxSuctionTensionValue
    )
  })
}
