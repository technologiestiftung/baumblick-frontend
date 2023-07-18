import { Button } from '@components/Button'
import { Modal } from '@components/Modal'
import { Pill } from '@components/Pill'
import { ScalePills } from '@components/ScalePills'
import classNames from 'classnames'
import Trans from 'next-translate/Trans'
import useTranslation from 'next-translate/useTranslation'
import { FC } from 'react'

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
                <ScalePills key="fully-opaque-pills" />,
                <ScalePills
                  pillClassNames="border-opacity-20 bg-opacity-40"
                  key="half-transparent-pills"
                />,
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
                    'border bg-white border-gray-400 translate-y-0.5'
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
