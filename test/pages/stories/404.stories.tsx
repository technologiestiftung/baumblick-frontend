import { Sidebar } from '@components/Sidebar'
import { Story, Meta } from '@storybook/react'
import { FourOFour } from '../../../pages/404'

export default {
  title: 'Pages/FourOFour',
  component: FourOFour,
} as Meta

const Template: Story = () => (
  <Sidebar>
    <FourOFour />
  </Sidebar>
)

export const Default = Template.bind({})
Default.parameters = {
  nextRouter: {
    query: {},
    pathname: '/404',
  },
}
Default.args = {}
