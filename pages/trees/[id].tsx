import type { ReactElement, ReactNode } from 'react'
import { MapLayout } from '@layouts/MapLayout'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import { getTreeData, TreeDataType } from '@lib/requests/getTreeData'

type TreePageWithLayout = NextPage<{
  treeData: TreeDataType[]
}> & {
  getLayout?: (page: ReactElement) => ReactNode
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    const treeId = typeof params?.id === 'string' ? params.id : null

    if (!treeId || Array.isArray(treeId)) return { notFound: true }

    const treeData = await getTreeData(treeId)

    if (!treeData || treeData.length !== 1)
      throw new Error('No tree found for this request')

    return {
      props: {
        treeData: treeData[0],
      },
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}

const TreePage: TreePageWithLayout = ({ treeData }) => {
  console.log(treeData)

  return (
    <div
      className={classNames(
        'absolute bottom-0 left-0 min-h-[75vh] bg-white w-full rounded-t-xl shadow-md p-6 z-10'
      )}
    >
      <h1 className="font-bold">Tree ID</h1>
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
