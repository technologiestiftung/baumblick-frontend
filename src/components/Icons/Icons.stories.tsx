import { Story, Meta } from '@storybook/react'

import * as icons from '.'

export default {
  title: 'UI Elements/Icons',
} as Meta

const pickRandomColor = (): string => {
  const colorClasses = [
    'text-scale-1',
    'text-scale-2',
    'text-scale-3',
    'text-scale-4',
    'text-scale-5',
  ]
  return colorClasses[Math.floor(Math.random() * colorClasses.length)]
}

const Template: Story<{
  coloured?: boolean
  size?: number
}> = ({ coloured = false, size = 24 }) => (
  <div className="container mx-auto flex flex-wrap gap-8 items-center justify-center h-screen">
    {Object.values(icons).map((Icon, idx) => (
      <span
        key={Object.keys(icons)[idx]}
        className={(coloured && pickRandomColor()) || ''}
      >
        <Icon width={size} height={size} />
      </span>
    ))}
  </div>
)

export const AllIcons = Template.bind({})
AllIcons.args = {}

export const ColouredIcons = Template.bind({})
ColouredIcons.args = {
  coloured: true,
}

export const Size32 = Template.bind({})
Size32.args = {
  size: 32,
}

export const Size40 = Template.bind({})
Size40.args = {
  size: 40,
}
