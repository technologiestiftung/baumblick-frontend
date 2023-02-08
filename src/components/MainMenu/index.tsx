import { Home, Map, News } from '@components/Icons'
import { IconPropType } from '@components/Icons/IconPropType'
import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'

interface LinkType {
  path: string
  name: string
  Icon: FC<IconPropType>
}

const links: LinkType[] = [
  {
    path: '/',
    name: 'Start',
    Icon: Home,
  },
  {
    path: '/trees',
    name: 'Karte',
    Icon: Map,
  },
  {
    path: '/stories',
    name: 'Stories',
    Icon: News,
  },
]

export const MainMenu: FC = () => {
  const { pathname } = useRouter()

  return (
    <div
      className={classNames(
        'bottom-0 lg:top-0',
        'fixed left-1/2 -translate-x-1/2 h-16 z-50',
        'w-full bg-white border-t border-gray-300',
        'flex gap-[1px] drop-shadow-lg'
      )}
    >
      {links.map((link) => {
        const isActive =
          (pathname.startsWith('/trees') && link.path === '/trees') ||
          pathname === link.path
        return (
          <InternalLink
            key={link.path}
            href={link.path}
            className={classNames(
              'w-auto border-r flex-1',
              'bg-white relative',
              'group cursor-default',
              'lg:border-r-0 lg:w-40 lg:flex-none',
              isActive ? 'text-gray-900' : 'text-gray-400',
              !isActive &&
                'hover:text-gray-600 hover:bg-gray-200 cursor-pointer',
              'transition-colors focus:outline-none',
              'focus:ring-2 focus:ring-gray-800 focus:z-10',
              'flex place-items-center justify-center'
            )}
          >
            <link.Icon width={32} height={32} />
            <span className="hidden ml-2 lg:inline-block">{link.name}</span>
          </InternalLink>
        )
      })}
    </div>
  )
}
