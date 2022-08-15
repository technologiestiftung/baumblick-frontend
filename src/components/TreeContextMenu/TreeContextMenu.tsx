import { CopyTextField } from '@components/CopyTextField'
import { DotsVertical } from '@components/Icons'
import { Popover, Transition } from '@headlessui/react'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { FC } from 'react'

export const TreeContextMenu: FC = () => {
  const { t } = useTranslation('common')
  const { asPath } = useRouter()
  const sharableURL = `${
    typeof window !== 'undefined' ? window.location.origin : ''
  }${asPath}`

  return (
    <Popover className="relative">
      <Popover.Button
        className={classNames(
          'w-8 h-8 flex place-content-center',
          'place-items-center text-gray-500 hover:text-hover-900'
        )}
      >
        <DotsVertical />
      </Popover.Button>

      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel
          className={classNames(
            'absolute z-10 right-0 pt-4 pb-1 px-6 bg-white w-[calc(100vw-4rem)]',
            'shadow-lg border border-gray-300 rounded-md'
          )}
        >
          <h3 className="text-lg font-bold">{t('share.treeShareTitle')}</h3>
          <CopyTextField
            contentToCopy={sharableURL}
            name="url"
            label={t('share.copyFieldlabel')}
            feedbackText={t('share.copiedFeedback')}
          >
            {sharableURL}
          </CopyTextField>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
