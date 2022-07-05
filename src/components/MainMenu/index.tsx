import { Affiliate } from '@components/Icons/Affiliate'
import { ArrowDownLeft } from '@components/Icons/ArrowDownLeft'
import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { FC } from 'react'

const links = [
  {
    path: '/',
    name: 'Start',
    Icon: () => <Affiliate width={32} height={32} />,
  },
  {
    path: '/map',
    name: 'Karte',
    Icon: () => <ArrowDownLeft width={32} height={32} />,
  },
  {
    path: '/stories',
    name: 'Stories',
    Icon: () => <div />,
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
        <link.Icon />
      </InternalLink>
    ))}
  </div>
)
