import SearchEnginesUseCase from 'src/modules/engines/application/paginate/search-engines-usecase.service'
import { CursorSearchInput } from 'src/modules/shared/application/search-input.dto'
import { Engine } from 'src/modules/engines/domain/engine'
import { Cursor } from 'src/modules/shared/domain/query/cursor'
import { Filters } from 'src/modules/shared/domain/query/filters'
import { Orders } from 'src/modules/shared/domain/query/orders'
import { SearchEnginesOutputMother } from './search-engines-output.mother'
import { SearchEnginesInputMother } from './search-engines-input.mother'
import { EngineRepositoryMock } from '../../mocks/engine.repository.mock'
import { EngineMother } from '../../domain/engine.mother'
import { repeat } from '../../../shared/utils/random-array'

describe('SearchEnginesUseCase (unit tests)', () => {
  let repository: EngineRepositoryMock
  let useCase: SearchEnginesUseCase

  beforeEach(() => {
    repository = new EngineRepositoryMock()
    useCase = new SearchEnginesUseCase(repository)
  })

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2023-01-01T00:00:00Z'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  function getExpectedOutput(engines: Engine[], input: CursorSearchInput): SearchEnginesOutputMother {
    const defaultOrder = new Map([
      ['orderBy', 'id'],
      ['orderType', 'asc']
    ])
    const expectedEngines = engines.slice(0, input.pageSize)
    const lastExpectedEngine = expectedEngines[expectedEngines.length - 1]
    const hasMore = engines.length > input.pageSize - 1

    const encodedCursor = Cursor.encode(
      lastExpectedEngine.id,
      input.filters ? Filters.fromValues(input.filters) : undefined,
      input.orders ? Orders.fromValues([...input.orders, defaultOrder]) : undefined
    )

    return SearchEnginesOutputMother.fromDomain(expectedEngines, hasMore, encodedCursor)
  }

  it('should return cursor in first call', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.firstCall()
    const engines = repeat(() => EngineMother.random(), input.pageSize + 1)
    repository.givenMatching(engines) // limit + 1

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(engines, input)
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should return no cursor in last call', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.firstCall()
    const engines = repeat(() => EngineMother.random(), input.pageSize + 1)
    repository.givenMatching(engines) // limit + 1

    const resultFirstCall = await useCase.invoke(input)
    const inputLastCall = SearchEnginesInputMother.lastCall(
      resultFirstCall.nextCursor!,
      input.pageSize,
      input.filters,
      input.orders
    )
    repository.givenMatching([])

    // WHEN
    const resultSecondCall = await useCase.invoke(inputLastCall)

    // THEN
    const expectedOutput = SearchEnginesOutputMother.empty()
    expect(resultSecondCall).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should return empty result when no engines match criteria', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.firstCall()
    repository.givenMatching([])

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = SearchEnginesOutputMother.empty()
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should apply filters correctly', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.firstCallWithFilters()
    const engines = repeat(() => EngineMother.random(), input.pageSize + 1)
    repository.givenMatching(engines) // limit + 1

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(engines, input)

    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should apply orders correctly', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.firstCallWithOrders()
    const engines = repeat(() => EngineMother.random(), input.pageSize + 1)
    repository.givenMatching(engines) // limit + 1

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(engines, input)
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should apply filters and orders correctly', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.firstCallWithFiltersAndOrders()
    const engines = repeat(() => EngineMother.random(), input.pageSize + 1)
    repository.givenMatching(engines) // limit + 1

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(engines, input)
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should throw error when invalid filter is provided', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.firstCallWithInvalidFilter()

    // WHEN / THEN
    await expect(useCase.invoke(input)).rejects.toThrow(
      'Invalid argument: The field invalidField is not allowed for searching.'
    )
    repository.assertNotCalled('matching')
  })

  it('should throw error when invalid order is provided', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.firstCallWithInvalidOrder()

    // WHEN / THEN
    await expect(useCase.invoke(input)).rejects.toThrow(
      'Invalid argument: The field invalidField is not allowed for ordering.'
    )
    repository.assertNotCalled('matching')
  })

  it('should apply mutliple filters and orders correctly', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.firstCallWithMultiple()
    const engines = repeat(() => EngineMother.random(), 11)
    repository.givenMatching(engines)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(engines, input)
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should throw error when invalid cursor is provided', async () => {
    // GIVEN
    const input = SearchEnginesInputMother.nextCallWithInvalidCursor()

    // WHEN / THEN
    await expect(useCase.invoke(input)).rejects.toThrow('Invalid cursor')
  })
})
