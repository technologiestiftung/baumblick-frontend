import { Button } from '@components/Button'
import { Story, Meta } from '@storybook/react'

import { ImageCard, ImageCardType } from '.'

export default {
  title: 'UI Elements/ImageCard',
  component: ImageCard,
} as Meta

const Template: Story<ImageCardType> = (props) => <ImageCard {...props} />

export const Default = Template.bind({})

Default.args = {
  title: 'Baum gießen',
  description:
    'Du hast den Baum gegossen oder möchtest wissen, wer im Kiez bei dir aktiv ist? Dann ab zu Gieß den Kiez!',
  imageUrl:
    'https://staging.baumblick.qtrees.ai/images/issues/missnutzung-baumscheibe.jpg',
  children: <Button primary>Baum in Gieß den Kiez öffnen</Button>,
}

export const WithInvalidImageUrl = Template.bind({})

WithInvalidImageUrl.args = {
  title: 'Baum gießen',
  description:
    'Du hast den Baum gegossen oder möchtest wissen, wer im Kiez bei dir aktiv ist? Dann ab zu Gieß den Kiez!',
  imageUrl: '...',
  children: <Button primary>Baum in Gieß den Kiez öffnen</Button>,
}
