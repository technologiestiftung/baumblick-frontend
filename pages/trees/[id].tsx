import { ReactElement, ReactNode } from 'react'
import { MapLayout } from '@layouts/MapLayout'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import { getTreeData, TreeDataType } from '@lib/requests/getTreeData'
import { useNowcastData } from '@lib/hooks/useNowcastData'
import { TreeInfoHeader } from '@components/TreeInfoHeader'
import { DataListItem } from '@components/DataListItem'
import { mapSuctionTensionToLevel } from '@lib/utils/mapSuctionTensionToLevel'
import { SuctionTensionViz } from '@components/SuctionTensionViz'

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
      style={{ height: 'calc(100vh - 132px)' }}
      className={classNames(
        'absolute bottom-0 left-0 w-full',
        'z-10',
        'grid grid-cols-1 grid-rows-[106px,1fr] gap-0'
      )}
    >
      <div
        className={classNames(
          'bg-white',
          'rounded-t-2xl shadow-[0_-12px_24px_-16px_rgba(0,0,0,0.3)]',
          'row-start-2 row-span-1',
          'overflow-y-scroll',
          'motion-safe:animate-slide-up'
        )}
      >
        {!nowcastError && (
          <SuctionTensionViz
            depth30Level={
              nowcastData && nowcastData[0].value
                ? mapSuctionTensionToLevel(nowcastData[0].value)
                : undefined
            }
            depth60Level={
              nowcastData && nowcastData[1].value
                ? mapSuctionTensionToLevel(nowcastData[1].value)
                : undefined
            }
            depth90Level={
              nowcastData && nowcastData[2].value
                ? mapSuctionTensionToLevel(nowcastData[2].value)
                : undefined
            }
            averageLevel={
              nowcastData && nowcastData[3].value
                ? mapSuctionTensionToLevel(nowcastData[3].value)
                : undefined
            }
          />
        )}

        <TreeInfoHeader
          species={treeData.art_dtsch || 'Unbekannte Art'}
          age={treeData.standalter}
          height={treeData.baumhoehe}
        />
        <ul>
          <DataListItem
            title="Saugspannung"
            subtitle="⌀ aus 30, 60, 90 cm Tiefe"
            value={
              nowcastData &&
              !nowcastIsLoading &&
              !nowcastError &&
              nowcastData[3].value
                ? mapSuctionTensionToLevel(nowcastData[3].value)
                : '-'
            }
          />
          <DataListItem
            title="Regenmenge"
            subtitle="Letzte 14 Tage"
            // TODO: Attention, this is dummy data.
            // Update when adding access to real data.
            value={`${258} l`}
          />
          <DataListItem
            title="Baumscheibe"
            subtitle="Unversiegelter Bereich um den Stamm"
            // TODO: Attention, this is dummy data.
            // Update when adding access to real data.
            value={`${3.1} qm`}
          />
          <DataListItem
            title="Verschattung"
            subtitle="Anteil an Schattenzeit pro Tag"
            // TODO: Attention, this is dummy data.
            // Update when adding access to real data.
            value={`${65} %`}
          />
          <DataListItem
            title="Gießwassermenge"
            subtitle="Letzte 14 Tage"
            // TODO: Attention, this is dummy data.
            // Update when adding access to real data.
            value={`${25} l`}
          />
          {treeData.stammumfg && (
            <DataListItem
              title="Stammumfang"
              subtitle="An der weitesten Stelle"
              value={`${treeData.stammumfg} cm`}
            />
          )}
        </ul>
      </div>
    </div>
  )
}

TreePage.getLayout = function getLayout(page) {
  return (
    <>
      <MapLayout />
      {page}
    </>
  )
}

export default TreePage
