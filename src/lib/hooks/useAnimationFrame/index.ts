import { useEffect, useRef } from 'react'

export const useAnimationFrame = (callback: (time: number) => void): void => {
  const requestRef = useRef(0)
  const previousTimeRef = useRef(0)

  const animate = (time: number): void => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
