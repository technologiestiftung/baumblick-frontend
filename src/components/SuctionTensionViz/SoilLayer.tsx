import { getLevelLabel } from '@lib/getLevelLabel'
import { WaterSupplyLevelType } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { FC } from 'react'
import colors from '../../style/colors'

export const SoilLayer: FC<{
  levelId: WaterSupplyLevelType['id'] | undefined
  depth: number
}> = ({ depth, levelId }) => {
  return (
    <div
      style={{
        backgroundColor: levelId
          ? colors.scale[levelId as keyof typeof colors.scale]
          : colors.gray[300],
        borderColor: levelId
          ? colors.scale[`${levelId}-dark` as keyof typeof colors.scale]
          : colors.gray[400],
      }}
      className={classNames(
        'h-20',
        'pl-6',
        'border-t first-of-type:border-t-0',
        'flex items-center',
        'transition-colors'
      )}
      aria-label={`Tiefe: ${depth} cm, Stufe: ${
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
        {depth} cm{' '}
        <b className="ml-1 pr-1">{levelId ? getLevelLabel(levelId) : '-'}</b>
      </span>
    </div>
  )
}
