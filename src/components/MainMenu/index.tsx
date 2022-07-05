import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { FC } from 'react'

const links = [
  {
    path: '/',
    name: 'Start',
  },
  {
    path: '/map',
    name: 'Karte',
  },
  {
    path: '/stories',
    name: 'Stories',
  },
]

export const MainMenu: FC = () => (
  <div
    className={classNames(
      'fixed bottom-0 left-0 right-0 h-16',
      'w-screen bg-gray-300 border-t border-gray-300',
      'flex gap-[1px] drop-shadow-lg'
    )}
  >
    {links.map((link) => (
      <InternalLink
        key={link.path}
        href={link.path}
        className={classNames(
          'bg-white w-full',
          'text-gray-900 group hover:bg-gray-200',
          'transition-colors focus:outline-none',
          'focus:ring-2 focus:ring-gray-800',
          'flex place-items-center justify-center'
        )}
      >
        Icon
      </InternalLink>
    ))}
  </div>
)
