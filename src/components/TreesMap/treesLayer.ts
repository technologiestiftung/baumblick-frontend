import { LayerSpecification, SourceSpecification } from 'maplibre-gl'
import colors from '../../style/colors'

/** ID with which we can reference trees layer */
export const TREES_LAYER_ID = 'trees'

/** ID with which we can reference trees layer */
export const TREES_NUMBERS_LAYER_ID = 'trees_numbers'

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

export const TREES_NUMBERS: LayerSpecification = {
  id: TREES_NUMBERS_LAYER_ID,
  type: 'symbol',
  source: TREES_SOURCE_ID,
  'source-layer': TREES_SOURCE_LAYER_ID,
  filter: ['has', NOWCAST_AVERAGE_PROPERTY],
  layout: {
    'text-field': [
      'case',
      ['has', NOWCAST_AVERAGE_PROPERTY],
      [
        'step',
        ['get', NOWCAST_AVERAGE_PROPERTY],
        `1`,
        50,
        `2`,
        100,
        `3`,
        150,
        `4`,
        200,
        `5`,
      ],
      '',
    ],
    'text-size': 12,
  },
  paint: {
    'text-opacity': 0.5,
  },
  minzoom: 17,
}

export const TREES_LAYER: LayerSpecification = {
  id: TREES_LAYER_ID,
  type: 'circle',
  source: TREES_SOURCE_ID,
  'source-layer': TREES_SOURCE_LAYER_ID,
  maxzoom: 24,
  minzoom: 0,
  layout: {
    'circle-sort-key': ['get', NOWCAST_AVERAGE_PROPERTY],
  },
  paint: {
    'circle-color': [
      'case',
      ['has', NOWCAST_AVERAGE_PROPERTY],
      [
        'step',
        ['get', NOWCAST_AVERAGE_PROPERTY],
        colors.scale[`1`],
        50,
        colors.scale[`2`],
        100,
        colors.scale[`3`],
        150,
        colors.scale[`4`],
        200,
        colors.scale[`5`],
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
        'step',
        ['get', NOWCAST_AVERAGE_PROPERTY],
        colors.scale[`1-dark`],
        50,
        colors.scale[`2-dark`],
        100,
        colors.scale[`3-dark`],
        150,
        colors.scale[`4-dark`],
        200,
        colors.scale[`5-dark`],
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
