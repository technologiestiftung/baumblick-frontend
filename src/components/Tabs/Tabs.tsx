import classNames from 'classnames'
import { FC } from 'react'

export interface TabsPropTypes {
  tabs: string[]
  onTabClick?: (tabIndex: number) => void
  activeTabIndex?: number
}

export const Tabs: FC<TabsPropTypes> = ({
  tabs,
  onTabClick = () => undefined,
  activeTabIndex = 0,
}) => (
  <ul
    className={classNames(
      'flex bg-gradient-to-t from-gray-50 to-white border-b border-b-gray-300',
      'items-end'
    )}
  >
    {tabs.map((tab, tabIndex) => (
      <li key={tab}>
        <button
          className={classNames(
            'font-sans px-5 py-2 relative',
            tabIndex !== activeTabIndex && 'font-medium z-10',
            tabIndex === activeTabIndex && [
              'font-bold bg-white border border-gray-300',
              'border-b-white translate-y-[1px]',
            ]
          )}
          tabIndex={tabIndex === activeTabIndex ? -1 : 0}
          disabled={tabIndex === activeTabIndex}
          onClick={() => onTabClick(tabIndex)}
        >
          {tab}
        </button>
      </li>
    ))}
  </ul>
)
