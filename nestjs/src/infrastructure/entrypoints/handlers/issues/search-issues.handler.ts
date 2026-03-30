import { Injectable } from '@nestjs/common'
import { PaginateCursorDto } from '../../dtos/shared/paginate-cursor.dto'
import { SearchIssuesResponse } from '../../dtos/issues/search-issues.response'

@Injectable()
export class SearchIssuesHandler {
  constructor(
  ) {}

  async run(dto: PaginateCursorDto): Promise<SearchIssuesResponse> {
    return {
      hasMore: false,
      nextCursor: null,
      items: [
        {
          id: 'dummy-id',
          code: 'ISSUE-001',
          description: 'Dummy issue description',
          severity: 'HIGH',
          requiresGrounding: true,
          partCategory: 'ENGINE',
          aircraftId: 'dummy-aircraft-id',
          engineId: 'dummy-engine-id'
        }
      ]
    }
  }
}
