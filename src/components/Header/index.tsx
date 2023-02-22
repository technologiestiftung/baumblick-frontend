import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

export const Header: FC<{
  compact?: boolean
  className?: string
}> = ({ compact = false, className }) => {
  const { t } = useTranslation('common')
  return (
    <div
      className={classNames(
        className,
        'w-full bg-white px-3 transition-all',
        'flex justify-between items-center',
        'md:border-r md:border-l border-gray-200',
        compact ? 'py-1.5' : 'py-3'
      )}
    >
      <InternalLink
        href="/"
        className={classNames(
          'px-1 inline-flex gap-2',
          'text-gray-900 relative',
          'transition-colors focus:outline-none',
          'focus:ring-2 focus:ring-gray-600',
          'hover:text-gray-900 hover:underline'
        )}
      >
        <img src="/logo.svg" alt="Baumblick Logo" className="h-6" />
        <span className={compact ? 'font-medium' : 'font-bold'}>
          {t('name.short')}
        </span>
        <span
          className={classNames(
            'text-xs px-0.5 py-0.25 bg-scale-critical font-bold uppercase',
            'absolute top-1/2 -right-1 translate-x-full -translate-y-1/2'
          )}
        >
          Beta
        </span>
      </InternalLink>
      <a
        className={classNames(
          'text-xs text-gray-500 px-1',
          'transition-colors focus:outline-none',
          'focus:ring-2 focus:ring-gray-600',
          'hover:text-gray-900 hover:underline'
        )}
        href={`https://${t('url')}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        {t('url')} {'->'}
      </a>
    </div>
  )
}
