import classNames from 'classnames'
import { FC } from 'react'

export interface TreePropertyType {
  label: string
  sublabel?: string
  value: string
  className?: string
}

export const TreeProperty: FC<TreePropertyType> = ({
  label,
  sublabel,
  value,
  className,
}) => (
  <div className={classNames(className, 'flex justify-between items-start')}>
    <div>
      <h2 className={classNames('text-2xl font-semibold text-gray-800')}>
        {label}
      </h2>
      <span className={classNames('font-serif')}>{sublabel}</span>
    </div>
    <p className={classNames('text-2xl text-gray-800')}>{value}</p>
  </div>
)
