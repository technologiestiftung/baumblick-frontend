import { getLevelLabel } from '@lib/getLevelLabel'
import { WaterSupplyLevelType } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { FC } from 'react'
import colors from '../../style/colors'

export const AverageCircle: FC<{
  levelId: WaterSupplyLevelType['id'] | undefined
}> = ({ levelId }) => (
  <div
    style={{
      backgroundColor: levelId
        ? colors.scale[levelId as keyof typeof colors.scale]
        : colors.gray['300'],
      borderColor: levelId
        ? colors.scale[`${levelId}-dark` as keyof typeof colors.scale]
        : colors.gray['400'],
    }}
    className={classNames(
      'h-40 w-40 sm:h-48 sm:w-48 rounded-full',
      'border',
      'flex justify-center items-center'
    )}
    aria-label={`Durchschnitt-Stufe: ${
      levelId ? getLevelLabel(levelId) || '' : 'unbekannt'
    }`}
  >
    <span
      className={classNames(
        'bg-gray-900 text-white',
        'rounded-md',
        'px-2 py-1'
      )}
    >
      ⌀ <b className="ml-1 pr-1">{levelId ? getLevelLabel(levelId) : '-'}</b>
    </span>
  </div>
)
