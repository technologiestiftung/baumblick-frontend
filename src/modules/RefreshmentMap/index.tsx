import { FC } from 'react'
import { Map as MapRoot } from '@components/Map'
import { useHasMobileSize } from '@lib/hooks/useHasMobileSize'
import { MapControls } from '@components/MapControls'
import { useRouter } from 'next/router'
import { PageQueryType } from '@lib/utils/queryUtil'
import { AppTitle } from '@components/AppTitle'
import { SharingOverlay } from '@components/SharingOverlay'
import { DisclaimerLinks } from '@components/DisclaimerLinks'

export interface RefreshmentMapPropType {
  title?: string
  query: Partial<PageQueryType>
}

export const MAP_CONFIG = {
  minZoom: 11.5,
  maxZoom: 19,
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
      <MapRoot
        mapStyle="mapbox://styles/mapbox/light-v10"
        staticViewportProps={{
          minZoom: MAP_CONFIG.minZoom,
          maxZoom: MAP_CONFIG.maxZoom,
        }}
        initialViewportProps={{
          latitude: pageProps.query.latitude || MAP_CONFIG.defaultLatitude,
          longitude: pageProps.query.longitude || MAP_CONFIG.defaultLongitude,
          zoom: pageProps.query.zoom || MAP_CONFIG.defaultZoom,
        }}
        interactiveLayerIds={[]}
      >
        {pathname !== '/' && pathname !== '/social-image' && (
          <>
            <MapControls
              className={`absolute right-4 ${
                hasMobileSize ? 'top-4' : 'bottom-4'
              }`}
            />
          </>
        )}
      </MapRoot>
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
