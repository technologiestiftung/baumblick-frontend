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
  treeId: string | undefined
): useTreeRainAmountReturnType => {
  const params = [`Rain - Tree ID - ${treeId || 'nodata'}`]
  const { data, error } = useSWR<TreeRainAmountType | undefined, Error>(
    params,
    () => (treeId ? getTreeRainAmount(treeId) : undefined)
  )

  return {
    isLoading: !data && !error,
    data: data || null,
    error: error || null,
  }
}
