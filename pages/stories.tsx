import { GetServerSideProps } from 'next'
import { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    title: 'Stories',
    query,
  },
})

export const Stories: FC = () => (
  <>
    <h1 className="font-sans font-bold text-3xl">This is a title</h1>
    <p className="font-serif">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis tempora
      sapiente amet ut dolorem, recusandae maxime at perferendis consequuntur
      odio quis nobis quaerat odit eius pariatur tempore eaque earum. Non.
    </p>
  </>
)

export default Stories
