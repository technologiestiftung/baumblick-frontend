import { mapSuctionTensionToStatus } from '.'

describe('mapSuctionTensionToStatus', () => {
  test('is good status with matching suction tension', () => {
    const status = mapSuctionTensionToStatus(15)
    expect(status?.id).toBe('good')
  })
  test('is medium status with matching suction tension', () => {
    const status = mapSuctionTensionToStatus(40)
    expect(status?.id).toBe('medium')
  })
  test('is critical status with matching suction tension', () => {
    const status = mapSuctionTensionToStatus(125)
    expect(status?.id).toBe('critical')
  })
  test('is undefined with negative suction tension', () => {
    const status = mapSuctionTensionToStatus(-1)
    expect(status).toBe(undefined)
  })
})
