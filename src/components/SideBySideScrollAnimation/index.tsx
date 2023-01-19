import { useEffect, useState, useRef, RefObject } from 'react'
import LottieProgressPlayer from '@components/LottieProgressPlayer'
import ScrollBlock from './scroll-block'
import { useWindowSize } from '@lib/hooks/useWindowSize'
import useInViewProgress from '@lib/hooks/useElementInViewProgress'
import { JSONValue } from '@lib/types/lottie'
import animationImport from '../../../public/animation/TREES_newV2.json'
import useTranslation from 'next-translate/useTranslation'
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
    <div
      style={{ height: wrapperHeight }}
      ref={wrapperElement}
      id="side-by-side__container"
    >
      <div className="side-by-side__wrapper">
        <div className="side-by-side__dot-navigation__container">
          <ul className="side-by-side__dot-navigation__dot-list">
            {keyframes.map((_, index: number) => {
              return (
                <li key={`dot-${index}`}>
                  <button
                    className={`side-by-side__dot-navigation__dot ${
                      index === activeScene ? 'active' : ''
                    }`}
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

        <div className="side-by-side__inner">
          <div className="side-by-side__left">
            <div className="side-by-side__lottie">
              <LottieProgressPlayer
                animationData={animationData}
                progress={animationFrame}
                renderer={'svg'}
              />
            </div>
          </div>

          <div className="side-by-side__right" ref={textWrapperRef}>
            <div
              style={{
                transform: `translateY(${scrollProgress}px)`,
                // position: 'relative',
              }}
            >
              {keyframes.slice(0, keyframes.length).map((_, stepIndex) => {
                return (
                  <div key={`step-$`} style={{ position: 'relative' }}>
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
                        className="side-by-side__jump-link"
                      />

                      <h2 className="side-by-side__h2 text__h2--home">
                        {t(`home.animation.steps.${stepIndex + 1}.title`)}
                      </h2>
                    </div>
                    <p className="side-by-side__text text__copy--home">
                      {t(`home.animation.steps.${stepIndex + 1}.text`)}
                    </p>
                  </div>
                )
              })}
              <div style={{ height: '50vh' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
