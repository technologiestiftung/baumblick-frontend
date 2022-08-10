import { FC } from 'react'

export const MapTilerLogo: FC = () => {
  return (
    <div className="fixed left-0 bottom-16 w-full pointer-events-none">
      <div className="max-w-3xl w-full flex justify-end mx-auto">
        <a
          href="https://www.maptiler.com"
          className="pointer-events-auto mb-2 mr-20"
        >
          <img
            src="https://api.maptiler.com/resources/logo.svg"
            alt="MapTiler Logo"
          />
        </a>
      </div>
    </div>
  )
}
