import { SearchFleetOutput } from 'src/modules/fleets/application/paginate/search-fleets-output.dto'
import { OffsetSearchInput } from 'src/modules/shared/application/search-input.dto'
import { OffsetPaginatedOutput } from 'src/modules/shared/application/search-output.dto'
import { Fleet } from 'src/modules/fleets/domain/fleet'

export class SearchFleetsOutputMother {
  static fromDomain(
    items: Fleet[],
    total: number,
    input: OffsetSearchInput
  ): OffsetPaginatedOutput<SearchFleetOutput> {
    return {
      total,
      page: input.page,
      pageSize: input.pageSize,
      totalPages: Math.ceil(total / input.pageSize),
      items: items.map(fleet => ({
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
