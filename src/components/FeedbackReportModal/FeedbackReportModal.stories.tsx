import { Story, Meta } from '@storybook/react'
import { FeedbackReportModal, FeedbackReportModalPropType } from '.'

export default {
  title: 'UI Elements/FeedbackReportModal',
  component: FeedbackReportModal,
} as Meta

const Template: Story<FeedbackReportModalPropType> = (props) => (
  <FeedbackReportModal {...props} />
)

export const Default = Template.bind({})
Default.parameters = {
  layout: 'fullscreen',
}
Default.args = {
  title: 'Hängende Blätter',
  address: 'Forster Str, 10999',
  treeName: 'Kaiser-Linde',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Braunes_Laub_nach_Trockenheit_im_August_2018%2C_dry_trees_and_leaves%2C_early_autumn_in_Germany%2C_Kastanienallee_und_Schwanenteich_Giessen%2C_2018-08-21.jpg/220px-Braunes_Laub_nach_Trockenheit_im_August_2018%2C_dry_trees_and_leaves%2C_early_autumn_in_Germany%2C_Kastanienallee_und_Schwanenteich_Giessen%2C_2018-08-21.jpg',
}

export const WithoutImage = Template.bind({})
WithoutImage.parameters = {
  layout: 'fullscreen',
}
WithoutImage.args = {
  title: 'Hängende Blätter',
  address: 'Forster Str, 10999',
  treeName: 'Kaiser-Linde',
}

export const WithInvalidImage = Template.bind({})
WithInvalidImage.parameters = {
  layout: 'fullscreen',
}
WithInvalidImage.args = {
  title: 'Hängende Blätter',
  address: 'Forster Str, 10999',
  treeName: 'Kaiser-Linde',
  imageUrl:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Braunewefwfwefwfwfwefwfws_Laub_nach_Trockenheit_im_August_2018%2C_dry_trees_and_leaves%2C_early_autumn_in_Germany%2C_Kastanienallee_und_Schwanenteich_Giessen%2C_2018-08-21.jpg/220px-Braunes_Laub_nach_Trockenheit_im_August_2018%2C_dry_trees_and_leaves%2C_early_autumn_in_Germany%2C_Kastanienallee_und_Schwanenteich_Giessen%2C_2018-08-21.jpg',
}
