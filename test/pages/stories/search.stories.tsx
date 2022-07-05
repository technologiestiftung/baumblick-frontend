import { Story, Meta } from '@storybook/react'
import { Search } from '../../../pages/search'

export default {
  title: 'Pages/Search',
  component: Search,
} as Meta

const Template: Story = () => <Search />

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/search',
  },
}
Default.args = {}
