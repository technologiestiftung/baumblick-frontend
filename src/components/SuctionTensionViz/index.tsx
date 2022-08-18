import { RootsIllustration } from '@components/RootsIllustration'
import { WaterSupplyLevelType } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { FC } from 'react'
import colors from '../../style/colors'
import { AverageCircle } from './AverageCircle'
import { SoilLayer } from './SoilLayer'

export interface SuctionTensionVizType {
  depth30LevelId: WaterSupplyLevelType['id'] | undefined
  depth60LevelId: WaterSupplyLevelType['id'] | undefined
  depth90LevelId: WaterSupplyLevelType['id'] | undefined
  averageLevelId: WaterSupplyLevelType['id'] | undefined
}

export const SuctionTensionViz: FC<SuctionTensionVizType> = ({
  depth30LevelId,
  depth60LevelId,
  depth90LevelId,
  averageLevelId,
}) => {
  return (
    <div className="relative overflow-hidden">
      <SoilLayer depth={30} levelId={depth30LevelId} />
      <SoilLayer depth={60} levelId={depth60LevelId} />
      <SoilLayer depth={90} levelId={depth90LevelId} />
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
        <AverageCircle levelId={averageLevelId} />
      </div>
    </div>
  )
}
