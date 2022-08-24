import { RootsIllustration } from '@components/RootsIllustration'
import { WaterSupplyStatusType } from '@lib/utils/mapSuctionTensionToStatus'
import classNames from 'classnames'
import { FC } from 'react'
import colors from '../../style/colors'
import { AverageCircle } from './AverageCircle'
import { SoilLayer } from './SoilLayer'

export interface GroundLayersVizType {
  depth30StatusId: WaterSupplyStatusType['id'] | undefined
  depth60StatusId: WaterSupplyStatusType['id'] | undefined
  depth90StatusId: WaterSupplyStatusType['id'] | undefined
  averageStatusId: WaterSupplyStatusType['id'] | undefined
}

export const GroundLayersViz: FC<GroundLayersVizType> = ({
  depth30StatusId,
  depth60StatusId,
  depth90StatusId,
  averageStatusId,
}) => {
  return (
    <div className="relative overflow-hidden">
      <ul>
        <SoilLayer depth={30} statusId={depth30StatusId} />
        <SoilLayer depth={60} statusId={depth60StatusId} />
        <SoilLayer depth={90} statusId={depth90StatusId} />
      </ul>
      <div
        className={classNames(
          'absolute top-0',
          'w-full h-full',
          'flex justify-center'
        )}
      >
        <RootsIllustration
          color={colors.gray[200]}
          additionalClasses={classNames(
            'flex-shrink-0',
            'w-auto h-5/6',
            'mix-blend-multiply'
          )}
        />
      </div>
      <div
        className={classNames(
          'absolute top-0 right-0',
          'w-2/3 md:w-1/2 h-full',
          'flex justify-center items-center'
        )}
      >
        <AverageCircle statusId={averageStatusId} />
      </div>
    </div>
  )
}
