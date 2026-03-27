import { Cursor } from 'src/modules/shared/domain/query/cursor'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { CursorSearchInput } from 'src/modules/shared/application/search-input.dto'
import { CursorPaginatedOutput } from 'src/modules/shared/application/search-output.dto'
import { SearchIssuesOutput } from './search-issues-output.dto'
import searchIssuesConfig from './search-issues-config'
import { IssueRepository } from '../../domain/issue.repository'

export default class SearchIssuesUseCase {
  constructor(private readonly issueRepository: IssueRepository) {}

  async invoke(input: CursorSearchInput): Promise<CursorPaginatedOutput<SearchIssuesOutput>> {
    const { allowedFilters, allowedOrders } = searchIssuesConfig

    const criteria = Criteria.fromCursor(input, allowedFilters, allowedOrders)
    const issues = await this.issueRepository.matching(criteria)

    const hasMore = issues.length > input.pageSize
    if (hasMore) {
      issues.pop()
    }

    const lastItem = issues[issues.length - 1]
    if (!lastItem) {
      return {
        nextCursor: null,
        hasMore: false,
        items: []
      }
    }

    const nextCursor = Cursor.encode(lastItem.id, criteria.filters, criteria.orders)

    return {
      nextCursor,
      hasMore,
      items: issues.map(issue => ({
        id: issue.id,
        code: issue.code,
        description: issue.description,
        severity: issue.severity,
        requiresGrounding: issue.requiresGrounding,
        partCategory: issue.partCategory,
        aircraftId: issue.aircraftId,
        engineId: issue.engineId
      }))
    }
  }
}
