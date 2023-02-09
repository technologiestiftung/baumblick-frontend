import { Transition } from '@headlessui/react'
import classNames from 'classnames'
import { FC } from 'react'

export const ModalHeader: FC<{
  showImg: boolean
  imageUrl?: string | null
}> = ({ showImg, imageUrl }) => (
  <div
    className={classNames(
      'bg-gray-100 w-full h-[120px] rounded-t overflow-hidden',
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
        className="w-full h-[120px] bg-cover bg-center"
        style={{ backgroundImage: `url("${imageUrl || ''}")` }}
      />
    </Transition>
  </div>
)
