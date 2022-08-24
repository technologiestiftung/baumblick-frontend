import { getRainData, RainDataType } from '@lib/requests/getRainData'
import useSWR from 'swr'

interface useRainDataReturnType {
  isLoading: boolean
  data: RainDataType | null
  error: Error | null
}

export const useRainData = (treeId: string): useRainDataReturnType => {
  const params = [`Rain - Tree ID - ${treeId}`]
  const { data, error } = useSWR<RainDataType | undefined, Error>(params, () =>
    getRainData(treeId)
  )

  return {
    isLoading: !data && !error,
    data: data || null,
    error: error || null,
  }
}
