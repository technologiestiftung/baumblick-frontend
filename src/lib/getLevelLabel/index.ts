import { WATER_SUPPLY_LEVELS } from '@lib/utils/mapSuctionTensionToLevel'

export const getLevelLabel = (levelId: string): string | undefined => {
  return WATER_SUPPLY_LEVELS.find((levelItem) => levelItem.id === levelId)
    ?.label
}
