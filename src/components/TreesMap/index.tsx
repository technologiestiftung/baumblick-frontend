import { FC, useCallback, useEffect, useRef, useState } from 'react'
import maplibregl, {
  AttributionControl,
  GeolocateControl,
  LngLatLike,
  Map,
  NavigationControl,
} from 'maplibre-gl'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { useRouter } from 'next/router'
import { useDebouncedCallback } from 'use-debounce'
import { ViewportProps } from '@lib/types/map'
import {
  TREES_LAYER_ID,
  TREES_LAYER,
  TREES_NUMBERS,
  TREES_SOURCE,
  TREES_SOURCE_ID,
  TREES_SOURCE_LAYER_ID,
} from './treesLayer'
import { MapTilerLogo } from './MapTilerLogo'
import classNames from 'classnames'

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
  treeIdToSelect?: string
  onSelect?: (treeId: string) => void
  isMinimized?: boolean
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
  treeIdToSelect,
  onSelect = () => undefined,
  isMinimized = false,
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

  const [currentSelectedTreeId, setCurrentSelectedTreeId] = useState<
    string | undefined
  >(treeIdToSelect)

  const [geolocateControl, setGeolocateControl] =
    useState<GeolocateControl | null>(null)
  const [navigationControl, setNavigationControl] =
    useState<NavigationControl | null>(null)
  const [attributionControl, setAttributionControl] =
    useState<AttributionControl | null>(null)

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

  const onTreeClick = useCallback(
    (e) => {
      if (!e.features) return

      const features = e.features

      debouncedViewportChange.cancel()
      onSelect(features[0].properties?.trees_gml_id)
    },
    [onSelect]
  )

  useEffect(() => {
    if (!map.current) return
    map.current.on('click', TREES_LAYER_ID, onTreeClick)

    return () => {
      if (!map.current) return
      map.current.off('click', TREES_LAYER_ID, onTreeClick)
    }
  }, [map, onTreeClick])

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
      map.current.addLayer(TREES_NUMBERS)

      // If we have a treeIdToSelect on the initial map load, we already set the selected feature state, so that the selected style is applied:
      if (treeIdToSelect) {
        map.current.setFeatureState(
          {
            source: TREES_SOURCE_ID,
            sourceLayer: TREES_SOURCE_LAYER_ID,
            id: currentSelectedTreeId,
          },
          { selected: true }
        )
      }
    })

    map.current.on('click', TREES_LAYER_ID, onTreeClick)

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

    setAttributionControl(new maplibregl.AttributionControl({ compact: true }))
    setNavigationControl(
      new maplibregl.NavigationControl({
        showCompass: false,
      })
    )
    setGeolocateControl(new maplibregl.GeolocateControl({}))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (
      !map.current ||
      !navigationControl ||
      !attributionControl ||
      !geolocateControl
    )
      return

    map.current.hasControl(navigationControl) &&
      map.current.removeControl(navigationControl)
    map.current.hasControl(attributionControl) &&
      map.current.removeControl(attributionControl)
    map.current.hasControl(geolocateControl) &&
      map.current.removeControl(geolocateControl)

    if (pathname !== '/trees') return

    map.current.addControl(navigationControl, 'bottom-right')
    map.current.addControl(attributionControl, 'bottom-left')
    map.current.addControl(geolocateControl, 'bottom-right')
  }, [map, pathname, geolocateControl, navigationControl, attributionControl])

  useEffect(() => {
    if (!map.current || !map.current.loaded()) return

    if (typeof treeIdToSelect === 'undefined') {
      // Remove selected feature state from source:
      map.current.setFeatureState(
        {
          source: TREES_SOURCE_ID,
          sourceLayer: TREES_SOURCE_LAYER_ID,
          id: currentSelectedTreeId,
        },
        { selected: false }
      )

      // No more selected feature, so we set the state to undefined:
      setCurrentSelectedTreeId(undefined)
    } else {
      // If a valid treeIdToSelect is passed to the map, we set the state of currentSelectedTreeId to treeIdToSelect. So that later we can reference the ID. This will be useful when we want to remove the selected feature state (e.g. when closing the detail view)
      setCurrentSelectedTreeId(treeIdToSelect)

      // Set feature state of currentSelectedTreeId to selected
      map.current.setFeatureState(
        {
          source: TREES_SOURCE_ID,
          sourceLayer: TREES_SOURCE_LAYER_ID,
          id: currentSelectedTreeId,
        },
        { selected: true }
      )
    }
  }, [map, currentSelectedTreeId, treeIdToSelect])

  useEffect(() => {
    if (!map.current) return
    map.current.resize()
    if (!latitude || !longitude) return
    map.current.flyTo({
      center: [longitude, latitude],
      zoom: 18,
    })
  }, [map, latitude, longitude, isMinimized])

  return (
    <>
      <div
        id={mapId}
        className={classNames(
          isMinimized ? 'h-[132px]' : 'h-full',
          'w-full inline-block',
          'bg-[#FBFBFC]'
        )}
        aria-label="Kartenansicht der Bäume"
      />
      {!isMinimized && <MapTilerLogo />}
    </>
  )
}
