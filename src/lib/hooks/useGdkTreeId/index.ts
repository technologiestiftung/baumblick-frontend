import { GdkTreeIdReturnType, getGdkTreeId } from '@lib/requests/getGdkTreeId'
import useSWR from 'swr'

export interface useGdkTreeIdReturnType {
  isLoading: boolean
  data: GdkTreeIdReturnType['id'] | null
  error: Error | null
}

export const useGdkTreeId = (
  treeId: string | undefined
): useGdkTreeIdReturnType => {
  const params = [`GDK Tree ID - Tree ID - ${treeId || 'nodata'}`]
  const { data, error } = useSWR<
    useGdkTreeIdReturnType['data'] | undefined,
    Error
  >(params, () => (treeId ? getGdkTreeId(treeId) : undefined))

  return {
    isLoading: !data && !error,
    data: data || null,
    error: error || null,
  }
}
