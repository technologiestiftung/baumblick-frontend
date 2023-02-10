import { FC, useEffect, useState, useMemo, useCallback, memo } from 'react'
import lottie from 'lottie-web'
import { JSONValue } from '@lib/types/lottie'
interface LottieProgressPlayerProps {
  animationData: JSONValue
  progress: number
  renderer?: 'canvas' | 'svg'
  preserveAspectRatio?: 'xMidYMid slice' | 'xMidYMid meet'
}

const LottieProgressPlayer: FC<LottieProgressPlayerProps> = ({
  animationData,
  progress,
  renderer = 'svg',
  preserveAspectRatio = 'xMidYMid meet',
}: LottieProgressPlayerProps) => {
  const [lottieContainerElement, setLottieContainerElement] =
    useState<HTMLDivElement | null>()

  const animation = useMemo(() => {
    if (!animationData || !lottieContainerElement) {
      return null
    } else {
      // append svg only once
      if (lottieContainerElement.children.length === 0) {
        const anim = lottie.loadAnimation({
          container: lottieContainerElement,
          animationData,
          renderer,
          loop: true,
          autoplay: false,
          rendererSettings: {
            preserveAspectRatio, // Supports the same options as the svg element's preserveAspectRatio property
          },
        })
        anim.goToAndStop(129)
        return anim
      }
    }
  }, [animationData, lottieContainerElement, preserveAspectRatio, renderer])

  const handleLottieRef = useCallback(
    (element: HTMLDivElement) => {
      if (element) {
        setLottieContainerElement(element)
      }
    },
    [setLottieContainerElement]
  )

  const goToFrame = useCallback(
    (frame: number) => {
      if (!animation) {
        return
      }

      if (animation) {
        animation.goToAndStop(frame, true)
      }
    },
    [animation]
  )

  useEffect(() => {
    goToFrame(progress)
  }, [goToFrame, progress])

  return <div className="h-full" ref={handleLottieRef} />
}

export default memo(LottieProgressPlayer)
