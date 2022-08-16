import classNames from 'classnames'
import { FC } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

export const Carousel: FC<{ wrapperClass?: string }> = ({
  wrapperClass,
  children,
}) => {
  return (
    <Slider
      arrows={false}
      infinite={false}
      dots
      customPaging={(i) => (
        <button
          aria-label={`Slide ${i + 1}`}
          className={classNames(
            'group',
            'w-full h-1 py-3',
            'transition-colors focus:outline-none focus:!ring-0',
            'flex place-content-center place-items-center'
          )}
        >
          <span
            className={classNames(
              'w-full h-1',
              'rounded-full bg-gray-300',
              'group-focus:ring-offset-2 group-focus:ring-offset-white group-focus:ring-2 group-focus:ring-gray-900'
            )}
          ></span>
        </button>
      )}
      className={classNames(wrapperClass, 'bg-white')}
    >
      {children}
    </Slider>
  )
}
