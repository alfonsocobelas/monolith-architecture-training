import { OffsetPaginatedOutput } from 'src/modules/shared/application/search-output.dto'
import { OffsetSearchInput } from 'src/modules/shared/application/search-input.dto'
import { SearchAircraftOutput } from 'src/modules/aircrafts/application/paginate/search-aircrafts-output.dtos'
import { Aircraft } from 'src/modules/aircrafts/domain/aircraft'

export class SearchAircraftsOutputMother {
  static fromDomain(
    items: Aircraft[],
    total: number,
    input: OffsetSearchInput
  ): OffsetPaginatedOutput<SearchAircraftOutput> {
    return {
      total,
      page: input.page,
      pageSize: input.pageSize,
      totalPages: Math.ceil(total / input.pageSize),
      items: items.map(aircraft => ({
        id: aircraft.id,
        modelId: aircraft.modelId,
        tailNumber: aircraft.tailNumber,
        totalFlightHours: aircraft.totalFlightHours,
        fuelLevelPercentage: aircraft.fuelLevelPercentage,
        status: aircraft.status
      }))
    }
  }

  static empty(input: OffsetSearchInput): OffsetPaginatedOutput<SearchAircraftOutput> {
    return this.fromDomain([], 0, input)
  }
}
