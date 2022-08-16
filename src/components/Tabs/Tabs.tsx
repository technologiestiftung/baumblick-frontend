import classNames from 'classnames'
import { FC, ReactElement } from 'react'
import { Tab } from '@headlessui/react'

export interface TabsPropTypes {
  tabs: {
    name: string
    content: ReactElement
  }[]
}

export const Tabs: FC<TabsPropTypes> = ({ tabs }) => (
  <Tab.Group>
    <Tab.List
      className={classNames(
        'flex bg-gradient-to-t from-gray-50 to-white border-b border-b-gray-300',
        'items-end z-10 relative'
      )}
    >
      {tabs.map((tab) => (
        <Tab
          key={tab.name}
          className={({ selected }) =>
            classNames(
              'font-sans text-2xl px-8 py-3 relative',
              !selected && ['z-30 hover:bg-gray-100 transition-colors'],
              selected && [
                'focus:ring-inset',
                'font-semibold bg-white border border-gray-300',
                'border-b-white translate-y-[1px] first-of-type:border-l-0',
              ]
            )
          }
        >
          {tab.name}
        </Tab>
      ))}
    </Tab.List>
    <Tab.Panels>
      {tabs.map((tab, idx) => (
        <Tab.Panel key={`${idx}-${tab.name}`}>{tab.content}</Tab.Panel>
      ))}
    </Tab.Panels>
  </Tab.Group>
)
