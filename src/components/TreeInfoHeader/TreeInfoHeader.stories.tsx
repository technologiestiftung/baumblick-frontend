import { Story, Meta } from '@storybook/react'

import { TreeInfoHeader, TreeInfoHeaderType } from '.'

export default {
  title: 'UI Elements/TreeInfoHeader',
  component: TreeInfoHeader,
} as Meta

const Template: Story<TreeInfoHeaderType> = (props) => (
  <TreeInfoHeader {...props} />
)

export const Default = Template.bind({})

Default.args = {
  species: 'Kaiser-Linde',
  height: 12,
  age: 50,
  isCompressed: false,
  statusBackgroundColor: 'bg-scale-4',
  statusBorderColor: 'border-scale-4-dark',
}

export const PartialData = Template.bind({})

PartialData.args = {
  species: 'Kaiser-Linde',
  age: 50,
  statusBackgroundColor: 'bg-scale-4',
  statusBorderColor: 'border-scale-4-dark',
  isCompressed: false,
}

export const Compressed = Template.bind({})

Compressed.args = {
  species: 'Kaiser-Linde',
  height: 12,
  age: 50,
  statusBackgroundColor: 'bg-scale-4',
  statusBorderColor: 'border-scale-4-dark',
  isCompressed: true,
}

export const LongTitle = Template.bind({})

LongTitle.args = {
  species: 'Kanadischer Ahorn-Tannenbaum',
  height: 12,
  age: 50,
  statusBackgroundColor: 'bg-scale-4',
  statusBorderColor: 'border-scale-4-dark',
  isCompressed: true,
}
