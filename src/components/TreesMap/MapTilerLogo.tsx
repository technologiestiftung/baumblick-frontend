import { FC } from 'react'

export const MapTilerLogo: FC = () => {
  return (
    <div className="fixed right-20 bottom-[74px] lg:bottom-4 pointer-events-none">
      <div className="flex justify-end">
        <a href="https://www.maptiler.com" className="pointer-events-auto">
          <img
            src="https://api.maptiler.com/resources/logo.svg"
            alt="MapTiler Logo"
          />
        </a>
      </div>
    </div>
  )
}
