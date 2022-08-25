import { getNowcastData, NowcastDataType } from '@lib/requests/getNowcastData'
import {
  MappedNowcastRowsType,
  mapRowsToDepths,
} from '@lib/utils/mapRowsToDepths'
import useSWR from 'swr'

interface useNowcastDataReturnType {
  isLoading: boolean
  data: MappedNowcastRowsType | null
  error: Error | null
}

export const useNowcastData = (
  treeId: string | undefined,
  csrfToken: string
): useNowcastDataReturnType => {
  const params = [`Nowcast - Tree ID - ${treeId || 'nodata'}`]
  const { data, error } = useSWR<NowcastDataType[] | undefined, Error>(
    params,
    () => (treeId ? getNowcastData(treeId, csrfToken) : undefined)
  )

  return {
    isLoading: !data && !error,
    data: data && data.length > 0 ? mapRowsToDepths(data) : null,
    error: error || null,
  }
}
