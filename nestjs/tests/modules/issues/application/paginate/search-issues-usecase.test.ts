import { SearchIssuesUseCase } from 'src/modules/issues/application/paginate/search-issues-usecase.service'
import { CursorSearchInput } from 'src/modules/shared/application/search-input.dto'
import { Issue } from 'src/modules/issues/domain/issue'
import { Cursor } from 'src/modules/shared/domain/query/cursor'
import { Orders } from 'src/modules/shared/domain/query/orders'
import { Filters } from 'src/modules/shared/domain/query/filters'
import { SearchIssuesInputMother } from './search-issues-input.mother'
import { SearchIssuesOutputMother } from './search-issues-output.mother'
import { IssueMother } from '../../domain/issue.mother'
import { IssueRepositoryMock } from '../../mocks/issue.repository.mock'
import { repeat } from '../../../shared/utils/random-array'

describe('SearchIssuesUseCase (unit tests)', () => {
  let repository: IssueRepositoryMock
  let useCase: SearchIssuesUseCase

  beforeEach(() => {
    repository = new IssueRepositoryMock()
    useCase = new SearchIssuesUseCase(repository)
  })

  beforeAll(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2023-01-01T00:00:00Z'))
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  function getExpectedOutput(
    issues: Issue[],
    input: CursorSearchInput
  ): SearchIssuesOutputMother {
    const defaultOrder = new Map([['orderBy', 'id'], ['orderType', 'asc']])
    const expectedIssues = issues.slice(0, input.pageSize)
    const lastExpectedIssue = expectedIssues[expectedIssues.length - 1]
    const hasMore = issues.length > input.pageSize -1

    const encodedCursor = Cursor.encode(
      lastExpectedIssue.id,
      input.filters ? Filters.fromValues(input.filters) : undefined,
      input.orders ? Orders.fromValues([...input.orders, defaultOrder]) : undefined
    )

    return SearchIssuesOutputMother.fromDomain(expectedIssues, hasMore, encodedCursor)
  }

  it('should return cursor in first call', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.firstCall()
    const issues = repeat(() => IssueMother.random(), input.pageSize + 1)
    repository.givenMatching(issues) // limit + 1

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(issues, input)
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should return no cursor in last call', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.firstCall()
    const issues = repeat(() => IssueMother.random(), input.pageSize + 1)
    repository.givenMatching(issues) // limit + 1

    const resultFirstCall = await useCase.invoke(input)
    const inputLastCall = SearchIssuesInputMother.lastCall(
      resultFirstCall.nextCursor!,
      input.pageSize,
      input.filters,
      input.orders
    )
    repository.givenMatching([])

    // WHEN
    const resultSecondCall = await useCase.invoke(inputLastCall)

    // THEN
    const expectedOutput = SearchIssuesOutputMother.empty()
    expect(resultSecondCall).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should return empty result when no issues match criteria', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.firstCall()
    repository.givenMatching([])

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = SearchIssuesOutputMother.empty()
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should apply filters correctly', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.firstCallWithFilters()
    const issues = repeat(() => IssueMother.random(), input.pageSize + 1)
    repository.givenMatching(issues) // limit + 1

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(issues, input)

    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should apply orders correctly', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.firstCallWithOrders()
    const issues = repeat(() => IssueMother.random(), input.pageSize + 1)
    repository.givenMatching(issues) // limit + 1

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(issues, input)
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should apply filters and orders correctly', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.firstCallWithFiltersAndOrders()
    const issues = repeat(() => IssueMother.random(), input.pageSize + 1)
    repository.givenMatching(issues) // limit + 1

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(issues, input)
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should throw error when invalid filter is provided', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.firstCallWithInvalidFilter()

    // WHEN / THEN
    await expect(useCase.invoke(input)).rejects.toThrow('Invalid argument: The field invalidField is not allowed for searching.')
    repository.assertNotCalled('matching')
  })

  it('should throw error when invalid order is provided', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.firstCallWithInvalidOrder()

    // WHEN / THEN
    await expect(useCase.invoke(input)).rejects.toThrow('Invalid argument: The field invalidField is not allowed for ordering.')
    repository.assertNotCalled('matching')
  })

  it('should apply mutliple filters and orders correctly', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.firstCallWithMultiple()
    const issues = repeat(() => IssueMother.random(), 11)
    repository.givenMatching(issues) // limit + 1

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    const expectedOutput = getExpectedOutput(issues, input)
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.limit === input.pageSize + 1)
  })

  it('should throw error when invalid cursor is provided', async () => {
    // GIVEN
    const input = SearchIssuesInputMother.nextCallWithInvalidCursor()

    // WHEN / THEN
    await expect(useCase.invoke(input)).rejects.toThrow('Invalid cursor')
  })
})
