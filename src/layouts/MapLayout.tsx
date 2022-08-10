import { TreesMap } from '@components/TreesMap'
import { SuctionTensionLegend } from '@components/SuctionTensionLegend'
import { FC } from 'react'
import { useHasScrolledPastThreshold } from '@lib/hooks/useHasScrolledPastThreshold'
import classNames from 'classnames'

export const MAP_CONFIG = {
  minZoom: 11.5,
  maxZoom: 22,
  defaultZoom: 14,
  defaultLatitude: 52.520952,
  defaultLongitude: 13.400033,
}

export interface MapLayoutType {
  latitude?: number
  longitude?: number
  treeIdToSelect?: string
  zoom?: number
  onTreeSelect?: (treeId: string) => void
  isMinimized?: boolean
}

export const MapLayout: FC<MapLayoutType> = ({
  latitude,
  longitude,
  treeIdToSelect,
  zoom,
  onTreeSelect = () => undefined,
  isMinimized,
  children,
}) => {
  const { hasScrolledPastThreshold } = useHasScrolledPastThreshold({
    threshold: 5,
    scrollParent: 'main',
  })

  return (
    <>
      <div className="w-full h-full overflow-hidden">
        <TreesMap
          mapId="trees-map"
          staticViewportProps={{
            minZoom: MAP_CONFIG.minZoom,
            maxZoom: MAP_CONFIG.maxZoom,
          }}
          initialViewportProps={{
            latitude: latitude || MAP_CONFIG.defaultLatitude,
            longitude: longitude || MAP_CONFIG.defaultLongitude,
            zoom: zoom || MAP_CONFIG.defaultZoom,
          }}
          onSelect={onTreeSelect}
          latitude={latitude}
          longitude={longitude}
          treeIdToSelect={treeIdToSelect}
          isMinimized={isMinimized}
        />
        <SuctionTensionLegend
          collapsable={true}
          hasShadow={true}
          className={classNames(
            'transition-opacity',
            hasScrolledPastThreshold && 'opacity-0 pointer-events-none'
          )}
        />
      </div>
      {children}
    </>
  )
}
