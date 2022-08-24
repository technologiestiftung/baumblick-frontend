import { getStatusLabel } from '@lib/utils/getStatusLabel'
import { WaterSupplyStatusType } from '@lib/utils/mapSuctionTensionToStatus'
import classNames from 'classnames'
import { FC } from 'react'
import colors from '../../style/colors'

export const AverageCircle: FC<{
  statusId: WaterSupplyStatusType['id'] | undefined
}> = ({ statusId }) => (
  <div
    style={{
      backgroundColor: statusId
        ? colors.scale[statusId as keyof typeof colors.scale]
        : colors.gray['300'],
      borderColor: statusId
        ? colors.scale[`${statusId}-dark` as keyof typeof colors.scale]
        : colors.gray['400'],
    }}
    className={classNames(
      'h-40 w-40 sm:h-48 sm:w-48 rounded-full',
      'border',
      'flex justify-center items-center'
    )}
    aria-label={`Durschnittliche Wasserversorgung: ${
      statusId ? getStatusLabel(statusId) || '' : 'unbekannt'
    }`}
  >
    <span
      className={classNames(
        'bg-gray-900 text-white',
        'rounded-md',
        'px-2 py-1'
      )}
    >
      ⌀ <b className="ml-1 pr-1">{statusId ? getStatusLabel(statusId) : '-'}</b>
    </span>
  </div>
)
