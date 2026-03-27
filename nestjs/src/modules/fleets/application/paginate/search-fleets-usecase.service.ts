import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { OffsetSearchInput } from 'src/modules/shared/application/search-input.dto'
import { OffsetPaginatedOutput } from 'src/modules/shared/application/search-output.dto'
import { SearchFleetOutput } from './search-fleets-output.dto'
import { getTotalPages } from 'src/modules/shared/utils/pagination'
import searchFleetsConfig from './search-fleets-config'
import { FleetRepository } from '../../domain/fleet.repository'

export class SearchFleetsUseCase {
  constructor(
    private readonly fleetRepository: FleetRepository
  ) {}

  async invoke(input: OffsetSearchInput): Promise<OffsetPaginatedOutput<SearchFleetOutput>> {
    const { allowedFilters, allowedOrders } = searchFleetsConfig
    const criteria = Criteria.fromOffset(input, allowedFilters, allowedOrders)

    const [fleets, total] = await Promise.all([
      this.fleetRepository.matching(criteria),
      this.fleetRepository.count(criteria)
    ])

    return {
      total,
      page: input.page,
      pageSize: input.pageSize,
      totalPages: getTotalPages({ pageSize: input.pageSize, total }),
      items: fleets.map(fleet => ({
        id: fleet.id,
        name: fleet.name,
        companyId: fleet.companyId,
        type: fleet.type,
        operationRegion: fleet.operationRegion,
        maintenanceBudget: fleet.maintenanceBudget,
        status: fleet.status
      }))
    }
  }
}
