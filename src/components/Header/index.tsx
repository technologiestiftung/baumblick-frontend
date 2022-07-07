import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { FC } from 'react'

export const Header: FC = () => (
  <div
    className={classNames(
      'w-screen bg-white p-3',
      'flex justify-between items-center'
    )}
  >
    <InternalLink
      href="/"
      className={classNames(
        'font-semibold px-1',
        'text-gray-900',
        'transition-colors focus:outline-none',
        'focus:ring-2 focus:ring-gray-600',
        'hover:text-gray-900 hover:underline'
      )}
    >
      Qtrees <span className="font-normal">Baummonitor</span>
    </InternalLink>
    <a
      className={classNames(
        'text-xs text-gray-500 px-1',
        'transition-colors focus:outline-none',
        'focus:ring-2 focus:ring-gray-600',
        'hover:text-gray-900 hover:underline'
      )}
      href="https://qtrees.ai"
      rel="noopener noreferrer"
      target="_blank"
    >
      qtrees.ai {'->'}
    </a>
  </div>
)
