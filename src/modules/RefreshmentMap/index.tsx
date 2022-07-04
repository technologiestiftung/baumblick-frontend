import { FC } from 'react'
import { TreesMap } from '@components/Map'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { useRouter } from 'next/router'
import { SplashScreen } from './../../components/SplashScreen'
import { PageQueryType } from '@lib/utils/queryUtil'
import { AppTitle } from '@components/AppTitle'
import { SharingOverlay } from '@components/SharingOverlay'
import { DisclaimerLinks } from '@components/DisclaimerLinks'

interface RefreshmentMapPropType {
  title?: string
  query: Partial<PageQueryType>
}

export const MAP_CONFIG = {
  minZoom: 11.5,
  maxZoom: 22,
  defaultZoom: 14,
  defaultLatitude: 52.520952,
  defaultLongitude: 13.400033,
}

export const RefreshmentMap: FC<RefreshmentMapPropType> = (pageProps) => {
  const hasMobileSize = useHasMobileSize()

  const { pathname } = useRouter()

  return (
    <>
      {(pathname === '/map' || pathname === '/social-image') && <AppTitle />}
      {pathname === '/' && <SplashScreen />}
      <TreesMap
        staticViewportProps={{
          minZoom: MAP_CONFIG.minZoom,
          maxZoom: MAP_CONFIG.maxZoom,
        }}
        initialViewportProps={{
          latitude: pageProps.query.latitude || MAP_CONFIG.defaultLatitude,
          longitude: pageProps.query.longitude || MAP_CONFIG.defaultLongitude,
          zoom: pageProps.query.zoom || MAP_CONFIG.defaultZoom,
        }}
        onSelect={(treeId) => console.log('Selected tree ID:', treeId)}
      />
      {pathname !== '/' && pathname !== '/social-image' && (
        <>
          <DisclaimerLinks
            className={pathname !== '/map' && hasMobileSize ? 'hidden' : ''}
          />
          <SharingOverlay />
        </>
      )}
    </>
  )
}
