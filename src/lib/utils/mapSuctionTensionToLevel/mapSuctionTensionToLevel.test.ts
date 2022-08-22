import { mapSuctionTensionToLevel } from '.'

describe('mapSuctionTensionToLevel', () => {
  test('is first level with matching suction tension', () => {
    const level = mapSuctionTensionToLevel(15)
    expect(level?.id).toBe('good')
  })
  test('is second level with matching suction tension', () => {
    const level = mapSuctionTensionToLevel(40)
    expect(level?.id).toBe('medium')
  })
  test('is third level with matching suction tension', () => {
    const level = mapSuctionTensionToLevel(125)
    expect(level?.id).toBe('critical')
  })
  test('is undefined with negative suction tension', () => {
    const level = mapSuctionTensionToLevel(-1)
    expect(level).toBe(undefined)
  })
})
