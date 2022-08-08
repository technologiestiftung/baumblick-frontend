import { SuctionTensionLevel } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { FC } from 'react'
import colors from 'src/style/colors'

export const SoilLayer: FC<{
  level: SuctionTensionLevel
  depth: number
}> = ({ depth, level }) => (
  <div
    style={{ backgroundColor: colors.scale[level] }}
    className={classNames('h-20', 'pl-6', 'flex items-center')}
    aria-label={`Tiefe: ${depth} cm, Stufe: ${level}`}
  >
    <span
      className={classNames(
        'bg-gray-900 text-white',
        'rounded-md',
        'px-2 py-1'
      )}
    >
      {depth} cm <b className="ml-1 pr-1">{level}</b>
    </span>
  </div>
)
