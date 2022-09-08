import { TreesMap } from '@components/TreesMap'
import { WaterSupplyLegend } from '@components/WaterSupplyLegend'
import { FC, useState } from 'react'
import { useHasScrolledPastThreshold } from '@lib/hooks/useHasScrolledPastThreshold'
import classNames from 'classnames'
import { InternalLink } from '@components/InternalLink'
import { useTreeData } from '@lib/hooks/useTreeData'
import { Modal } from '@components/Modal'

interface OnSelectOutput {
  id: string
  latitude: number
  longitude: number
}

export const MAP_CONFIG = {
  minZoom: 11.5,
  maxZoom: 22,
  defaultZoom: 14,
  defaultLatitude: 52.520952,
  defaultLongitude: 13.400033,
}

export interface MapLayoutType {
  latitude?: number
  longitude?: number
  treeIdToSelect?: string
  zoom?: number
  onTreeSelect?: (treeData: OnSelectOutput) => void
  isMinimized?: boolean
}

const OutdatedNowcastHint: FC<{ onClick?: () => void }> = ({
  onClick = () => undefined,
}) => {
  return (
    <button
      className="mt-1 flex gap-0 items-center bg-gray-200 rounded py-1 pr-1 w-full border border-gray-300"
      onClick={onClick}
    >
      <span className="w-6 text-center text-xs text-gray-500 font-bold">!</span>
      <span className="text-xs font-semibold">Daten veraltet</span>
    </button>
  )
}

export const MapLayout: FC<MapLayoutType> = ({
  latitude,
  longitude,
  treeIdToSelect,
  zoom,
  onTreeSelect = () => undefined,
  isMinimized,
  children,
}) => {
  const { data } = useTreeData(treeIdToSelect)
  const { hasScrolledPastThreshold } = useHasScrolledPastThreshold({
    threshold: 5,
    scrollParent: 'main',
  })

  const [hasOutdatedNowcast, setHasOutdatedNowcast] = useState(false)
  const [outdatedModalIsOpen, setOutdatedModalIsOpen] = useState(false)

  return (
    <>
      <div
        className={classNames(
          'fixed inset-0',
          isMinimized && 'pointer-events-none'
        )}
      >
        {!isMinimized && (
          <div className="fixed w-full left-0 top-2 md:top-4 pointer-events-none z-10">
            <div className="w-full max-w-3xl flex justify-end mx-auto">
              <InternalLink
                href="/"
                className={classNames(
                  'mr-2 md:mr-4',
                  'inline-flex gap-2',
                  'text-gray-900 bg-white p-3 rounded-full',
                  'border border-gray-300 shadow',
                  'pointer-events-auto',
                  'transition-colors focus:outline-none',
                  'focus:ring-2 focus:ring-gray-600',
                  'hover:text-gray-900 hover:underline'
                )}
              >
                <img src="/logo.svg" alt="TreeWatch Logo" className="h-6" />
              </InternalLink>
            </div>
          </div>
        )}
        <TreesMap
          mapId="trees-map"
          staticViewportProps={{
            minZoom: MAP_CONFIG.minZoom,
            maxZoom: MAP_CONFIG.maxZoom,
          }}
          initialViewportProps={{
            latitude: data?.lat || latitude || MAP_CONFIG.defaultLatitude,
            longitude: data?.lng || longitude || MAP_CONFIG.defaultLongitude,
            zoom: zoom || MAP_CONFIG.defaultZoom,
          }}
          onSelect={onTreeSelect}
          onOutdatedNowcastCheck={(isOutdated) =>
            setHasOutdatedNowcast(isOutdated)
          }
          latitude={latitude || data?.lat}
          longitude={longitude || data?.lng}
          treeIdToSelect={treeIdToSelect}
          isMinimized={isMinimized}
        />
        <WaterSupplyLegend
          hasShadow={true}
          className={classNames(
            'transition-opacity',
            hasScrolledPastThreshold && 'opacity-0 pointer-events-none'
          )}
        >
          {hasOutdatedNowcast && (
            <OutdatedNowcastHint onClick={() => setOutdatedModalIsOpen(true)} />
          )}
        </WaterSupplyLegend>
        {outdatedModalIsOpen && (
          <Modal
            title="Diese Vorhersage-Daten sind veraltet"
            description="Bitte versuche es später nochmal."
            onClose={() => setOutdatedModalIsOpen(false)}
          />
        )}
      </div>
      {children}
    </>
  )
}
