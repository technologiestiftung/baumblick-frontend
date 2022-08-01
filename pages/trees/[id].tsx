import type { ReactElement, ReactNode } from 'react'
import { MapLayout } from '@layouts/MapLayout'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'

type TreePageWithLayout = NextPage<{ id: string }> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      id: params?.id,
    },
  }
}

const TreePage: TreePageWithLayout = ({ id }) => {
  return (
    <div
      className={classNames(
        'absolute bottom-0 left-0 min-h-[75vh] bg-white w-full rounded-t-xl shadow-md p-6 z-10'
      )}
    >
      <h1 className="font-bold">Tree ID {id}</h1>
      <h2>Subtitle</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. At magni quo
        voluptates illum animi, recusandae vitae debitis qui nostrum ut. Facere
        blanditiis possimus debitis maxime neque, at quas assumenda laboriosam!
      </p>
    </div>
  )
}

TreePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {/* TODO: fetch coordinates from API and make map fly to them */}
      <MapLayout />
      {page}
    </>
  )
}

export default TreePage
