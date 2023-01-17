import { Button } from '@components/Button'
import { GPS as GPSIcon } from '@components/Icons'
import { getGeolocation } from '@lib/utils/geolocationUtil'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { FC, useCallback, useState } from 'react'

export const GPSButton: FC = () => {
  const { t } = useTranslation('common')
  const { push } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const onClick = useCallback(async () => {
    try {
      setIsLoading(true)
      const { latitude, longitude } = await getGeolocation()
      void push({
        pathname: '/trees',
        query: {
          latitude: `${latitude}`,
          longitude: `${longitude}`,
        },
      })
    } catch {
      void push('/trees')
    }
    setIsLoading(false)
  }, [push])

  return (
    <Button
      onClick={onClick}
      primary
      disabled={isLoading}
      className={`w-full ${isLoading ? 'animate-pulse' : ''} `}
    >
      <GPSIcon className="text-gray-400" />
      {isLoading ? t('home.ctaLoading') : t('home.cta')}
    </Button>
  )
}
