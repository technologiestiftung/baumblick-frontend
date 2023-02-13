import { DataListItem } from '@components/DataListItem'
import { DatavisIcon } from '@components/DatavisIcons/DatavisIcon'
import { useShadingDataReturnType } from '@lib/hooks/useShadingData'
import { useWateringDataReturnType } from '@lib/hooks/useWateringData'
import { TreeDataType } from '@lib/requests/getTreeData'
import { TreeRainAmountType } from '@lib/requests/getTreeRainAmount'
import { MappedNowcastRowsType } from '@lib/utils/mapRowsToDepths'
import { normalizeValue } from '@lib/utils/normalizeValue'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

const NoDataIndicator: FC = () => <span>–</span>

interface TreeInfoListType {
  treeData: TreeDataType | null
  treeDataIsLoading: boolean
  treeDataError: Error | null
  nowcastData: MappedNowcastRowsType | null
  nowcastIsLoading: boolean
  nowcastError: Error | null
  rainData: TreeRainAmountType | null
  rainIsLoading: boolean
  rainError: Error | null
  shadingData: useShadingDataReturnType['data']
  shadingIsLoading: useShadingDataReturnType['isLoading']
  shadingError: useShadingDataReturnType['error']
  wateringData: useWateringDataReturnType['data']
  wateringDataIsLoading: useWateringDataReturnType['isLoading']
  wateringDataError: useWateringDataReturnType['error']
}

export const TreeInfoList: FC<TreeInfoListType> = ({
  treeData,
  treeDataIsLoading,
  rainData,
  rainIsLoading,
  shadingData,
  shadingIsLoading,
  wateringData,
  wateringDataIsLoading,
}) => {
  const { t } = useTranslation('common')

  // Original shadingData is between 0 - 1, so we multiply by 100:
  const shadingValue = !shadingIsLoading && shadingData && shadingData * 100
  const rainValue = !rainIsLoading && rainData
  const treeDiscValue = !treeDataIsLoading && treeData?.baumscheibe
  const trunkCircumferenceValue = !treeDataIsLoading && treeData?.stammumfg
  const wateringValue = !wateringDataIsLoading && wateringData

  return (
    <ul className="relative z-10 bg-white">
      <DataListItem
        title={t(`treeView.infoList.shading.label`)}
        subtitle={t(`treeView.infoList.shading.hint`)}
        datavisIcon={
          shadingValue ? (
            <DatavisIcon
              iconType="clock"
              iconValue={normalizeValue(shadingValue, [0, 100])}
              valueLabel={t(`treeView.infoList.shading.value`, {
                value: shadingValue.toFixed(0),
              })}
            />
          ) : (
            <NoDataIndicator />
          )
        }
      />
      <DataListItem
        title={t(`treeView.infoList.rainAmount.label`)}
        subtitle={t(`treeView.infoList.rainAmount.hint`)}
        datavisIcon={
          rainValue ? (
            <DatavisIcon
              iconType="water-drops"
              iconValue={Math.round(
                normalizeValue(rainValue, [0, 500], [0, 5])
              )}
              valueLabel={t(`treeView.infoList.rainAmount.value`, {
                value: rainValue.toFixed(1),
              })}
            />
          ) : (
            <NoDataIndicator />
          )
        }
      />
      <DataListItem
        title={t(`treeView.infoList.wateringAmount.label`)}
        subtitle={t(`treeView.infoList.wateringAmount.hint`)}
        datavisIcon={
          wateringValue ? (
            <DatavisIcon
              iconType="water-drops"
              iconValue={Math.round(
                normalizeValue(wateringValue, [0, 500], [0, 5])
              )}
              valueLabel={t(`treeView.infoList.wateringAmount.value`, {
                value: wateringValue.toFixed(),
              })}
            />
          ) : (
            <NoDataIndicator />
          )
        }
      />
      <DataListItem
        title={t(`treeView.infoList.treeDisc.label`)}
        subtitle={t(`treeView.infoList.treeDisc.hint`)}
        datavisIcon={
          treeDiscValue ? (
            <DatavisIcon
              iconType="square"
              iconValue={normalizeValue(treeDiscValue, [0, 10])}
              valueLabel={t(`treeView.infoList.treeDisc.value`, {
                value: treeData?.baumscheibe,
              })}
            />
          ) : (
            <NoDataIndicator />
          )
        }
      />
      <DataListItem
        title={t(`treeView.infoList.trunkCircumference.label`)}
        subtitle={t(`treeView.infoList.trunkCircumference.hint`)}
        datavisIcon={
          trunkCircumferenceValue ? (
            <DatavisIcon
              iconType="circle"
              iconValue={normalizeValue(trunkCircumferenceValue, [0, 800])}
              valueLabel={t(`treeView.infoList.trunkCircumference.value`, {
                value: trunkCircumferenceValue,
              })}
            />
          ) : (
            <NoDataIndicator />
          )
        }
      />
    </ul>
  )
}
