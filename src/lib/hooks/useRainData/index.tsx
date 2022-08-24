import {
  getTreeRainAmount,
  TreeRainAmountType,
} from '@lib/requests/getTreeRainAmount'
import useSWR from 'swr'

interface useTreeRainAmountReturnType {
  isLoading: boolean
  data: TreeRainAmountType | null
  error: Error | null
}

export const useTreeRainAmount = (
  treeId: string
): useTreeRainAmountReturnType => {
  const params = [`Rain - Tree ID - ${treeId}`]
  const { data, error } = useSWR<TreeRainAmountType | undefined, Error>(
    params,
    () => getTreeRainAmount(treeId)
  )

  return {
    isLoading: !data && !error,
    data: data || null,
    error: error || null,
  }
}
