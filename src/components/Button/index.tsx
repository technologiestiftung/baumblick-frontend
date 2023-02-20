import { InternalLink } from '@components/InternalLink'
import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface ButtonPropType {
  href?: string
  onClick?: () => void
  primary?: boolean
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
}

const getStyles = ({ primary, disabled, className }: ButtonPropType): string =>
  classNames(
    primary && 'relative',
    'rounded',
    'focus:ring px-5 py-3 font-semibold',
    'text-center inline-block',
    'transition-colors focus:outline-none',
    'inline-flex items-center gap-2',
    !className?.includes('justify') && 'justify-center',
    !disabled && [
      'focus:ring-offset-2 focus:ring-offset-white',
      'focus:ring-gray-900',
    ],
    !disabled &&
      primary && [
        'bg-gray-900 text-white',
        'hover:bg-gray-700',
        'active:bg-gray-900',
        'pb-4',
      ],
    !disabled &&
      !primary && [
        'bg-white text-gray-900',
        'border border-gray-300',
        'hover:bg-gray-200',
        'active:bg-gray-300',
      ],
    disabled && [
      'bg-gray-100 text-gray-400 border border-gray-200',
      'cursor-default pointer-events-none',
    ],
    className
  )

const Scale: FC = () => (
  <div className="flex h-1 absolute bottom-0 left-0 right-0">
    <span className="w-full h-1 bg-gradient-1 rounded-bl" />
    <span className="w-full h-1 bg-gradient-2" />
    <span className="w-full h-1 bg-gradient-3" />
    <span className="w-full h-1 bg-gradient-4" />
    <span className="w-full h-1 bg-gradient-5 rounded-br" />
  </div>
)

const renderChildren = ({ children, primary }: ButtonPropType): ReactNode => (
  <>
    {typeof children === 'string' ? <span>{children}</span> : children}
    {primary && <Scale />}
  </>
)

export const Button: FC<ButtonPropType> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { primary, ...restProps } = props
  if (!props.href) {
    return (
      <span
        tabIndex={props.disabled ? -1 : 0}
        {...restProps}
        className={getStyles(props)}
        role="button"
      >
        {renderChildren(props)}
      </span>
    )
  }
  if (props.href?.startsWith('/')) {
    return (
      <InternalLink
        {...restProps}
        href={props.href || '/'}
        className={getStyles(props)}
      >
        {renderChildren(props)}
      </InternalLink>
    )
  }
  if (props.href?.startsWith('#')) {
    return (
      <a {...restProps} className={getStyles(props)} href={props.href}>
        {renderChildren(props)}
      </a>
    )
  }
  return (
    <a
      {...restProps}
      className={getStyles(props)}
      rel="noreferrer noopener"
      target="_blank"
    >
      {renderChildren(props)}
    </a>
  )
}
