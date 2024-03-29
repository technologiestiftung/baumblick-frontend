import { getStatusLabel } from '@lib/utils/getStatusLabel'
import {
  WATER_SUPPLY_STATUSES,
  WaterSupplyStatusType,
} from '@lib/utils/mapSuctionTensionToStatus'
import { render, screen } from '@testing-library/react'
import { addDays, format, isSameDay } from 'date-fns'
import I18nProvider from 'next-translate/I18nProvider'
import { ForecastViz } from '.'
import commoDE from '../../../locales/de/common.json'

const NOW = new Date('2022-08-24T11:17:56.022Z')

const getDateLabel = (date: Date, tomorrow: Date): string => {
  return `${format(date, 'dd.MM.')}${
    isSameDay(date, tomorrow) ? ' (Morgen)' : ''
  }`
}

interface DataItem {
  waterSupplyStatusId: WaterSupplyStatusType['id'] | undefined
  date: Date
}

const fakeData: DataItem[] = Array.from(Array(13)).map((_, i) => {
  return {
    date: addDays(NOW, i),
    waterSupplyStatusId:
      WATER_SUPPLY_STATUSES[i % WATER_SUPPLY_STATUSES.length]?.id,
  }
})

describe('ForecastViz', () => {
  test('should render 13 days without data', () => {
    render(
      <I18nProvider lang={'de'} namespaces={{ common: commoDE }}>
        <ForecastViz startDate={NOW} />
      </I18nProvider>
    )

    Array.from(Array(13)).forEach((_, i) => {
      const dateInXDays = getDateLabel(addDays(NOW, i), NOW)
      const labelInXDays = screen.getByLabelText(`${dateInXDays}: Unbekannt`)
      expect(labelInXDays).toBeInTheDocument()
    })
  })

  test('should render 13 days with all data', () => {
    render(
      <I18nProvider lang={'de'} namespaces={{ common: commoDE }}>
        <ForecastViz startDate={NOW} data={fakeData} />
      </I18nProvider>
    )

    fakeData.forEach(({ date, waterSupplyStatusId }) => {
      const dateInXDays = getDateLabel(date, NOW)
      const labelInXDays = screen.getByLabelText(
        `${dateInXDays}: ${getStatusLabel(waterSupplyStatusId || '') || ''}`
      )
      expect(labelInXDays).toBeInTheDocument()
    })
  })

  test('should render 13 days with some data', () => {
    render(
      <I18nProvider lang={'de'} namespaces={{ common: commoDE }}>
        <ForecastViz startDate={NOW} data={fakeData.filter((_, i) => i % 2)} />
      </I18nProvider>
    )

    fakeData.forEach(({ date, waterSupplyStatusId }, i) => {
      const dateInXDays = getDateLabel(date, NOW)
      const labelInXDays = screen.getByLabelText(
        `${dateInXDays}: ${
          i % 2 !== 0
            ? getStatusLabel(waterSupplyStatusId || '') || ''
            : 'Unbekannt'
        }`
      )
      expect(labelInXDays).toBeInTheDocument()
    })
  })

  test('should render 13 days with data out of 14 days range', () => {
    render(
      <I18nProvider lang={'de'} namespaces={{ common: commoDE }}>
        <ForecastViz
          startDate={NOW}
          data={fakeData.map((item) => ({
            ...item,
            date: addDays(item.date, 60),
          }))}
        />
      </I18nProvider>
    )

    Array.from(Array(13)).forEach((_, i) => {
      const dateInXDays = getDateLabel(addDays(NOW, i), NOW)
      const labelInXDays = screen.getByLabelText(`${dateInXDays}: Unbekannt`)
      expect(labelInXDays).toBeInTheDocument()
    })
  })
})
