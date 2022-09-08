import React, { FC, Fragment, HTMLProps, ReactNode } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames'

export interface ModalType extends HTMLProps<HTMLDivElement> {
  title: string
  description: string | ReactNode
  isOpen?: boolean
  onClose?: () => void
  header?: ReactNode
  footer?: ReactNode
}

export const Modal: FC<ModalType> = ({
  title,
  description,
  isOpen = true,
  onClose = () => undefined,
  header,
  footer,
  children,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={onClose}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="min-h-screen px-4 flex justify-center items-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Backdrop className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={classNames(
                'w-full max-w-md',
                'pb-6',
                'rounded-md shadow-2xl',
                'bg-white',
                'overflow-hidden'
              )}
            >
              {header && (
                <Dialog.Panel as="header" className="overflow-hidden">
                  {header}
                </Dialog.Panel>
              )}
              <Dialog.Title
                className={classNames('px-6 pt-4 font-semibold text-2xl')}
              >
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="px-6 pt-3 font-serif">
                  {description}
                </Dialog.Description>
              )}
              {children && (
                <Dialog.Panel className="px-6 pt-3">{children}</Dialog.Panel>
              )}

              {footer && (
                <Dialog.Panel
                  as="footer"
                  className="flex justify-between pt-6 px-6"
                >
                  {footer}
                </Dialog.Panel>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
