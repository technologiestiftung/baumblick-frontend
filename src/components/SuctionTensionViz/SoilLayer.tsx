import { SuctionTensionLevel } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { FC } from 'react'
import colors from '../../style/colors'

export const SoilLayer: FC<{
  level: SuctionTensionLevel | undefined
  depth: number
}> = ({ depth, level }) => (
  <div
    style={{
      backgroundColor: level ? colors.scale[level] : colors.gray[300],
      borderColor: level ? colors.scale[`${level}-dark`] : colors.gray[400],
    }}
    className={classNames(
      'h-20',
      'pl-6',
      'border-t first-of-type:rounded-t-xl',
      'flex items-center',
      'transition-colors'
    )}
    aria-label={`Tiefe: ${depth} cm, Stufe: ${level || 'unbekannt'}`}
  >
    <span
      className={classNames(
        'bg-gray-900 text-white',
        'rounded-md',
        'px-2 py-1'
      )}
    >
      {depth} cm <b className="ml-1 pr-1">{level || '-'}</b>
    </span>
  </div>
)
