import { Home, Map, News } from '@components/Icons'
import { IconPropType } from '@components/Icons/IconPropType'
import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
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
  const { t } = useTranslation('common')

  return (
    <div
      className={classNames(
        'bottom-0 lg:top-0',
        'fixed left-1/2 -translate-x-1/2 h-16',
        'w-full bg-white border-t border-gray-300',
        'flex gap-[1px] drop-shadow-lg'
      )}
    >
      <InternalLink
        href="/"
        className={classNames(
          'px-1 inline-flex gap-2',
          'text-gray-900',
          'transition-colors focus:outline-none',
          'focus:ring-2 focus:ring-gray-600',
          'hover:text-gray-900 ',
          'hidden lg:flex lg:items-center lg:px-7 hover:bg-gray-200',
          'z-10 relative group'
        )}
      >
        <img src="/logo.svg" alt="Baumblick Logo" className="h-6" />
        <span className={'font-bold group-hover:underline'}>
          {t('name.short')}
        </span>
        <span
          className={classNames(
            'text-xs px-0.5 pb-[1px] bg-scale-critical font-bold uppercase',
            'group-hover:no-underline'
          )}
        >
          Beta
        </span>
      </InternalLink>
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
