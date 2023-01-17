import { getStatusLabel } from '@lib/utils/getStatusLabel'
import { WaterSupplyStatusType } from '@lib/utils/mapSuctionTensionToStatus'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'
import colors from '../../style/colors'

export const SoilLayer: FC<{
  statusId: WaterSupplyStatusType['id'] | undefined
  depth: number
}> = ({ depth, statusId }) => {
  const { t } = useTranslation('common')
  return (
    <div
      style={{
        backgroundColor: statusId
          ? colors.scale[statusId as keyof typeof colors.scale]
          : colors.gray[300],
        borderColor: statusId
          ? colors.scale[`${statusId}-dark` as keyof typeof colors.scale]
          : colors.gray[400],
      }}
      className={classNames(
        'h-20',
        'pl-6',
        'border-t first-of-type:border-t-0',
        'flex items-center',
        'transition-colors'
      )}
      aria-label={t(`treeView.soilViz.depthAriaLabel`, {
        depth,
        waterSupply: statusId
          ? getStatusLabel(statusId) || ''
          : t<string>(`legend.map.levels.unknown`),
      })}
    >
      <span
        className={classNames(
          'bg-gray-900 text-white',
          'rounded-md',
          'px-2 py-1'
        )}
      >
        {t(`treeView.soilViz.depthLabel`, { depth })}
        <b className="ml-1 pr-1">{statusId ? getStatusLabel(statusId) : '–'}</b>
      </span>
    </div>
  )
}
