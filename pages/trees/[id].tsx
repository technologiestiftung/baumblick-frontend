import { FC, ReactElement, ReactNode } from 'react'
import { MapLayout } from '@layouts/MapLayout'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import { getTreeData, TreeDataType } from '@lib/requests/getTreeData'
import { useNowcastData } from '@lib/hooks/useNowcastData'
import { TreeInfoHeader } from '@components/TreeInfoHeader'
import { DataListItem } from '@components/DataListItem'
import { mapSuctionTensionToLevel } from '@lib/utils/mapSuctionTensionToLevel'
import { SuctionTensionViz } from '@components/SuctionTensionViz'
import { useRouter } from 'next/router'
import { Cross as CrossIcon } from '@components/Icons'
import { useHasScrolledPastThreshold } from '@lib/hooks/useHasScrolledPastThreshold'
import { Carousel } from '@components/Carousel'
import { NowcastDataType } from '@lib/requests/getNowcastData'
import { Tabs } from '@components/Tabs'
import useTranslation from 'next-translate/useTranslation'
import { getScaleClassesByLevel } from '@lib/utils/getScaleClassesByLevel'
import { treeUrlSlugToId } from '@lib/utils/urlUtil'
import { FeedbackRequestsList } from '@components/FeedbackRequestsList'
import csrf from '@lib/api/csrf'

interface TreePageComponentPropType {
  treeData: TreeDataType
  latitude?: number
  longitude?: number
  csrfToken: string
}

type TreePageWithLayout = NextPage<TreePageComponentPropType> & {
  getLayout?: (
    page: ReactElement,
    props: TreePageComponentPropType
  ) => ReactNode
}

type CsrfTokenType = string

export const getServerSideProps: GetServerSideProps<
  TreePageComponentPropType
> = async ({ params, req, res }) => {
  try {
    await csrf(req, res)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const csrfToken = req.csrfToken() as CsrfTokenType

    const treeId =
      typeof params?.id === 'string' ? treeUrlSlugToId(params.id) : null

    if (!treeId || Array.isArray(treeId)) return { notFound: true }

    const treeData = await getTreeData(treeId, csrfToken)

    if (!treeData || treeData.length !== 1)
      throw new Error('No tree found for this request')

    return {
      props: {
        csrfToken,
        title: treeData[0].art_dtsch,
        treeData: treeData[0],
        latitude: treeData[0].lat,
        longitude: treeData[0].lng,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      notFound: true,
    }
  }
}

const InfoList: FC<{
  treeData: TreeDataType | null
  nowcastData: NowcastDataType[] | null
  nowcastIsLoading: boolean
  nowcastError: Error | null
}> = ({ treeData, nowcastData, nowcastIsLoading, nowcastError }) => (
  <ul className="z-10 relative bg-white">
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
      value={`${0} l`}
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
    {treeData?.stammumfg && (
      <DataListItem
        title="Stammumfang"
        subtitle="An der weitesten Stelle"
        value={`${treeData.stammumfg} cm`}
      />
    )}
  </ul>
)

const TreePage: TreePageWithLayout = ({ treeData, csrfToken }) => {
  const { t } = useTranslation('common')
  const { push } = useRouter()
  const { hasScrolledPastThreshold } = useHasScrolledPastThreshold({
    threshold: 450,
  })

  const {
    data: nowcastData,
    error: nowcastError,
    isLoading: nowcastIsLoading,
  } = useNowcastData(treeData.gml_id)

  const avgLevel =
    nowcastData && nowcastData[3].value
      ? mapSuctionTensionToLevel(nowcastData[3].value)
      : undefined
  const circleColorClasses = getScaleClassesByLevel(avgLevel)

  return (
    <div id="inidividual-tree-container">
      <div
        className={classNames(
          'max-w-3xl mx-auto',
          'grid grid-cols-1 grid-rows-[124px,1fr] gap-0',
          'md:border-l md:border-r border-gray-200'
        )}
      >
        <button
          className={classNames(
            'row-start-1 row-span1',
            'relative',
            'group focus:outline-none'
          )}
          onClick={() => {
            void push({
              pathname: '/trees',
              query: { latitude: treeData.lat, longitude: treeData.lng },
            })
          }}
          aria-label="Kartenansicht"
        >
          <div
            className={classNames(
              'absolute top-2 right-2',
              'p-2 bg-white rounded-full shadow-md hover:bg-gray-100',
              'border border-gray-300',
              'group-focus:ring-2 group-focus:ring-gray-900 group-focus:ring-offset-2',
              'group-focus:ring-offset-white'
            )}
          >
            <CrossIcon className="w-8 h-8" />
          </div>
        </button>
        <div
          className={classNames(
            'bg-white',
            'row-start-2 row-span-1',
            'grid grid-cols-1 grid-rows-auto',
            'motion-safe:animate-slide-up'
          )}
        >
          <div
            className={classNames(
              'w-full sticky top-0',
              'overflow-hidden rounded-t-2xl',
              'shadow-[0_-12px_24px_-16px_rgba(0,0,0,0.3)]'
            )}
          >
            <Carousel dotsClass="slick-dots w-2/6 md:w-1/4 mx-auto">
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
                  averageLevel={avgLevel}
                />
              )}
              <div className="bg-scale-4 h-full">Bar chart</div>
            </Carousel>
          </div>
          <TreeInfoHeader
            species={treeData.art_dtsch || 'Unbekannte Art'}
            age={treeData.standalter}
            height={treeData.baumhoehe}
            level={avgLevel}
            statusBackgroundColor={circleColorClasses.bg}
            statusBorderColor={circleColorClasses.border}
          />
          <div
            className={classNames(
              'fixed w-screen top-0 z-20 border-gray-300 pointer-events-none',
              'transition-all',
              hasScrolledPastThreshold
                ? ' opacity-1 shadow-lg border-b'
                : 'opacity-0'
            )}
          >
            <TreeInfoHeader
              species={treeData.art_dtsch || 'Unbekannte Art'}
              age={treeData.standalter}
              height={treeData.baumhoehe}
              level={avgLevel}
              statusBackgroundColor={circleColorClasses.bg}
              statusBorderColor={circleColorClasses.border}
              isCompressed={hasScrolledPastThreshold}
            />
          </div>
          <Tabs
            tabs={[
              {
                name: t('treeView.tabs.0'),
                content: (
                  <InfoList
                    nowcastIsLoading={nowcastIsLoading}
                    treeData={treeData}
                    nowcastData={nowcastData}
                    nowcastError={nowcastError}
                  />
                ),
              },
              {
                name: t('treeView.tabs.1'),
                content: (
                  <FeedbackRequestsList
                    treeData={treeData}
                    csrfToken={csrfToken}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

TreePage.getLayout = function getLayout(page, props) {
  return (
    <>
      <MapLayout
        latitude={props.latitude}
        longitude={props.longitude}
        treeIdToSelect={props.treeData.gml_id}
        isMinimized={true}
      />
      {page}
    </>
  )
}

export default TreePage
