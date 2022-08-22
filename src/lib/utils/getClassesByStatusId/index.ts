import { WaterSupplyStatusType } from '../mapSuctionTensionToStatus'

export const getClassesByStatusId = (
  id: WaterSupplyStatusType['id'] | undefined
): {
  bg: string
  border: string
} => {
  switch (id) {
    case 'good':
      return { bg: 'bg-scale-good', border: 'border-scale-good-dark' }
    case 'medium':
      return { bg: 'bg-scale-medium', border: 'border-scale-medium-dark' }
    case 'critical':
      return { bg: 'bg-scale-critical', border: 'border-scale-critical-dark' }
    default:
      return { bg: 'bg-gray-300', border: 'border-gray-400' }
  }
}
