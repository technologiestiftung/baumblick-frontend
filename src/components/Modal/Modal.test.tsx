import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

// Headless UI apparently requires a mock of InteractionObserver.
// See: https://github.com/tailwindlabs/headlessui/blob/397ba5c8c2f8f8d7440b663f67dc4b4bd99a7f61/packages/%40headlessui-vue/src/components/dialog/dialog.test.ts#L37

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.IntersectionObserver = class FakeIntersectionObserver {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
  observe() {}
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
  disconnect() {}
}

describe('component Modal', () => {
  afterEach(() => {
    const modals = document.querySelectorAll('#headlessui-portal-root')
    modals.forEach((modal) => modal.parentNode?.removeChild(modal))
  })
  test('should render an accessible dialog', () => {
    render(
      <Modal
        title="I am a test title"
        description="I am the description"
        header={<p>I am a modal header</p>}
        footer={<p>I am a modal footer</p>}
      >
        <p>Body</p>
      </Modal>
    )
    const modalElement = screen.getByRole('dialog', {
      name: 'I am a test title',
    })
    expect(modalElement).toBeInTheDocument()

    const descriptionText = screen.getByText('I am the description')
    expect(descriptionText).toBeInTheDocument()

    const bodyText = screen.getByText('Body')
    expect(bodyText).toBeInTheDocument()

    const headerContent = screen.getByText('I am a modal header')
    expect(headerContent).toBeInTheDocument()

    const footerContent = screen.getByText('I am a modal footer')
    expect(footerContent).toBeInTheDocument()
  })

  test('should close on escape hit', async () => {
    const user = userEvent.setup()

    render(
      <Modal title="I am a test title" description="I am the description">
        <p>Body</p>
      </Modal>
    )

    await user.keyboard('{Escape}')
  })
})
