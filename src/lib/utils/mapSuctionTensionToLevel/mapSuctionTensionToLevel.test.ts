import { mapSuctionTensionToLevel } from '.'

describe('mapSuctionTensionToLevel', () => {
  test('is first level with matching suction tension', () => {
    const level = mapSuctionTensionToLevel(25)
    expect(level).toBe(1)
  })
  test('is second level with matching suction tension', () => {
    const level = mapSuctionTensionToLevel(75)
    expect(level).toBe(2)
  })
  test('is third level with matching suction tension', () => {
    const level = mapSuctionTensionToLevel(125)
    expect(level).toBe(3)
  })
  test('is fourth level with matching suction tension', () => {
    const level = mapSuctionTensionToLevel(175)
    expect(level).toBe(4)
  })
  test('is fifth level with matching suction tension', () => {
    const level = mapSuctionTensionToLevel(225)
    expect(level).toBe(5)
  })
  test('is undefined with negative suction tension', () => {
    const level = mapSuctionTensionToLevel(-1)
    expect(level).toBe(undefined)
  })
})
