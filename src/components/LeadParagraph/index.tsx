import classNames from 'classnames'
import { FC, ReactNode } from 'react'

export interface LeadParagraphPropType {
  className?: string
  children: ReactNode
  Tag?: 'p' | 'span' | 'div'
}

export const LeadParagraph: FC<LeadParagraphPropType> = ({
  Tag = 'p',
  className,
  children,
  ...props
}) => {
  return (
    <Tag
      {...props}
      className={classNames(
        className,
        'text-lg',
        'font-medium',
        'text-gray-600',
        'mb-8'
      )}
    >
      {children}
    </Tag>
  )
}
