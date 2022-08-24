import classNames from 'classnames'
import { FC } from 'react'

export const Pill: FC<{ className?: string }> = ({
  className = '',
  children,
}) => (
  <span
    className={classNames(
      className,
      'h-4 w-4 font-sans text-center font-bold',
      'inline-flex place-content-center leading-tight',
      'text-xs text-gray-900/50 rounded-full'
    )}
  >
    {children}
  </span>
)
