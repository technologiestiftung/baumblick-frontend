import type { ReactElement, ReactNode } from 'react'
import { MapLayout } from '@layouts/MapLayout'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import { getTreeData, TreeDataType } from '@lib/requests/getTreeData'
import { useNowcastData } from '@lib/hooks/useNowcastData'

type TreePageWithLayout = NextPage<{
  treeData: TreeDataType
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
        title: treeData[0].art_dtsch,
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
  const {
    data: nowcastData,
    error: nowcastError,
    isLoading: nowcastIsLoading,
  } = useNowcastData(treeData.gml_id)

  return (
    <div
      className={classNames(
        'absolute bottom-0 left-0 min-h-[75vh] bg-white w-full rounded-t-xl shadow-md p-6 z-10'
      )}
    >
      {treeData.art_dtsch && (
        <h1 className="font-bold">{treeData.art_dtsch}</h1>
      )}
      {treeData.baumhoehe && <h2>{treeData.baumhoehe} m hoch</h2>}
      {treeData.standalter && (
        <h2>Gepflanzt vor {treeData.standalter} Jahren</h2>
      )}
      {nowcastData && !nowcastIsLoading && !nowcastError && (
        <ul>
          {nowcastData.map((item) => {
            return (
              <li key={item.id} className="mt-3 grid grid-cols-1">
                <span>{item?.timestamp}</span>
                <span>{item?.value}</span>
                <span>{item?.type_id}</span>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

TreePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <MapLayout />
      {page}
    </>
  )
}

export default TreePage
