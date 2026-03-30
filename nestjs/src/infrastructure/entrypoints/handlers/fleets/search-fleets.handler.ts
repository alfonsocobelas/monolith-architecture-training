import { Injectable } from '@nestjs/common'
import { SearchFleetsResponse } from '../../dtos/fleets/search-fleets.response'
import { PaginateOffsetDto } from '../../dtos/shared/paginate-offset.dto'

@Injectable()
export class SearchFleetsHandler {
  constructor(
  ) {}

  async run(dto: PaginateOffsetDto): Promise<SearchFleetsResponse> {
    return {
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
      items: [
        {
          id: 'dummy-id',
          name: 'Dummy Fleet',
          companyId: 'dummy-company-id',
          type: 'PASSENGER',
          operationRegion: 'EUROPE',
          maintenanceBudget: 1000000,
          status: 'ACTIVE'
        }
      ]
    }
  }
}
