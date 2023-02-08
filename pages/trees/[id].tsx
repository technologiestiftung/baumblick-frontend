import { FC, ReactElement, ReactNode } from 'react'
import { MapLayout } from '@layouts/MapLayout'
import classNames from 'classnames'
import { GetServerSideProps, NextPage } from 'next'
import { TreeDataType } from '@lib/requests/getTreeData'
import { useNowcastData } from '@lib/hooks/useNowcastData'
import { TreeInfoHeader } from '@components/TreeInfoHeader'
import { DataListItem } from '@components/DataListItem'
import { mapSuctionTensionToStatus } from '@lib/utils/mapSuctionTensionToStatus'
import { GroundLayersViz } from '@components/GroundLayersViz'
import { useRouter } from 'next/router'
import { Cross as CrossIcon } from '@components/Icons'
import { useHasScrolledPastThreshold } from '@lib/hooks/useHasScrolledPastThreshold'
import { Carousel } from '@components/Carousel'
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
import { MappedNowcastRowsType } from '@lib/utils/mapRowsToDepths'
import { useTreeData } from '@lib/hooks/useTreeData'
import { mapRawQueryToState } from '@lib/utils/queryUtil'
import { Head } from '@components/Head'
import { DatavisIcon } from '@components/DatavisIcons/DatavisIcon'
import { normalizeValue } from '@lib/utils/normalizeValue'

