import { Button } from '@components/Button'
import { Modal } from '@components/Modal'
import { Pill } from '@components/Pill'
import { getClassesByStatusId } from '@lib/utils/getClassesByStatusId'
import { WATER_SUPPLY_STATUSES } from '@lib/utils/mapSuctionTensionToStatus'
import classNames from 'classnames'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

const DEFAULT_PILL_STYLES = 'border translate-y-0.5'

export const LegendModal: FC<{ onClose?: () => void }> = ({
  onClose = () => undefined,
}) => {
  const { t } = useTranslation('common')

  return (
    <Modal
      title={t('legend.map.legendModal.title')}
      description={
        <>
          <span className="block">
            <Trans
              i18nKey="common:legend.map.legendModal.nowcastDescription"
              components={[
                ...WATER_SUPPLY_STATUSES.map((status) => {
                  return (
                    <Pill
                      key={`nowcast-${status.id}-pill`}
                      className={classNames(
                        DEFAULT_PILL_STYLES,
                        Object.values(getClassesByStatusId(status.id))
                      )}
                    />
                  )
                }),
              ]}
            />
          </span>
          <span className="block mt-4">
            <Trans
              i18nKey="common:legend.map.legendModal.districtsDescription"
              components={[
                <span
                  key="half-transparent-pills"
                  className={classNames('inline-flex gap-x-0.5')}
                >
                  {WATER_SUPPLY_STATUSES.map((status) => {
                    return (
                      <Pill
                        key={status.id}
                        className={classNames(
                          DEFAULT_PILL_STYLES,
                          'bg-opacity-20 border-opacity-40',
                          getClassesByStatusId(status.id).bg,
                          getClassesByStatusId(status.id).border
                        )}
                      />
                    )
                  })}
                </span>,
              ]}
            />
          </span>
          <span className="block mt-4">
            <Trans
              i18nKey="common:legend.map.legendModal.noDataDescription"
              components={[
                <Pill
                  key="no-data-pill"
                  className={classNames(
                    DEFAULT_PILL_STYLES,
                    'bg-white border-gray-400'
                  )}
                />,
              ]}
            />
          </span>
        </>
      }
      footer={
        <Button onClick={onClose}>{t('legend.map.legendModal.close')}</Button>
      }
      onClose={onClose}
    />
  )
}
