import { Criteria } from 'src/modules/shared/domain/query/criteria'

export abstract class MockRepository<T> {
  private mocks: Map<string, jest.Mock> = new Map()

  protected getMock(methodName: string): jest.Mock {
    if (!this.mocks.has(methodName)) {
      this.mocks.set(methodName, jest.fn())
    }
    return this.mocks.get(methodName)!
  }

  protected setMockResult(methodName: string, result: unknown): void {
    this.getMock(methodName).mockResolvedValue(result)
  }

  assertCalled(methodName: string): void {
    expect(this.getMock(methodName)).toHaveBeenCalled()
  }

  assertNotCalled(methodName: string): void {
    expect(this.getMock(methodName)).not.toHaveBeenCalled()
  }

  assertCalledWith(methodName: string, ...args: unknown[]): void {
    expect(this.getMock(methodName)).toHaveBeenCalledWith(...args)
  }

  assertLastCalledWith(methodName: string, ...args: unknown[]): void {
    expect(this.getMock(methodName)).toHaveBeenLastCalledWith(...args)
  }

  assertCalledTimes(methodName: string, times: number): void {
    expect(this.getMock(methodName)).toHaveBeenCalledTimes(times)
  }

  assertMatchingCalledWith(check: (criteria: Criteria) => boolean): void {
    const mock = this.getMock('matching')
    const lastCallIndex = mock.mock.calls.length - 1
    const lastCallCriteria = mock.mock.calls[lastCallIndex][0] as Criteria
    expect(check(lastCallCriteria)).toBe(true)
  }

  assertCountCalledWith(check: (criteria: Criteria) => boolean): void {
    const mock = this.getMock('count')
    const lastCallIndex = mock.mock.calls.length - 1
    const lastCallCriteria = mock.mock.calls[lastCallIndex][0] as Criteria
    expect(check(lastCallCriteria)).toBe(true)
  }
}
