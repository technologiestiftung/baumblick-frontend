import { SaugspannungLevel } from '@lib/utils/mapNowcastToScale'
import classNames from 'classnames'
import { FC } from 'react'
import colors from 'src/style/colors'

export interface SoilLayersVizType {
  depth30Level: SaugspannungLevel
  depth60Level: SaugspannungLevel
  depth90Level: SaugspannungLevel
  averageLevel: SaugspannungLevel
}

const SoilLayer: FC<{ nowcastLevel: SaugspannungLevel; depth: number }> = ({
  depth,
  nowcastLevel,
}) => (
  <div
    style={{ backgroundColor: colors.scale[nowcastLevel] }}
    className={classNames('h-20', 'pl-6', 'flex items-center')}
    aria-label={`Tiefe: ${depth} cm, Stufe: ${nowcastLevel}`}
  >
    <span
      className={classNames(
        'bg-gray-900 text-white',
        'rounded-md',
        'px-2 py-1'
      )}
    >
      {depth} cm <b className="ml-1 pr-1">{nowcastLevel}</b>
    </span>
  </div>
)

export const SoilLayersViz: FC<SoilLayersVizType> = ({
  depth30Level,
  depth60Level,
  depth90Level,
}) => {
  return (
    <div className="w-full">
      <SoilLayer depth={30} nowcastLevel={depth30Level} />
      <SoilLayer depth={60} nowcastLevel={depth60Level} />
      <SoilLayer depth={90} nowcastLevel={depth90Level} />
    </div>
  )
}
