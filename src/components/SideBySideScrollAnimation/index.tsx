import { useEffect, useState, useRef, RefObject } from 'react'
import LottieProgressPlayer from '@components/LottieProgressPlayer'
import ScrollBlock from './scroll-block'
import { useWindowSize } from '@lib/hooks/useWindowSize'
import useInViewProgress from '@lib/hooks/useElementInViewProgress'
import { JSONValue } from '@lib/types/lottie'
import animationImport from '../../../public/animation/ball-animation.json'
const animationData = animationImport as JSONValue

export const SideBySideScrollAnimation = (): JSX.Element => {
  const { height: windowHeight } = useWindowSize()

  const wrapperElement = useRef<HTMLDivElement>(null)

  const textWrapperRef: RefObject<HTMLDivElement> = useRef(null)
  const [textHeight, setTextHeight] = useState(0)
  const [wrapperHeight, setWrapperHeight] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [animationFrame, setAnimationFrame] = useState(0)

  useInViewProgress({
    windowHeight,
    trackedElementRef: wrapperElement,
    scrollEventElementId: '#main',
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

  return (
    <div
      style={{ height: wrapperHeight }}
      ref={wrapperElement}
      id="side-by-side__container"
    >
      <div className="side-by-side__wrapper">
        <div className="side-by-side__inner">
          <div className="side-by-side__left">
            <div className="side-by-side__lottie">
              <LottieProgressPlayer
                animationData={animationData}
                minFrame={0}
                maxFrame={81}
                progress={animationFrame}
                renderer={'svg'}
              />
            </div>
          </div>

          <div className="side-by-side__right" ref={textWrapperRef}>
            <div style={{ height: '50vh' }} />
            <div style={{ transform: `translateY(${scrollProgress}px)` }}>
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(Math.round(p * 20))
                }}
                offset={120}
              />
              <div style={{ height: '25vh' }} />
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(20 + Math.round(p * 20))
                }}
                offset={120}
              />
              <div style={{ height: '25vh' }} />
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(40 + Math.round(p * 20))
                }}
                offset={120}
              />
              <div style={{ height: '25vh' }} />
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(60 + Math.round(p * 20))
                }}
                offset={120}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
