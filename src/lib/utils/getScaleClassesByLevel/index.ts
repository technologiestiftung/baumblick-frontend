export const getScaleClassesByLevel = (
  level: number | undefined
): {
  bg: string
  border: string
} => {
  switch (level) {
    case 1:
      return { bg: 'bg-scale-1', border: 'border-scale-1-dark' }
    case 2:
      return { bg: 'bg-scale-2', border: 'border-scale-2-dark' }
    case 3:
      return { bg: 'bg-scale-3', border: 'border-scale-3-dark' }
    case 4:
      return { bg: 'bg-scale-4', border: 'border-scale-4-dark' }
    case 5:
      return { bg: 'bg-scale-5', border: 'border-scale-5-dark' }
    default:
      return { bg: 'bg-gray-300', border: 'border-gray-400' }
  }
}
