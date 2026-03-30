import { Injectable } from '@nestjs/common'
import { PaginateOffsetDto } from '../../dtos/shared/paginate-offset.dto'
import { SearchAircraftsResponse } from '../../dtos/aircrafts/search-aircrafts.response'

@Injectable()
export class SearchAircraftsHandler {
  constructor(
    // private readonly useCase: SearchAircraftsUseCase
  ) {}

  async run(dto: PaginateOffsetDto): Promise<SearchAircraftsResponse> {
    // Dummy response para pruebas
    return {
      total: 1,
      page: 1,
      pageSize: 10,
      totalPages: 1,
      items: [
        {
          id: 'dummy-id',
          modelId: 'dummy-model-id',
          tailNumber: 'EC-001',
          totalFlightHours: 1234,
          fuelLevelPercentage: 85,
          status: 'ACTIVE'
        }
      ]
    }
  }
}
