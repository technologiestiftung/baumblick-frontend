import { useEffect, useState } from 'react'

export const useImageLoadsSuccessfully = (
  imgUrl: string | undefined | null
): boolean | null => {
  const [loadsSuccessfully, setLoadsSuccessfully] = useState<boolean | null>(
    null
  )

  useEffect(() => {
    if (!imgUrl) return

    const img = new Image()
    img.onload = () => setLoadsSuccessfully(true)
    img.onerror = () => setLoadsSuccessfully(false)
    img.src = imgUrl

    return () => {
      img.onload = () => undefined
      img.onerror = () => undefined
      img.src = ''
    }
  }, [imgUrl])

  return loadsSuccessfully
}