interface TreePageComponentPropType {
  treeId: TreeDataType['id']
  csrfToken: string
  query?: ReturnType<typeof mapRawQueryToState>
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
> = async ({ params, query, req, res }) => {
  try {
    await csrf(req, res)

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const csrfToken = req.csrfToken() as CsrfTokenType

    const treeId =
      typeof params?.id === 'string' ? treeUrlSlugToId(params.id) : null

    if (!treeId || Array.isArray(treeId)) return { notFound: true }

    return {
      props: {
        csrfToken,
        treeId,
        query,
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
  nowcastData: MappedNowcastRowsType | null
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
    nowcastData.depthAverageRow?.value &&
    mapSuctionTensionToStatus(nowcastData.depthAverageRow?.value)?.id

  return (
    <ul className="relative z-10 bg-white">
      <DataListItem
        title={t(`treeView.infoList.waterSupply.label`)}
        subtitle={t(`treeView.infoList.waterSupply.hint`)}
        valueLabel={
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
        valueLabel={
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
        // TODO: [QTREES-447] Remove dummy data for treeDisc
        // Update when adding access to real data.
        valueLabel={t(`treeView.infoList.treeDisc.value`, { value: 3.1 })}
        datavisIcon={
          <DatavisIcon
            iconType="square"
            iconValue={normalizeValue(3.1, [0, 10])}
            valueLabel={t(`treeView.infoList.treeDisc.value`, {
              value: 3.1,
            })}
          />
        }
      />
      <DataListItem
        title={t(`treeView.infoList.shading.label`)}
        subtitle={t(`treeView.infoList.shading.hint`)}
        // TODO: [QTREES-448] Remove dummy data for shading
        // Update when adding access to real data.
        valueLabel={t(`treeView.infoList.shading.value`, { value: 65 })}
        datavisIcon={
          <DatavisIcon
            iconType="clock"
            iconValue={normalizeValue(65, [0, 100])}
            valueLabel={t(`treeView.infoList.shading.value`, {
              value: 65,
            })}
          />
        }
      />
      <DataListItem
        title={t(`treeView.infoList.wateringAmount.label`)}
        subtitle={t(`treeView.infoList.wateringAmount.hint`)}
        // TODO: [QTREES-449] Remove dummy data for wateringAmount
        // Update when adding access to real data.
        valueLabel={t(`treeView.infoList.wateringAmount.value`, { value: 25 })}
        datavisIcon={
          <DatavisIcon
            iconType="water-drops"
            iconValue={normalizeValue(25, [0, 500])}
            valueLabel={t(`treeView.infoList.wateringAmount.value`, {
              value: 25,
            })}
          />
        }
      />
      {treeData?.stammumfg && (
        <DataListItem
          title={t(`treeView.infoList.trunkCircumference.label`)}
          subtitle={t(`treeView.infoList.trunkCircumference.hint`)}
          valueLabel={t(`treeView.infoList.trunkCircumference.value`, {
            value: treeData.stammumfg,
          })}
          datavisIcon={
            <DatavisIcon
              iconType="circle"
              iconValue={normalizeValue(treeData.stammumfg, [0, 800])}
              valueLabel={t(`treeView.infoList.trunkCircumference.value`, {
                value: treeData.stammumfg,
              })}
            />
          }
        />
      )}
    </ul>
  )
}

const TreePage: TreePageWithLayout = ({ treeId, csrfToken }) => {
  const { t } = useTranslation('common')
  const { push } = useRouter()
  const { hasScrolledPastThreshold } = useHasScrolledPastThreshold({
    threshold: 450,
  })

  const {
    data: treeData,
    error: treeDataError,
    isLoading: treeDataLoading,
  } = useTreeData(treeId)

  const {
    data: nowcastData,
    error: nowcastError,
    isLoading: nowcastIsLoading,
  } = useNowcastData(treeData?.id, csrfToken)

  const { data: forecastData, error: forecastError } = useForecastData(
    treeData?.id,
    csrfToken
  )

  const {
    data: rainData,
    error: rainError,
    isLoading: rainIsLoading,
  } = useTreeRainAmount(treeData?.id)

  if (treeDataError) {
    void push('/404')
    return null
  }

  const avgLevel =
    nowcastData && nowcastData.depthAverageRow?.value
      ? mapSuctionTensionToStatus(nowcastData.depthAverageRow?.value)?.id
      : undefined
  const circleColorClasses = getClassesByStatusId(avgLevel)

  const nowcastReady = forecastData && forecastData?.length > 0
  const forecastReady = nowcastData
  const forecast =
    nowcastReady && forecastReady
      ? combineNowAndForecastData(Object.values(nowcastData), forecastData)
      : undefined

  return (
    <div id="inidividual-tree-container">
      {treeData?.art_dtsch && <Head pageTitle={treeData.art_dtsch} />}
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
              query: { latitude: treeData?.lat, longitude: treeData?.lng },
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
                    nowcastData && nowcastData.depth30Row?.value
                      ? mapSuctionTensionToStatus(nowcastData.depth30Row?.value)
                          ?.id
                      : undefined
                  }
                  depth60StatusId={
                    nowcastData && nowcastData.depth60Row?.value
                      ? mapSuctionTensionToStatus(nowcastData.depth60Row?.value)
                          ?.id
                      : undefined
                  }
                  depth90StatusId={
                    nowcastData && nowcastData.depth90Row?.value
                      ? mapSuctionTensionToStatus(nowcastData.depth90Row?.value)
                          ?.id
                      : undefined
                  }
                  averageStatusId={avgLevel}
                />
              )}
              {!forecastError && <ForecastViz data={forecast} />}
            </Carousel>
          </div>
          <TreeInfoHeader
            species={
              treeDataLoading
                ? t('loading')
                : treeData?.art_dtsch || 'Unbekannte Art'
            }
            age={treeData?.standalter}
            height={treeData?.baumhoehe}
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
              species={
                !treeDataLoading && treeData
                  ? treeData?.art_dtsch || 'Unbekannte Art'
                  : '–'
              }
              age={treeData?.standalter}
              height={treeData?.baumhoehe}
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
                    treeData={treeData || undefined}
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
        isMinimized={true}
        treeIdToSelect={props.treeId}
        latitude={props.query?.latitude || undefined}
        longitude={props.query?.longitude || undefined}
      />
      {page}
    </>
  )
}

export default TreePage
