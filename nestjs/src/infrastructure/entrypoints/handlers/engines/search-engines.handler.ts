import { Injectable } from '@nestjs/common'
import { SearchEnginesResponse } from '../../dtos/engines/search-engines.response'
import { PaginateCursorDto } from '../../dtos/shared/paginate-cursor.dto'

@Injectable()
export class SearchEnginesHandler {
  constructor(
  ) {}

  async run(dto: PaginateCursorDto): Promise<SearchEnginesResponse> {
    return {
      hasMore: false,
      nextCursor: null,
      items: [
        {
          id: 'dummy-id',
          serialNumber: 'SN-001',
          healthScore: 85,
          flyingHoursAccumulated: 1234,
          cyclesSinceLastOverhaul: 50,
          status: 'ACTIVE'
        }
      ]
    }
  }
}
