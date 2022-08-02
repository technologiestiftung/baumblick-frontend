import { FC } from 'react'
import Link, { LinkProps } from 'next/link'

interface InternalLinkPropType extends LinkProps {
  href: string
  className?: string
}

export const InternalLink: FC<InternalLinkPropType> = ({
  href,
  children,
  className = '',
  ...rest
}) => {
  return (
    <Link
      href={{
        pathname: href,
      }}
      {...rest}
    >
      <a href={href} className={className}>
        {children}
      </a>
    </Link>
  )
}
