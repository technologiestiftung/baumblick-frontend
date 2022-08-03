import { LayerSpecification, SourceSpecification } from 'maplibre-gl'
import colors from '../../style/colors'

/** ID with which we can reference trees layer */
export const TREES_LAYER_ID = 'trees'

/** Name of the source in the vector tileset */
export const TREES_SOURCE_ID = 'outfull'

/** Name of the source layer in the vector tileset */
export const TREES_SOURCE_LAYER_ID = 'outfull'

const NOWCAST_AVERAGE_PROPERTY = 'nowcast_values_4'

export const TREES_SOURCE: SourceSpecification = {
  type: 'vector',
  tiles: [process.env.NEXT_PUBLIC_TREE_TILES_URL as string],
  maxzoom: 14,
  minzoom: 0,
  promoteId: 'trees_gml_id',
}

const CIRCLE_STROKE_WIDTH = {
  default: 1,
  hovered: 5,
}

export const TREES_LAYER: LayerSpecification = {
  id: TREES_LAYER_ID,
  type: 'circle',
  source: TREES_SOURCE_ID,
  'source-layer': TREES_SOURCE_LAYER_ID,
  maxzoom: 24,
  minzoom: 0,
  paint: {
    'circle-color': [
      'case',
      ['has', NOWCAST_AVERAGE_PROPERTY],
      [
        'interpolate',
        ['linear'],
        ['get', NOWCAST_AVERAGE_PROPERTY],
        0,
        colors.scale['1'],
        30,
        colors.scale['2'],
        60,
        colors.scale['3'],
        90,
        colors.scale['4'],
        120,
        colors.scale['5'],
        150,
        colors.scale['6'],
        180,
        colors.scale['7'],
        210,
        colors.scale['8'],
      ],
      colors.gray[200],
    ],
    'circle-stroke-width': [
      'case',
      ['boolean', ['feature-state', 'hover'], false],
      CIRCLE_STROKE_WIDTH.hovered,
      CIRCLE_STROKE_WIDTH.default,
    ],
    'circle-stroke-color': [
      'case',
      ['has', NOWCAST_AVERAGE_PROPERTY],
      [
        'interpolate',
        ['linear'],
        ['get', NOWCAST_AVERAGE_PROPERTY],
        0,
        colors.scale['1-dark'],
        30,
        colors.scale['2-dark'],
        60,
        colors.scale['3-dark'],
        90,
        colors.scale['4-dark'],
        120,
        colors.scale['5-dark'],
        150,
        colors.scale['6-dark'],
        180,
        colors.scale['7-dark'],
        210,
        colors.scale['8-dark'],
      ],
      colors.gray[300],
    ],
    'circle-radius': [
      'interpolate',
      ['exponential', 0.5],
      ['zoom'],
      15,
      4,
      18,
      14,
      19,
      16,
      20,
      28,
      21,
      32,
      22,
      40,
    ],
  },
}
