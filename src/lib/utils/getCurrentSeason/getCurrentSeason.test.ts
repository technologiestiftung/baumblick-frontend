import { getCurrentSeason } from '.'

describe('getCurrentSeason util', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  test('returns winter in the beginning of the year', () => {
    jest.setSystemTime(new Date(2023, 0, 1).getTime())

    const currentSeason = getCurrentSeason()

    expect(currentSeason).toEqual('winter')
  })

  test('returns winter when last day of winter', () => {
    jest.setSystemTime(new Date(2023, 2, 20).getTime())

    const currentSeason = getCurrentSeason()

    expect(currentSeason).toEqual('winter')
  })

  test('returns spring when first day of spring', () => {
    jest.setSystemTime(new Date(2023, 2, 21).getTime())

    const currentSeason = getCurrentSeason()

    expect(currentSeason).toEqual('spring')
  })

  test('returns spring when last day of spring', () => {
    jest.setSystemTime(new Date(2023, 5, 20).getTime())

    const currentSeason = getCurrentSeason()

    expect(currentSeason).toEqual('spring')
  })

  test('returns summer when first day of summer', () => {
    jest.setSystemTime(new Date(2023, 5, 21).getTime())

    const currentSeason = getCurrentSeason()

    expect(currentSeason).toEqual('summer')
  })

  test('returns summer when last day of summer', () => {
    jest.setSystemTime(new Date(2023, 8, 20).getTime())

    const currentSeason = getCurrentSeason()

    expect(currentSeason).toEqual('summer')
  })

  test('returns fall when first day of fall', () => {
    jest.setSystemTime(new Date(2023, 8, 21).getTime())

    const currentSeason = getCurrentSeason()

    expect(currentSeason).toEqual('fall')
  })

  test('returns fall when last day of fall', () => {
    jest.setSystemTime(new Date(2023, 11, 20).getTime())

    const currentSeason = getCurrentSeason()

    expect(currentSeason).toEqual('fall')
  })

  test('returns winter when first day of winter', () => {
    jest.setSystemTime(new Date(2023, 11, 21).getTime())

    const currentSeason = getCurrentSeason()

    expect(currentSeason).toEqual('winter')
  })
})
