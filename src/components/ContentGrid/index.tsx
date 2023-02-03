import classNames from 'classnames'
import { FC } from 'react'

export interface ContentGridPropType {
  children?: JSX.Element | JSX.Element[]
}

export const ContentGrid: FC<ContentGridPropType> = ({ children }) => {
  return (
    <div
      className={classNames(
        'w-full px-4 grid grid-cols-6 gap-4',
        'md:px-6 md:grid-cols-12 md:gap-6',
        'screen1200:px-8',
        'screen1440:px-14 screen1440:gap-8',
        'screen1920:px-[4.5rem]'
      )}
    >
      {children}
    </div>
  )
}

export const GridDefault: FC<ContentGridPropType> = ({ children }) => {
  return (
    <div
      className={classNames(
        'col-span-full',
        'md:col-start-3 md:col-span-8',
        'screen1200:col-start-4 screen1200:col-span-6'
      )}
    >
      {children}
    </div>
  )
}
