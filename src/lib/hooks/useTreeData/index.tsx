import { getTreeData, TreeDataType } from '@lib/requests/getTreeData'
import useSWR from 'swr'

type UseTreeDataType = (treeid: string | undefined) => {
  data: TreeDataType | null
  isLoading: boolean
  error: Error | null
}

export const useTreeData: UseTreeDataType = (treeId) => {
  const { data, error } = useSWR<TreeDataType[] | undefined, Error>(
    `tree_data${treeId ? treeId : 'nodata'}`,
    () => (treeId ? getTreeData(treeId) : undefined)
  )

  return {
    data: data && data.length > 0 ? data[0] : null,
    isLoading: !data && !error,
    error: error || null,
  }
}
