import { Story, Meta } from '@storybook/react'

import { RootsIllustration, RootsIllustrationType } from '.'

export default {
  title: 'UI Elements/RootsIllustration',
  component: RootsIllustration,
} as Meta

const Template: Story<RootsIllustrationType> = (props) => (
  <RootsIllustration {...props} />
)

export const Default = Template.bind({})

Default.args = {
  color: '#000000',
  strokeWidth: 3,
}
