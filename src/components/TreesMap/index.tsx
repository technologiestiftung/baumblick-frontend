import { FC, useEffect, useRef, useState } from 'react'
import maplibregl, { LngLatLike, Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { useRouter } from 'next/router'
import { useDebouncedCallback } from 'use-debounce'
import { ViewportProps } from '@lib/types/map'
import {
  TREES_LAYER_ID,
  TREES_LAYER,
  TREES_SOURCE,
  TREES_SOURCE_ID,
  TREES_SOURCE_LAYER_ID,
} from './treesLayer'
import { MapTilerLogo } from './MapTilerLogo'

interface MapProps {
  staticViewportProps?: {
    maxZoom: number
    minZoom: number
  }
  initialViewportProps: {
    latitude: number
    longitude: number
    zoom: number
  }
  mapId: string
  mapStyle?: string
  latitude?: number
  longitude?: number
  onSelect?: (treeId: string) => void
}

type URLViewportType = Pick<ViewportProps, 'latitude' | 'longitude' | 'zoom'>

const easeInOutQuad = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

export const TreesMap: FC<MapProps> = ({
  initialViewportProps,
  staticViewportProps,
  mapId,
  mapStyle = process.env.NEXT_PUBLIC_MAPTILER_BASEMAP_URL as string,
  latitude,
  longitude,
  onSelect = () => undefined,
}) => {
  const { replace, query, pathname } = useRouter()
  const mappedQuery = mapRawQueryToState(query)
  const transitionProps = {
    transitionDuration: 2000,
    transitionEasing: easeInOutQuad,
  }

  const [viewport, setViewport] = useState<ViewportProps>({
    ...staticViewportProps,
    ...initialViewportProps,
  })

  useEffect(() => {
    setViewport({
      ...viewport,
      ...transitionProps,
      latitude: mappedQuery.latitude || viewport.latitude,
      longitude: mappedQuery.longitude || viewport.longitude,
      zoom: mappedQuery.zoom || viewport.zoom,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mappedQuery.latitude, mappedQuery.longitude, mappedQuery.zoom])

  const debouncedViewportChange = useDebouncedCallback(
    (viewport: URLViewportType): void => {
      if (pathname !== '/trees') return
      const newQuery = { ...mappedQuery, ...viewport }

      void replace({ pathname, query: newQuery }, undefined, { shallow: true })
    },
    1000
  )

  const map = useRef<Map | null>(null)

  const MAP_STYLE_URL = `${mapStyle}?key=${
    process.env.NEXT_PUBLIC_MAPTILER_KEY as string
  }`

  useEffect(() => {
    map.current = new maplibregl.Map({
      container: mapId || '',
      style: MAP_STYLE_URL,
      center: [viewport.longitude, viewport.latitude] as LngLatLike,
      zoom: viewport.zoom,
      attributionControl: false,
    })

    if (!map.current) return

    let hoveredTreeId: string | null = null

    map.current.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      'bottom-left'
    )

    map.current.addControl(
      new maplibregl.NavigationControl({
        showCompass: false,
      }),
      'bottom-right'
    )

    map.current.addControl(new maplibregl.GeolocateControl({}), 'bottom-right')

    map.current.on('load', function () {
      if (!map.current) return

      map.current.on('moveend', (e) => {
        debouncedViewportChange({
          latitude: e.target.transform._center.lat,
          longitude: e.target.transform._center.lng,
          zoom: e.target.transform._zoom,
        })
      })

      map.current.addSource(TREES_SOURCE_ID, TREES_SOURCE)
      map.current.addLayer(TREES_LAYER)
    })

    map.current.on('click', TREES_LAYER_ID, function (e) {
      if (!e.features) return

      const features = e.features

      debouncedViewportChange.cancel()
      onSelect(features[0].properties?.trees_gml_id)
    })

    map.current.on('mousemove', TREES_LAYER_ID, function (e) {
      if (!map.current || !e.features || e.features.length === 0) return
      if (hoveredTreeId) {
        map.current.setFeatureState(
          {
            source: TREES_SOURCE_ID,
            sourceLayer: TREES_SOURCE_LAYER_ID,
            id: hoveredTreeId,
          },
          { hover: false }
        )
      }

      if (e.features[0].id) {
        hoveredTreeId = e.features[0].id as string

        map.current.setFeatureState(
          {
            source: TREES_SOURCE_ID,
            sourceLayer: TREES_SOURCE_LAYER_ID,
            id: e.features[0].id,
          },
          { hover: true }
        )
      }
    })

    map.current.on('mouseleave', TREES_LAYER_ID, function () {
      if (!map.current) return

      if (hoveredTreeId) {
        map.current.setFeatureState(
          {
            source: TREES_SOURCE_ID,
            sourceLayer: TREES_SOURCE_LAYER_ID,
            id: hoveredTreeId,
          },
          { hover: false }
        )
      }

      hoveredTreeId = null
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!map.current || !latitude || !longitude) return
    map.current.flyTo({ center: [longitude, latitude], zoom: 18 })
  }, [map, latitude, longitude])

  return (
    <>
      <div
        id={mapId}
        className="!static w-full h-full bg-[#FBFBFC]"
        aria-label="Kartenansicht der Bäume"
      ></div>
      <MapTilerLogo />
    </>
  )
}
