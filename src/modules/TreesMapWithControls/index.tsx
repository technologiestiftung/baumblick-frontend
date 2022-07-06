import { FC } from 'react'
import { TreesMap } from '@components/TreesMap'
import { useRouter } from 'next/router'
import { PageQueryType } from '@lib/utils/queryUtil'
import { SharingOverlay } from '@components/SharingOverlay'
import { WaterLevelLegend } from '@components/WaterLevelLegend'
import classNames from 'classnames'

export interface TreesMapWithControlsPropType {
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

export const TreesMapWithControls: FC<TreesMapWithControlsPropType> = (
  pageProps
) => {
  const { pathname } = useRouter()

  return (
    <>
      <TreesMap
        mapId="trees-map"
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
      {pathname !== '/' && pathname !== '/social-image' && <SharingOverlay />}
      <div className={classNames('absolute bottom-2 left-2', 'w-[162px]')}>
        <WaterLevelLegend collapsable={true} hasShadow={true} />
      </div>
    </>
  )
}
