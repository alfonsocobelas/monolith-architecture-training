import { SearchAircraftsUseCase } from 'src/modules/aircrafts/application/paginate/search-aircrafts-usecase.service'
import { SearchAircraftsInputMother } from './search-aircraft-input.mother'
import { SearchAircraftsOutputMother } from './search-aircraft-ouput.mother'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { AircraftMother } from '../../domain/aircraft.mother'
import { repeat } from '../../../shared/utils/random-array'

describe('SearchAircraftsUseCase (unit tests)', () => {
  let repository: AircraftRepositoryMock
  let useCase: SearchAircraftsUseCase

  beforeEach(() => {
    repository = new AircraftRepositoryMock()
    useCase = new SearchAircraftsUseCase(repository)
  })

  it('should return a paginated list of aircrafts on the first page', async () => {
    // GIVEN
    const input = SearchAircraftsInputMother.firstPage()
    const aircrafts = repeat(() => AircraftMother.random(), 15)
    const totalAircrafts = aircrafts.length
    const expectedOutput = SearchAircraftsOutputMother.fromDomain(aircrafts, totalAircrafts, input)

    repository.givenMatching(aircrafts)
    repository.givenCount(totalAircrafts)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    repository.assertMatchingCalledWith(criteria => criteria.offset === 0 && criteria.limit === 10)
    repository.assertCountCalledWith(criteria => criteria.offset === 0 && criteria.limit === 10)
  })

  it('should return empty items but correct pagination when no results found', async () => {
    // GIVEN
    const page = 5
    const pageSize = 10
    const total = 0
    const input = SearchAircraftsInputMother.onPage(page, pageSize)
    const expectedOutput = SearchAircraftsOutputMother.empty(input)

    repository.givenMatching([])
    repository.givenCount(total)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    expect(result.totalPages).toBe(0)
    expect(result.items).toHaveLength(0)
  })

  it('should calculate correct offset for second page', async () => {
    // GIVEN
    const page = 2
    const pageSize = 5
    const input = SearchAircraftsInputMother.onPage(page, pageSize)
    repository.givenMatching([AircraftMother.random()])
    repository.givenCount(1)

    // WHEN
    await useCase.invoke(input)

    // THEN (offset = (2-1) * 5 = 5)
    repository.assertMatchingCalledWith(criteria => criteria.offset === 5)
    repository.assertCountCalledWith(criteria => criteria.offset === 5)
  })

  it('should apply status filters correctly', async () => {
    // GIVEN
    const input = SearchAircraftsInputMother.onlyActive()
    const activeAircrafts = AircraftMother.activeInFlight()
    repository.givenMatching([activeAircrafts])
    repository.givenCount(1)

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertMatchingCalledWith(criteria => {
      const filter = criteria.filters?.filters[0]
      return filter?.field.value === 'status' && filter?.value.value === 'ACTIVE' && filter?.operator.isEqual()
    })
    repository.assertCountCalledWith(criteria => {
      const filter = criteria.filters?.filters[0]
      return filter?.field.value === 'status' && filter?.value.value === 'ACTIVE' && filter?.operator.isEqual()
    })
  })

  it('should apply sorting correctly', async () => {
    // GIVEN
    const input = SearchAircraftsInputMother.sortByHoursDesc()
    repository.givenMatching([])
    repository.givenCount(0)

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertMatchingCalledWith(criteria => {
      const order = criteria.orders?.orders[0]
      return order?.orderBy.value === 'totalFlightHours' && order?.orderType.isDesc()
    })
    repository.assertCountCalledWith(criteria => {
      const order = criteria.orders?.orders[0]
      return order?.orderBy.value === 'totalFlightHours' && order?.orderType.isDesc()
    })
  })

  it('should apply multiple filters simultaneously', async () => {
    // GIVEN
    const input = SearchAircraftsInputMother.lowFuelAndActive()
    repository.givenMatching([AircraftMother.random()])
    repository.givenCount(1)

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertMatchingCalledWith(criteria => {
      const filters = criteria.filters?.filters || []
      const hasFuelFilter = filters.some(f => f.field.value === 'fuelLevelPercentage' && f.operator.isLessThan())
      const hasStatusFilter = filters.some(f => f.field.value === 'status' && f.value.value === 'ACTIVE' && f.operator.isEqual())

      return filters.length === 2 && hasFuelFilter && hasStatusFilter
    })
    repository.assertCountCalledWith(criteria => {
      const filters = criteria.filters?.filters || []
      const hasFuelFilter = filters.some(f => f.field.value === 'fuelLevelPercentage' && f.operator.isLessThan())
      const hasStatusFilter = filters.some(f => f.field.value === 'status' && f.value.value === 'ACTIVE' && f.operator.isEqual())

      return filters.length === 2 && hasFuelFilter && hasStatusFilter
    })
  })

  it('should apply multiple sorting criteria', async () => {
    // GIVEN
    const input = SearchAircraftsInputMother.sortByHoursAndFuel()
    repository.givenMatching([])
    repository.givenCount(0)

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertMatchingCalledWith(criteria => {
      const orders = criteria.orders?.orders || []
      const firstOrder = orders[0]?.orderBy.value === 'totalFlightHours'
      const secondOrder = orders[1]?.orderBy.value === 'fuelLevelPercentage'

      return orders.length === 2 && firstOrder && secondOrder
    })
    repository.assertCountCalledWith(criteria => {
      const orders = criteria.orders?.orders || []
      const firstOrder = orders[0]?.orderBy.value === 'totalFlightHours'
      const secondOrder = orders[1]?.orderBy.value === 'fuelLevelPercentage'

      return orders.length === 2 && firstOrder && secondOrder
    })
  })

  it('should throw an error when an invalid filter field is provided', async () => {
    // GIVEN
    const input = SearchAircraftsInputMother.withInvalidFilterField()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow('The field non_existent_field is not allowed for searching.')
  })

  it('should throw an error when an invalid order field is provided', async () => {
    // GIVEN
    const input = SearchAircraftsInputMother.withInvalidOrderField()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow('The field non_existent_field is not allowed for ordering.')
  })
})
