import React, { FC } from 'react'
import { Modal, ModalType } from '.'
import { Story } from '@storybook/react'
import { Button } from '@components/Button'

export default {
  title: 'UI Elements/Modal',
  component: Modal,
}

const ExampleBackground: FC = () => {
  return (
    <div className="prose">
      <h1>This is an example modal background for Storybook</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quis
        nobis, suscipit sit corrupti cumque iusto similique voluptas provident
        mollitia enim ipsa reprehenderit, consectetur officiis veritatis nisi
        quae odio fuga.
      </p>
      <p>
        Rerum neque tenetur consequatur impedit officiis ratione dolores et.
        Quae quia voluptatem saepe necessitatibus sint repudiandae. Dicta
        molestiae sunt et eveniet et est dolor eum. Veritatis nam est ratione
        esse magnam.
      </p>
      <h2>This is a heading 2</h2>
      <p>
        Et saepe possimus architecto voluptas. Et at at esse voluptatibus hic
        error necessitatibus. Praesentium eaque laudantium sint autem.
      </p>
      <p>
        Dolores cupiditate doloremque nobis sit et dignissimos. Est hic ut
        deleniti non. Maxime nostrum praesentium impedit ut minima modi quas.
      </p>
    </div>
  )
}

const Template: Story<ModalType> = (args) => (
  <div className="relative w-full h-full">
    <ExampleBackground />
    <Modal {...args}>{args.children}</Modal>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  title: 'You are about to do ...',
  description: (
    <>
      This <b>explains</b> what the modal is gonna do.
    </>
  ),
  isOpen: true,
}

export const WithChildren = Template.bind({})
WithChildren.args = {
  title: 'You are about to do ...',
  description: (
    <>
      This <b>explains</b> what the modal is gonna do.
    </>
  ),
  isOpen: true,
  children: (
    <p className="font-serif">
      Here could be additional content passed as <code>children</code>.
    </p>
  ),
}

export const WithFooter = Template.bind({})
WithFooter.args = {
  title: 'You are about to do ...',
  description: (
    <>
      This <b>explains</b> what the modal is gonna do.
    </>
  ),
  isOpen: true,
  footer: <Button>Got it!</Button>,
}

export const WithHeaderAndFooter = Template.bind({})
WithHeaderAndFooter.args = {
  title: 'You are about to do ...',
  description: (
    <>
      This <b>explains</b> what the modal is gonna do.
    </>
  ),
  isOpen: true,
  header: (
    <div className="w-full h-48 bg-scale-critical text-gray-900 flex items-center justify-center">
      Place header content here
    </div>
  ),
  footer: <Button>Do it!</Button>,
}
