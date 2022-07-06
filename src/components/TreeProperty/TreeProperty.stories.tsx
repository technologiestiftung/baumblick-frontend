import { Story, Meta } from '@storybook/react'

import { TreeProperty, TreePropertyType } from '.'

export default {
  title: 'UI Elements/TreeProperty',
  component: TreeProperty,
} as Meta

const Template: Story<TreePropertyType> = (args) => (
  <div className="w-full max-w-[400px]">
    <TreeProperty className="p-3" {...args} />
  </div>
)

export const WithSublabel = Template.bind({})

WithSublabel.args = {
  label: 'Verschattung',
  sublabel: 'Anteil an Schattenzeit',
  value: '75%',
}

export const WithoutSublabel = Template.bind({})

WithoutSublabel.args = {
  label: 'Verschattung',
  value: '75%',
}
