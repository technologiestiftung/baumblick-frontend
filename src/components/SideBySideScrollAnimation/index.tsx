import { useEffect, useState, useRef, RefObject } from 'react'
import LottieProgressPlayer from '@components/LottieProgressPlayer'
import ScrollBlock from './scroll-block'
import { useWindowSize } from '@lib/hooks/useWindowSize'
import useInViewProgress from '@lib/hooks/useElementInViewProgress'
import { JSONValue } from '@lib/types/lottie'
import animationImport from '../../../public/animation/TREES.json'
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

  const offset = windowHeight ? windowHeight * 0.35 : 300
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
                progress={animationFrame}
                renderer={'svg'}
              />
            </div>
          </div>

          <div className="side-by-side__right" ref={textWrapperRef}>
            <div style={{ transform: `translateY(${scrollProgress}px)` }}>
              <h2 className="side-by-side__h2">Willkommen bei Baumblick</h2>
              <p className="side-by-side__text">
                Die App, die dir einen Ein- und Ausblick in den Zustand und die
                Wasserversorgung der Stadtbäume Berlins gibt.
              </p>
              <ScrollBlock
                windowHeight={windowHeight}
                callback={() => {
                  // noop
                }}
                offset={offset}
              />

              <h3 className="side-by-side__h3">Der Baum</h3>
              <p className="side-by-side__text">
                In Berlin gibt es insgesamt xx verschiedene Baumarten die sich
                allesamt nach Art, Alter, Größe, Kronendurchmesser und
                Stammumfang unterscheiden lassen. Die Stadt Berlin erfasst die
                Eigenschaften von über 800.000 Bäume bereits im öffentlichen
                Baumkataster
              </p>
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(129 + Math.round(p * (388 - 129)))
                }}
                offset={offset}
              />

              <h3 className="side-by-side__h3">Umgebung</h3>
              <p className="side-by-side__text">
                Trotz aller Diversität haben diese Bäume alle etwas gemeinsam:
                sie stehen klimatischen und urbanen Herausforderungen gegenüber!
                Dabei beeinflussen die vielene Umgebungsparameter die Vitalität
                eines Baumes.
              </p>
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(388 + Math.round(p * (626 - 388)))
                }}
                offset={offset}
              />

              <h3 className="side-by-side__h3">Wetter</h3>
              <p className="side-by-side__text">
                Die wohl wichtigste Rolle für einen gesunden Baum, spielen die
                Niederschlagsmengen und die Temperatur an einem Standort. Auch
                auf einer vermeintlich kleinen Fläche wie Berlin können diese
                durch städtische Infrastruktur stark varriieren.
              </p>
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(626 + Math.round(p * (907 - 626)))
                }}
                offset={offset}
              />

              <h3 className="side-by-side__h3">Schatten</h3>
              <p className="side-by-side__text">
                Besonders hohe oder stark verspiegelte Gebäude, sowie dicht
                bebaute Kieze können eine besonders hohe Verschattung bzw.
                verstärkte UV-Strahlung mit sich bringen. Diese wiederum hat
                Einfluss auf die Evatranspiration eines Baumes.
              </p>
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(907 + Math.round(p * (1123 - 907)))
                }}
                offset={offset}
              />

              <h3 className="side-by-side__h3">Bewässerung</h3>
              <p className="side-by-side__text">
                Ebenso wichtig für den Zustand eines Baumes sind die
                zusätzlichen Bewässerungen der Grünflächenämter oder
                Bürger:innen Berlins, die die Bäume besonders während der
                Vegetationspersiode (März bis September) und den heißen Sommern
                mit mehreren 100l Wasser gießen.
              </p>
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(1123 + Math.round(p * (1382 - 1123)))
                }}
                offset={offset}
              />

              <h3 className="side-by-side__h3">Sensordaten</h3>
              <p className="side-by-side__text">
                Um den Zustand eines Baumes besser zu verstehen, nutzt die Stadt
                Berlin bereits Sensoren, die die Saugspannung in der Bodengrube
                eines Baumes messen. Die Saugspannung gibt Aufschluss darüber,
                wie trocken oder feucht der Boden ist und hilft daher bei der
                Optimierung der Bewässerung. Jedoch: jeden Baum einzeln zu
                verkabeln ist nicht sinnhaft und bei weitem nicht nachhaltig.
              </p>
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(1381 + Math.round(p * (1792 - 1382)))
                }}
                offset={offset}
              />

              <h3 className="side-by-side__h3">KI Modell</h3>
              <p className="side-by-side__text">
                Und genau hier kommt unser KI-basiertes Vorhersagemodell ins
                Spiel. Mit Hilfe des Modells können wir auch die aktuelle
                Saugspannung berechnen und für 14 Tage vorhersagen – selbst wenn
                kein Sensor am Baum ist!
              </p>
              <ScrollBlock
                windowHeight={windowHeight}
                callback={(p) => {
                  setAnimationFrame(1792 + Math.round(p * (2100 - 1792)))
                }}
                offset={offset}
              />

              <p className="side-by-side__text">
                Du bist neugierig geworden? Dann erkunde jetzt unsere Karte und
                erhalte mit einen Einblick in die Bäume in deiner Umgebung!
              </p>
              <div style={{ height: '50vh' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
