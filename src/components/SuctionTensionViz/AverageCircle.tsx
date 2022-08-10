import { SuctionTensionLevel } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { FC } from 'react'
import colors from '../../style/colors'

export const AverageCircle: FC<{
  level: SuctionTensionLevel | undefined
}> = ({ level }) => (
  <div
    style={{
      backgroundColor: level ? colors.scale[level] : colors.gray['300'],
      borderColor: level ? colors.scale[`${level}-dark`] : colors.gray['400'],
    }}
    className={classNames(
      'h-40 w-40 sm:h-48 sm:w-48 rounded-full',
      'border',
      'flex justify-center items-center'
    )}
    aria-label={`Durchschnitt-Stufe: ${level || 'unbekannt'}`}
  >
    <span
      className={classNames(
        'bg-gray-900 text-white',
        'rounded-md',
        'px-2 py-1'
      )}
    >
      ⌀ <b className="ml-1 pr-1">{level || '-'}</b>
    </span>
  </div>
)
