import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { getTotalPages } from 'src/modules/shared/utils/pagination'
import { OffsetSearchInput } from 'src/modules/shared/application/search-input.dto'
import { OffsetPaginatedOutput } from 'src/modules/shared/application/search-output.dto'
import { SearchAircraftOutput } from './search-aircrafts-output.dtos'
import searchAircraftsConfig from './search-aircrafts-config'
import { AircraftRepository } from '../../domain/aircraft.repository'

export class SearchAircraftsUseCase {
  constructor(
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(input: OffsetSearchInput): Promise<OffsetPaginatedOutput<SearchAircraftOutput>> {
    const { allowedFilters, allowedOrders } = searchAircraftsConfig
    const criteria = Criteria.fromOffset(input, allowedFilters, allowedOrders)

    const [aircrafts, total] = await Promise.all([
      this.aircraftRepository.matching(criteria),
      this.aircraftRepository.count(criteria)
    ])

    return {
      total,
      page: input.page,
      pageSize: input.pageSize,
      totalPages: getTotalPages({ pageSize: input.pageSize, total }),
      items: aircrafts.map(aircraft => ({
        id: aircraft.id,
        modelId: aircraft.modelId,
        tailNumber: aircraft.tailNumber,
        totalFlightHours: aircraft.totalFlightHours,
        fuelLevelPercentage: aircraft.fuelLevelPercentage,
        status: aircraft.status
      }))
    }
  }
}
