import { WATER_SUPPLY_STATUSES } from '@lib/utils/mapSuctionTensionToStatus'

export const getStatusLabel = (statusId: string): string | undefined => {
  return WATER_SUPPLY_STATUSES.find((statusItem) => statusItem.id === statusId)
    ?.label
}
