import { Story, Meta } from '@storybook/react'

import { Tabs, TabsPropTypes } from '.'

export default {
  title: 'UI Elements/Tabs',
  component: Tabs,
} as Meta

const Template: Story<TabsPropTypes> = (props) => <Tabs {...props} />

export const Default = Template.bind({})

Default.args = {
  tabs: ['Infos', 'Mitwirken'],
  activeTabIndex: 1,
}
