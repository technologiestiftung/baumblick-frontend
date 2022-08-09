import { RootsIllustration } from '@components/RootsIllustration'
import { SuctionTensionLevel } from '@lib/utils/mapSuctionTensionToLevel'
import classNames from 'classnames'
import { FC } from 'react'
import colors from '../../style/colors'
import { AverageCircle } from './AverageCircle'
import { SoilLayer } from './SoilLayer'

export interface SuctionTensionVizType {
  depth30Level: SuctionTensionLevel | undefined
  depth60Level: SuctionTensionLevel | undefined
  depth90Level: SuctionTensionLevel | undefined
  averageLevel: SuctionTensionLevel | undefined
}

export const SuctionTensionViz: FC<SuctionTensionVizType> = ({
  depth30Level,
  depth60Level,
  depth90Level,
  averageLevel,
}) => {
  return (
    <div className="w-full sticky z-0 top-0 overflow-hidden">
      <SoilLayer depth={30} level={depth30Level} />
      <SoilLayer depth={60} level={depth60Level} />
      <SoilLayer depth={90} level={depth90Level} />
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
        <AverageCircle level={averageLevel} />
      </div>
    </div>
  )
}
