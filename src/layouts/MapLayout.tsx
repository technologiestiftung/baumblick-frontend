import { TreesMap } from '@components/TreesMap'
import { WaterLevelLegend } from '@components/WaterLevelLegend'
import classNames from 'classnames'
import { FC } from 'react'

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
  zoom?: number
  onTreeSelect?: (treeId: string) => void
  isMinimized?: boolean
}

export const MapLayout: FC<MapLayoutType> = ({
  latitude,
  longitude,
  zoom,
  onTreeSelect = () => undefined,
  isMinimized,
  children,
}) => {
  return (
    <>
      <div className="w-full h-full">
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
          isMinimized={isMinimized}
        />
        <div className={classNames('absolute top-2 left-2', 'w-[162px]')}>
          <WaterLevelLegend collapsable={true} hasShadow={true} />
        </div>
      </div>
      {children}
    </>
  )
}
