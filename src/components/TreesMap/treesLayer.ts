import { WATER_SUPPLY_STATUSES } from '@lib/utils/mapSuctionTensionToStatus'
import { LayerSpecification, SourceSpecification } from 'maplibre-gl'
import colors from '../../style/colors'

/** ID with which we can reference trees layer */
export const TREES_LAYER_ID = 'trees'
export const TREES_ID_KEY = 'trees_id'

/** ID with which we can reference trees layer */
export const TREES_NUMBERS_LAYER_ID = 'trees_numbers'

/** Name of the source in the vector tileset */
export const TREES_SOURCE_ID = 'outfull'

/** Name of the source layer in the vector tileset */
export const TREES_SOURCE_LAYER_ID = 'outfull'

const NOWCAST_AVERAGE_PROPERTY = 'nowcast_values_stamm'

export const TREES_SOURCE: SourceSpecification = {
  type: 'vector',
  tiles: [process.env.NEXT_PUBLIC_TREE_TILES_URL as string],
  maxzoom: 14,
  minzoom: 0,
  promoteId: TREES_ID_KEY,
}

const CIRCLE_STROKE_WIDTH = {
  default: 1,
  highlighted: 5,
}

/**
 * Constructs a flat array where color values and numbers alternate. Finishes with a color value for every value above the last number. This array is used as the stepper for the layer color scales.
 * @param idSuffix string
 * @returns (string | number)[]
 */
const getColorScale = (idSuffix = ''): (string | number)[] => {
  return WATER_SUPPLY_STATUSES.flatMap<string | number>((statusItem) => {
    return [
      colors.scale[`${statusItem.id}${idSuffix}` as keyof typeof colors.scale],
      statusItem.suctionTensionRange[1],
    ]
  }).slice(0, -1) // Removes the last number value because it not needed anymore
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
      ['step', ['get', NOWCAST_AVERAGE_PROPERTY], ...getColorScale()],
      colors.gray[200],
    ],
    'circle-stroke-width': [
      'case',
      [
        'boolean',
        ['feature-state', 'selected'],
        ['feature-state', 'hover'],
        false,
      ],
      CIRCLE_STROKE_WIDTH.highlighted,
      CIRCLE_STROKE_WIDTH.default,
    ],
    'circle-stroke-color': [
      'case',
      ['has', NOWCAST_AVERAGE_PROPERTY],
      ['step', ['get', NOWCAST_AVERAGE_PROPERTY], ...getColorScale('-dark')],
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
