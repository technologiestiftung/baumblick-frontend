import { Story, Meta } from '@storybook/react'

import { TableOfContents, TableOfContentsPropType } from '.'

export default {
  title: 'UI Elements/TableOfContents',
  component: TableOfContents,
} as Meta

const Template: Story<TableOfContentsPropType> = (props) => (
  <TableOfContents {...props} />
)

const chapters = [
  {
    title: 'This is chapter 1',
  },
  {
    title: 'This is chapter 2',
  },
  {
    title: 'This is chapter 3',
  },
  {
    title: 'This is chapter 4',
  },
  {
    title: 'This is chapter 5',
  },
  {
    title: 'This is chapter 6',
  },
  {
    title: 'This is chapter 7',
  },
  {
    title: 'This is chapter 8',
  },
  {
    title: 'This is chapter 9',
  },
  {
    title: 'This is chapter 10',
  },
]

export const Default = Template.bind({})
Default.parameters = {
  layout: 'fullscreen',
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
Default.args = {
  chapters,
}

export const WithActiveItem = Template.bind({})
WithActiveItem.parameters = {
  layout: 'fullscreen',
  nextRouter: {
    query: {},
    pathname: '/map',
  },
}
WithActiveItem.args = {
  activeChapterTitle: chapters[3].title,
  chapters,
}
