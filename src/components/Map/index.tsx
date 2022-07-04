import { FC, useEffect, useRef, useState } from 'react'
import maplibregl, { LngLatLike, Map } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { useRouter } from 'next/router'
import { useDebouncedCallback } from 'use-debounce'
import { ViewportProps } from '@lib/types/map'

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
  mapStyle?: string
  onSelect?: (treeId: string) => void
}

type URLViewportType = Pick<ViewportProps, 'latitude' | 'longitude' | 'zoom'>

const easeInOutQuad = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1

export const TreesMap: FC<MapProps> = ({
  initialViewportProps,
  staticViewportProps,
  mapStyle = process.env.NEXT_PUBLIC_MAPTILER_BASEMAP_URL || '',
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
      const newQuery = { ...mappedQuery, ...viewport }
      void replace({ pathname, query: newQuery }, undefined, { shallow: true })
    },
    1000
  )

  const map = useRef<Map>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    map.current = new maplibregl.Map({
      container: 'map',
      style: `${mapStyle}?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY || ''}`,
      center: [viewport.longitude, viewport.latitude] as LngLatLike,
      zoom: viewport.zoom,
    })

    if (!map.current) return

    const nav = new maplibregl.NavigationControl({ showCompass: false })
    map.current.addControl(nav, 'bottom-right')

    const geolocate = new maplibregl.GeolocateControl({})
    map.current.addControl(geolocate, 'bottom-right')

    map.current.on('load', function () {
      if (!map.current) return

      map.current.on('zoomend', (e) => {
        debouncedViewportChange({
          zoom: e.target.transform._zoom,
        })
      })

      map.current.on('moveend', (e) => {
        debouncedViewportChange({
          latitude: e.target.transform._center.lat,
          longitude: e.target.transform._center.lng,
          zoom: e.target.transform._zoom,
        })
      })

      map.current.addSource('trees', {
        type: 'vector',
        tiles: [process.env.NEXT_PUBLIC_TREE_TILES_URL || ''],
        maxzoom: 14,
        minzoom: 0,
      })
      map.current.addLayer({
        id: 'trees',
        type: 'circle',
        source: 'trees',
        'source-layer': 'trees',
        maxzoom: 24,
        minzoom: 0,
        paint: {
          'circle-color': [
            'interpolate',
            ['linear'],
            /*
            Note that the following color scale is simply for demonstration purposes.
            In reality we will want to interpolate the color based on the Saugspannung value that will be available in the vector tile.
            At that point, the pflanzjahr has to be replaced with the new field's name and the domain chsnged from years to the values domain.
            */
            ['get', 'pflanzjahr'],
            0, //0,
            '#FFA600',
            1960, //0.125,
            '#FF7C43',
            1970, //0.25,
            '#F95D6A',
            1980, //0.375,
            '#D45087',
            1990, //0.5,
            '#A05195',
            2000, //0.625,
            '#665191',
            2010, //0.75,
            '#2F4B7C',
            2020, //0.875,
            '#003F5C',
          ],
          'circle-radius': [
            'interpolate',
            ['exponential', 0.5],
            ['zoom'],
            15,
            4,
            18,
            8,
            22,
            24,
          ],
        },
      })
    })

    map.current.on('click', 'trees', function (e) {
      if (!e.features) return

      const features = e.features

      onSelect(features[0].properties?.baumid)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      id="map"
      className="w-full h-full bg-[#F8F4F0]"
      aria-label="Kartenansicht der Bäume"
    ></div>
  )
}
