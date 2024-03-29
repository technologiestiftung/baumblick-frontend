import { Headline } from '@components/Headline'
import {
  ArrowAutofitHeight as HeightIcon,
  Plant as PlantIcon,
} from '@components/Icons'
import { TreeContextMenu } from '@components/TreeContextMenu'
import { TreeDataType } from '@lib/requests/getTreeData'
import classNames from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

export interface TreeInfoHeaderType {
  species: string
  height?: TreeDataType['baumhoehe']
  age?: TreeDataType['standalter']
  statusBackgroundColor?: string
  statusBorderColor?: string
  isCompressed?: boolean
  additionalClasses?: string
}

export const TreeInfoHeader: FC<TreeInfoHeaderType> = ({
  species,
  height,
  age,
  statusBackgroundColor,
  statusBorderColor,
  isCompressed = false,
  additionalClasses = '',
}) => {
  const { t } = useTranslation('common')
  return (
    <header
      className={classNames(
        'grid grid-cols-[32px,1fr,32px] gap-y-2 gap-x-3 items-center',
        'px-8 py-6 z-30 relative',
        'bg-white',
        additionalClasses
      )}
    >
      {isCompressed && (
        <div
          data-test-id="color-circle"
          className={classNames(
            'w-[32px] h-[32px] flex-shrink-0 flex-grow-0 rounded-full',
            'border flex place-content-center place-items-center font-bold',
            'text-gray-900/60',
            statusBackgroundColor && statusBorderColor
              ? `${statusBackgroundColor} ${statusBorderColor}`
              : 'bg-gray-300 border-gray-400'
          )}
        ></div>
      )}
      <Headline
        h1
        className={classNames(
          isCompressed ? 'col-span-1' : 'col-span-2',
          isCompressed && 'truncate text-ellipsis'
        )}
      >
        {species}
      </Headline>
      {!isCompressed && <TreeContextMenu />}
      {!isCompressed && (
        <div className={classNames('col-span-3', 'flex flex-wrap gap-2')}>
          {height && (
            <span className="flex gap-1 font-serif">
              <HeightIcon className="text-gray-400" />
              {t('treeView.header.height', { value: height })}
            </span>
          )}
          {age && (
            <span className="flex gap-1 font-serif">
              <PlantIcon className="text-gray-400" />
              {t('treeView.header.plantYear', { count: age })}
            </span>
          )}
        </div>
      )}
    </header>
  )
}
