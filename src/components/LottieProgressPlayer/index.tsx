import { FC, useEffect, useState, useMemo, useCallback, memo } from 'react'
import lottie from 'lottie-web'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import { JSONValue } from '@lib/types/lottie'

interface LottieProgressPlayerProps {
  animationData: JSONValue
  progress: number
  minFrame: number
  maxFrame: number
  renderer?: 'canvas' | 'svg'
  preserveAspectRatio?: 'xMidYMid slice' | 'xMidYMid meet'
}

const LottieProgressPlayer: FC<LottieProgressPlayerProps> = ({
  progress,
  minFrame,
  maxFrame,
  renderer = 'svg',
  preserveAspectRatio = 'xMidYMid slice',
}: LottieProgressPlayerProps) => {
  const { t } = useTranslation('common')

  const [lottieData, setLottieData] = useState<JSONValue>()
  const [once, setOnce] = useState(false)

  // lazy-load lottie json file
  useEffect(() => {
    // dynamic import of lottie json file
    import('public/animation/ball-animation.json')
      .then((animationData) => {
        if (!once) {
          setLottieData(animationData.default as JSONValue)
        }
        setOnce(true)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [once])

  const animation = useMemo(() => {
    if (!lottieData) {
      return null
    }
    const anim = lottie.loadAnimation({
      container: document.querySelector('#react-logo') as HTMLElement,
      animationData: lottieData,
      renderer,
      loop: true,
      autoplay: false,
      rendererSettings: {
        preserveAspectRatio, // Supports the same options as the svg element's preserveAspectRatio property
      },
    })
    anim.goToAndStop(0, true)

    return anim
  }, [lottieData, preserveAspectRatio, renderer])

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
  }, [goToFrame, progress, minFrame, maxFrame])

  const formattingComponents = {
    bold: <strong />,
    italic: <em />,
  }

  return (
    <div>
      <div>
        <Trans
          i18nKey="common:home.slides.1.text"
          components={formattingComponents}
        />
      </div>
      <div>{t('home.slides.2.alt')}</div>
      <div id="react-logo" />
    </div>
  )
}

export default memo(LottieProgressPlayer)
