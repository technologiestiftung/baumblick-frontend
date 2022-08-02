import { getNowcastData, NowcastDataType } from '@lib/requests/getNowcastData'
import useSWR from 'swr'

interface useListDataReturnType {
  isLoading: boolean
  data: NowcastDataType[] | null
  error: Error | null
}

export const useNowcastData = (treeId: string): useListDataReturnType => {
  const params = [`Tree ID - ${treeId}`]
  const { data, error } = useSWR<NowcastDataType[] | undefined, Error>(
    params,
    () => getNowcastData(treeId)
  )

  return {
    isLoading: !data && !error,
    data: data && data.length > 0 ? data : null,
    error: error || null,
  }
}
