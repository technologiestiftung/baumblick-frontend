import { useEffect, useState, useRef, RefObject } from 'react'
import classNames from 'classnames'
import LottieProgressPlayer from '@components/LottieProgressPlayer'
import ScrollBlock from './scroll-block'
import { useWindowSize } from '@lib/hooks/useWindowSize'
import useInViewProgress from '@lib/hooks/useElementInViewProgress'
import { JSONValue } from '@lib/types/lottie'
import animationImport from '../../../public/animation/TREES_newV2.json'
import useTranslation from 'next-translate/useTranslation'
import { Button } from '@components/Button'
const animationData = animationImport as JSONValue

export const SideBySideScrollAnimation = (): JSX.Element => {
  const { t } = useTranslation('common')
  const { height: windowHeight } = useWindowSize()

  const wrapperElement = useRef<HTMLDivElement>(null)

  const textWrapperRef: RefObject<HTMLDivElement> = useRef(null)
  const stepRefs: Array<RefObject<HTMLHeadingElement>> = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]
  const [textHeight, setTextHeight] = useState(0)
  const [wrapperHeight, setWrapperHeight] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [animationFrame, setAnimationFrame] = useState(0)
  const [activeScene, setActiveScene] = useState(0)
  const keyframes = [129, 388, 626, 907, 1123, 1382, 1792, 2100]

  useInViewProgress({
    windowHeight,
    trackedElementRef: wrapperElement,
    scrollEventElementId: 'main',
    effect: (p) => {
      if (textWrapperRef.current) {
        setScrollProgress(
          Math.max(
            Math.min(Math.round(p.currPos.y), 0),
            -textHeight + textWrapperRef.current.clientHeight
          )
        )
      }
    },
    deps: [wrapperElement.current, windowHeight],
    offset: 0,
  })

  useEffect(() => {
    if (textWrapperRef.current && windowHeight) {
      const textScrollHeight = textWrapperRef.current.scrollHeight

      setTextHeight(textScrollHeight)
      setWrapperHeight(
        textScrollHeight - textWrapperRef.current.clientHeight + windowHeight
      )
    }
  }, [textWrapperRef, windowHeight])

  // Per design, the in-view-trigger should be 62.5vh from the top. Our offset
  // is calculated in pixels from the bottom, so it's 0.375 * windowHeight.
  // With no windowHeight given, use a default of 300px.
  const offset = windowHeight ? windowHeight * 0.375 : 300

  return (
    <div style={{ height: wrapperHeight }} ref={wrapperElement} id="story">
      <div className="box-border w-full sticky top-0 p-4 !pt-16 h-[100vh] screen600:p-8">
        <div className="h-full absolute top-0 right-5 flex flex-col justify-center z-50">
          <ul className="m-0 list-none">
            {keyframes.map((_, index: number) => {
              return (
                <li key={`dot-${index}`}>
                  <button
                    className={classNames(
                      'w-2.5 h-2.5 rounded-full border-[1.5px] border-solid bg-white mb-1.5 cursor-pointer border-gray-900',
                      'screen1200:w-4 screen1200:h-4 screen1200:mb-2',
                      `${index === activeScene ? 'bg-gray-900' : ''}`
                    )}
                    onClick={() => {
                      stepRefs[index].current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center',
                      })
                      setActiveScene(index)
                      setAnimationFrame(keyframes[index])
                    }}
                  />
                </li>
              )
            })}
          </ul>
        </div>

        <div
          className={classNames(
            'w-full h-full grid overflow-hidden grid-rows-2',
            'screen1200:grid-rows-1 screen1200:grid-cols-[5fr_7fr] screen1200:gap-8'
          )}
        >
          <div>
            <div
              className={classNames(
                'm-auto flex justify-center items-center w-full h-full max-h-[50vh]',
                'screen1200:max-h-screen'
              )}
            >
              <LottieProgressPlayer
                animationData={animationData}
                progress={animationFrame}
                renderer={'svg'}
              />
            </div>
          </div>

          <div
            className="overflow-hidden screen1200:row-start-1 screen1200:row-end-2"
            ref={textWrapperRef}
          >
            <div
              style={{
                transform: `translateY(${scrollProgress}px)`,
                // position: 'relative',
              }}
            >
              {keyframes.slice(0, keyframes.length).map((_, stepIndex) => {
                return (
                  <div
                    key={`step-${stepIndex}`}
                    style={{ position: 'relative' }}
                  >
                    {stepIndex !== 0 && (
                      <ScrollBlock
                        windowHeight={windowHeight}
                        callback={(p) => {
                          setAnimationFrame(
                            keyframes[stepIndex - 1] +
                              Math.round(
                                p *
                                  (keyframes[stepIndex] -
                                    keyframes[stepIndex - 1])
                              )
                          )
                          if (p > 0.95 && activeScene !== stepIndex) {
                            setActiveScene(stepIndex)
                          }
                        }}
                        offset={offset}
                      />
                    )}
                    <div style={{ position: 'relative' }}>
                      <div
                        id={`jump-link-${stepIndex}`}
                        ref={stepRefs[stepIndex]}
                        className="absolute -top-10"
                      />

                      <h2
                        className={classNames(
                          'mb-2 font-sans text-2xl font-normal tracking-normal text-left',
                          'screen1200:mb-4 screen1920:mb-6'
                        )}
                      >
                        {t(`home.animation.steps.${stepIndex + 1}.title`)}
                      </h2>
                    </div>
                    <p className="font-serif text-base font-normal tracking-normal text-left pr-5">
                      {t(`home.animation.steps.${stepIndex + 1}.text`)}
                    </p>
                  </div>
                )
              })}
              <Button
                primary
                href="/trees"
                className="w-11/12 sm:w-1/3 md:w-1/2 xl:w-11/12 mt-8"
              >
                {t('home.cta.enterMap')}
              </Button>
              <div style={{ height: '50vh' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
