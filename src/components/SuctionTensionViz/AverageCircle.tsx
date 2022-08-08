import { SuctionTensionLevel } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { FC } from 'react'
import colors from 'src/style/colors'

export const AverageCircle: FC<{
  level: SuctionTensionLevel
}> = ({ level }) => (
  <div
    style={{
      backgroundColor: colors.scale[level],
      borderColor: colors.scale[`${level}-dark`],
    }}
    className={classNames(
      'h-40 w-40 sm:h-48 sm:w-48 rounded-full',
      'border',
      'flex justify-center items-center'
    )}
    aria-label={`Durchschnitt-Stufe: ${level}`}
  >
    <span
      className={classNames(
        'bg-gray-900 text-white',
        'rounded-md',
        'px-2 py-1'
      )}
    >
      ⌀ <b className="ml-1 pr-1">{level}</b>
    </span>
  </div>
)
