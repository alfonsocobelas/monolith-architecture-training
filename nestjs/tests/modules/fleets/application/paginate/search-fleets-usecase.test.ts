import { SearchFleetsUseCase } from 'src/modules/fleets/application/paginate/search-fleets-usecase.service'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { SearchFleetsInputMother } from './search-fleets-input.mother'
import { SearchFleetsOutputMother } from './search-fleets-output.mother'
import { FleetMother } from '../../domain/fleet.mother'
import { repeat } from '../../../shared/utils/random-array'

describe('SearchFleetsUseCase (unit tests)', () => {
  let repository: FleetRepositoryMock
  let useCase: SearchFleetsUseCase

  beforeEach(() => {
    repository = new FleetRepositoryMock()
    useCase = new SearchFleetsUseCase(repository)
  })

  it('should return a paginated list of fleets on the first page', async () => {
    // GIVEN
    const input = SearchFleetsInputMother.firstPage()
    const fleets = repeat(() => FleetMother.random(), 15)
    const total = fleets.length
    const expectedOutput = SearchFleetsOutputMother.fromDomain(fleets, total, input)

    repository.givenMatching(fleets)
    repository.givenCount(total)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.offset === 0 && criteria.limit === 10)
    repository.assertCountCalledWith(criteria => criteria.offset === 0 && criteria.limit === 10)
  })

  it('should calculate correct offset for second page', async () => {
    // GIVEN
    const page = 2
    const pageSize = 5
    const input = SearchFleetsInputMother.onPage(page, pageSize)
    repository.givenMatching([FleetMother.random()])
    repository.givenCount(10)

    // WHEN
    await useCase.invoke(input)

    // THEN (offset = (2-1) * 5 = 5)
    repository.assertMatchingCalledWith(criteria => criteria.offset === 5)
    repository.assertCountCalledWith(criteria => criteria.offset === 5)
  })

  it('should apply status filters correctly', async () => {
    // GIVEN
    const input = SearchFleetsInputMother.onlyOperative()
    repository.givenMatching([])
    repository.givenCount(0)

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertMatchingCalledWith(criteria => {
      const filter = criteria.filters?.filters[0]
      return filter?.field.value === 'status' && filter?.value.value === 'OPERATIVE' && filter?.operator.isEqual()
    })
    repository.assertCountCalledWith(criteria => {
      const filter = criteria.filters?.filters[0]
      return filter?.field.value === 'status' && filter?.value.value === 'OPERATIVE' && filter?.operator.isEqual()
    })
  })

  it('should apply sorting correctly', async () => {
    // GIVEN
    const input = SearchFleetsInputMother.sortByMaintenanceBudgetDesc()
    repository.givenMatching([])
    repository.givenCount(0)

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertMatchingCalledWith(criteria => {
      const order = criteria.orders?.orders[0]
      return order?.orderBy.value === 'maintenanceBudget' && order?.orderType.isDesc()
    })
    repository.assertCountCalledWith(criteria => {
      const order = criteria.orders?.orders[0]
      return order?.orderBy.value === 'maintenanceBudget' && order?.orderType.isDesc()
    })
  })

  it('should apply multiple filters and sorting correctly', async () => {
    // GIVEN
    const input = SearchFleetsInputMother.activeInRegion('North')
    repository.givenMatching([])
    repository.givenCount(0)

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertMatchingCalledWith(criteria => {
      const regionFilter = criteria.filters?.filters.find(f => f.field.value === 'operationRegion' && f.operator.isEqual())
      const statusFilter = criteria.filters?.filters.find(f => f.field.value === 'status' && f.operator.isEqual())

      return regionFilter?.value.value === 'North' && statusFilter?.value.value === 'ACTIVE'
    })
    repository.assertCountCalledWith(criteria => {
      const regionFilter = criteria.filters?.filters.find(f => f.field.value === 'operationRegion' && f.operator.isEqual())
      const statusFilter = criteria.filters?.filters.find(f => f.field.value === 'status' && f.operator.isEqual())

      return regionFilter?.value.value === 'North' && statusFilter?.value.value === 'ACTIVE'
    })
  })

  it('should apply multiple sorting criteria correctly', async () => {
    // GIVEN
    const input = SearchFleetsInputMother.sortByBudgetAndRegion()
    repository.givenMatching([])
    repository.givenCount(0)

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertMatchingCalledWith(criteria => {
      const budgetOrder = criteria.orders?.orders.find(o => o.orderBy.value === 'maintenanceBudget')
      const regionOrder = criteria.orders?.orders.find(o => o.orderBy.value === 'operationRegion')
      return budgetOrder?.orderType.value === 'desc' && regionOrder?.orderType.value === 'asc'
    })
    repository.assertCountCalledWith(criteria => {
      const budgetOrder = criteria.orders?.orders.find(o => o.orderBy.value === 'maintenanceBudget')
      const regionOrder = criteria.orders?.orders.find(o => o.orderBy.value === 'operationRegion')
      return budgetOrder?.orderType.value === 'desc' && regionOrder?.orderType.value === 'asc'
    })
    repository.assertCountCalledWith(criteria => {
      const budgetOrder = criteria.orders?.orders.find(o => o.orderBy.value === 'maintenanceBudget')
      const regionOrder = criteria.orders?.orders.find(o => o.orderBy.value === 'operationRegion')
      return budgetOrder?.orderType.value === 'desc' && regionOrder?.orderType.value === 'asc'
    })

  })

  it('should apply critical budget filter on second page', async () => {
    // GIVEN
    const input = SearchFleetsInputMother.criticalBudgetOnSecondPage()
    repository.givenMatching([])
    repository.givenCount(0)

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertMatchingCalledWith(criteria => {
      const budgetFilter = criteria.filters?.filters.find(f => f.field.value === 'maintenanceBudget')
      return budgetFilter?.operator.value === 'lt' && budgetFilter?.value.value === '50000'
    })
    repository.assertCountCalledWith(criteria => {
      const budgetFilter = criteria.filters?.filters.find(f => f.field.value === 'maintenanceBudget')
      return budgetFilter?.operator.value === 'lt' && budgetFilter?.value.value === '50000'
    })
  })
})
