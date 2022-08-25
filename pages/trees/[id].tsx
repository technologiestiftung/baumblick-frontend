import { FC, ReactElement, ReactNode } from 'react'
import { MapLayout } from '@layouts/MapLayout'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import { getTreeData, TreeDataType } from '@lib/requests/getTreeData'
import { useNowcastData } from '@lib/hooks/useNowcastData'
import { TreeInfoHeader } from '@components/TreeInfoHeader'
import { DataListItem } from '@components/DataListItem'
import { mapSuctionTensionToStatus } from '@lib/utils/mapSuctionTensionToStatus'
import { GroundLayersViz } from '@components/GroundLayersViz'
import { useRouter } from 'next/router'
import { Cross as CrossIcon } from '@components/Icons'
import { useHasScrolledPastThreshold } from '@lib/hooks/useHasScrolledPastThreshold'
import { Carousel } from '@components/Carousel'
import { NowcastDataType } from '@lib/requests/getNowcastData'
import { Tabs } from '@components/Tabs'
import useTranslation from 'next-translate/useTranslation'
import { getClassesByStatusId } from '@lib/utils/getClassesByStatusId'
import { treeUrlSlugToId } from '@lib/utils/urlUtil'
import { getStatusLabel } from '@lib/utils/getStatusLabel'
import { ForecastViz } from '@components/ForecastViz'
import { FeedbackRequestsList } from '@components/FeedbackRequestsList'
import csrf from '@lib/api/csrf'
import { useForecastData } from '@lib/hooks/useForecastData'
import { combineNowAndForecastData } from '@lib/utils/forecastUtil/forecastUtil'
import { useTreeRainAmount } from '@lib/hooks/useTreeRainAmount'
import { TreeRainAmountType } from '@lib/requests/getTreeRainAmount'

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
  rainData: TreeRainAmountType | null
  rainIsLoading: boolean
  rainError: Error | null
}> = ({ treeData, nowcastData, nowcastIsLoading, nowcastError, rainData }) => {
  const { t } = useTranslation('common')
  const averageStatusId =
    nowcastData &&
    !nowcastIsLoading &&
    !nowcastError &&
    nowcastData[0].value &&
    mapSuctionTensionToStatus(nowcastData[0].value)?.id

  return (
    <ul className="z-10 relative bg-white">
      <DataListItem
        title={t(`treeView.infoList.waterSupply.label`)}
        subtitle={t(`treeView.infoList.waterSupply.hint`)}
        value={
          averageStatusId
            ? t(`treeView.infoList.waterSupply.value`, {
                value: getStatusLabel(averageStatusId),
              })
            : '-'
        }
      />
      <DataListItem
        title={t(`treeView.infoList.rainAmount.label`)}
        subtitle={t(`treeView.infoList.rainAmount.hint`)}
        value={
          rainData
            ? t(`treeView.infoList.rainAmount.value`, {
                value: rainData.toFixed(1),
              })
            : '–'
        }
      />
      <DataListItem
        title={t(`treeView.infoList.treeDisc.label`)}
        subtitle={t(`treeView.infoList.treeDisc.hint`)}
        // TODO: Attention, this is dummy data.
        // Update when adding access to real data.
        value={t(`treeView.infoList.treeDisc.value`, { value: 3.1 })}
      />
      <DataListItem
        title={t(`treeView.infoList.shading.label`)}
        subtitle={t(`treeView.infoList.shading.hint`)}
        // TODO: Attention, this is dummy data.
        // Update when adding access to real data.
        value={t(`treeView.infoList.shading.value`, { value: 65 })}
      />
      <DataListItem
        title={t(`treeView.infoList.wateringAmount.label`)}
        subtitle={t(`treeView.infoList.wateringAmount.hint`)}
        // TODO: Attention, this is dummy data.
        // Update when adding access to real data.
        value={t(`treeView.infoList.wateringAmount.value`, { value: 25 })}
      />
      {treeData?.stammumfg && (
        <DataListItem
          title={t(`treeView.infoList.trunkCircumference.label`)}
          subtitle={t(`treeView.infoList.trunkCircumference.hint`)}
          value={t(`treeView.infoList.trunkCircumference.value`, {
            value: treeData.stammumfg,
          })}
        />
      )}
    </ul>
  )
}

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
  } = useNowcastData(treeData.gml_id, csrfToken)

  const { data: forecastData, error: forecastError } = useForecastData(
    treeData.gml_id,
    csrfToken
  )

  const {
    data: rainData,
    error: rainError,
    isLoading: rainIsLoading,
  } = useTreeRainAmount(treeData.gml_id)

  const avgLevel =
    nowcastData && nowcastData[0].value
      ? mapSuctionTensionToStatus(nowcastData[0].value)?.id
      : undefined
  const circleColorClasses = getClassesByStatusId(avgLevel)

  const nowcastReady = forecastData && forecastData?.length > 0
  const forecastReady = nowcastData && nowcastData.length === 4
  const forecast =
    nowcastReady && forecastReady
      ? combineNowAndForecastData(nowcastData, forecastData)
      : undefined

  return (
    <div id="inidividual-tree-container">
      <div
        className={classNames(
          'max-w-3xl mx-auto',
          'grid grid-cols-1 grid-rows-[124px,1fr] gap-0'
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
          aria-label={t(`treeView.mapAriaLabel`)}
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
            'bg-white rounded-t-2xl',
            'md:border-l md:border-r border-gray-200',
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
                <GroundLayersViz
                  depth30StatusId={
                    nowcastData && nowcastData[3].value
                      ? mapSuctionTensionToStatus(nowcastData[3].value)?.id
                      : undefined
                  }
                  depth60StatusId={
                    nowcastData && nowcastData[2].value
                      ? mapSuctionTensionToStatus(nowcastData[2].value)?.id
                      : undefined
                  }
                  depth90StatusId={
                    nowcastData && nowcastData[1].value
                      ? mapSuctionTensionToStatus(nowcastData[1].value)?.id
                      : undefined
                  }
                  averageStatusId={avgLevel}
                />
              )}
              {!forecastError && <ForecastViz data={forecast} />}
            </Carousel>
          </div>
          <TreeInfoHeader
            species={treeData.art_dtsch || 'Unbekannte Art'}
            age={treeData.standalter}
            height={treeData.baumhoehe}
            statusBackgroundColor={circleColorClasses.bg}
            statusBorderColor={circleColorClasses.border}
          />
          <div
            className={classNames(
              'fixed w-screen top-0 z-50 border-gray-300 pointer-events-none',
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
                    treeData={treeData}
                    nowcastData={nowcastData}
                    nowcastError={nowcastError}
                    nowcastIsLoading={nowcastIsLoading}
                    rainData={rainData}
                    rainError={rainError}
                    rainIsLoading={rainIsLoading}
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
