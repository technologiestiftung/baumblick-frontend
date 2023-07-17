import { Pill } from '@components/Pill'
import { getClassesByStatusId } from '@lib/utils/getClassesByStatusId'
import { WATER_SUPPLY_STATUSES } from '@lib/utils/mapSuctionTensionToStatus'
import classNames from 'classnames'
import { FC } from 'react'

export const ScalePills: FC<{ pillClassNames?: string }> = ({
  pillClassNames = '',
  ...rest
}) => (
  <span className={classNames('inline-flex gap-x-0.5')} {...rest}>
    {WATER_SUPPLY_STATUSES.map((status) => {
      return (
        <Pill
          key={status.id}
          className={classNames(
            'border translate-y-0.5',
            getClassesByStatusId(status.id).bg,
            getClassesByStatusId(status.id).border,
            pillClassNames
          )}
        />
      )
    })}
  </span>
)
