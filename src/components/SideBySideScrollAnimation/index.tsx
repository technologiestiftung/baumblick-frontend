import classNames from 'classnames'
import { FC } from 'react'
import LottieProgressPlayer from '@components/LottieProgressPlayer'
import { useWindowSize } from '@lib/hooks/useWindowSize'
import { JSONValue } from '@lib/types/lottie'
import animationImport from '../../../public/animation/ball-animation.json'
const animationData = animationImport as JSONValue

export const SideBySideScrollAnimation: FC<{ className?: string }> = ({
  className = '',
}) => {
  const { width, height } = useWindowSize()
  return (
    <div className={classNames(className, 'side-by-side__wrapper')}>
      <div className="side-by-side__inner">
        <div className="side-by-side__left">
          <div className="side-by-side__lottie">
            <LottieProgressPlayer
              animationData={animationData}
              minFrame={0}
              maxFrame={81}
              progress={4}
              renderer={'svg'}
            />
          </div>
        </div>
        <div className="side-by-side__right">
          Hello World {width}, {height}
        </div>
      </div>
    </div>
  )
}
