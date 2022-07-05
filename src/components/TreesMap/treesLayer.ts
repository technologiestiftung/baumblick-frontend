import { LayerSpecification, SourceSpecification } from 'maplibre-gl'

export const TREES_LAYER_ID = 'trees'

export const TREES_SOURCE: SourceSpecification = {
  type: 'vector',
  tiles: [process.env.NEXT_PUBLIC_TREE_TILES_URL as string],
  maxzoom: 14,
  minzoom: 0,
}

export const TREES_LAYER: LayerSpecification = {
  id: TREES_LAYER_ID,
  type: 'circle',
  source: TREES_LAYER_ID,
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
      At that point, the pflanzjahr has to be replaced with the new field's name and the domain changed from years to the values domain.
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
}
