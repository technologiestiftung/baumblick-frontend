import { Transition } from '@headlessui/react'
import { useImageLoadsSuccessfully } from '@lib/hooks/useLoadImage'
import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface ImageCardType {
  title: string
  description: string
  imageUrl: string
  className?: string
  children: ReactNode
}

export const ImageCard: FC<ImageCardType> = ({
  title,
  description,
  imageUrl,
  className = '',
  children,
}) => {
  const imageIsLoadable = useImageLoadsSuccessfully(imageUrl)
  const showImg = imageUrl && imageIsLoadable

  return (
    <div
      className={classNames(
        className,
        'grid p-6 gap-x-6 gap-y-2 border-b border-gray-200',
        'bg-white',
        'pr-0 grid-cols-[8fr,5fr]'
      )}
    >
      <div>
        <h2 className="font-semibold text-2xl">{title}</h2>
        <p className="font-serif mt-2">{description}</p>
        <div className="mt-6">{children}</div>
      </div>
      <div
        className={classNames(
          'w-full bg-gray-200 rounded-l-md relative h-48',
          !showImg && imageUrl && 'animate-pulse'
        )}
      >
        <Transition
          show={!!showImg}
          enter="transition-opacity duration-500"
          enterFrom="opacity-0  delay-1000"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="absolute z-0 inset-0 rounded-l-md bg-cover bg-center"
            style={{ backgroundImage: `url("${imageUrl || ''}")` }}
          />
        </Transition>
      </div>
    </div>
  )
}
