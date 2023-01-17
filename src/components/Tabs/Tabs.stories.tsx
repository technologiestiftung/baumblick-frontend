import { Story, Meta } from '@storybook/react'

import { Tabs, TabsPropTypes } from '.'

export default {
  title: 'UI Elements/Tabs',
  component: Tabs,
} as Meta

const Template: Story<TabsPropTypes> = (props) => <Tabs {...props} />

export const Default = Template.bind({})

Default.args = {
  tabs: [
    {
      name: 'Infos',
      content: <div className="p-8">This is the Infos content</div>,
    },
    {
      name: 'Mitwirken',
      content: <div className="p-8">This is the Mitwirken content</div>,
    },
  ],
}
