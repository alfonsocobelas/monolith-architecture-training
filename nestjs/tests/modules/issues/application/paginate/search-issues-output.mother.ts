import { SearchIssuesOutput } from 'src/modules/issues/application/paginate/search-issues-output.dto'
import { CursorPaginatedOutput } from 'src/modules/shared/application/search-output.dto'
import { Issue } from 'src/modules/issues/domain/issue'

export class SearchIssuesOutputMother {
  static fromDomain(
    items: Issue[],
    hasMore: boolean,
    nextCursor: string | null
  ): CursorPaginatedOutput<SearchIssuesOutput> {
    return {
      nextCursor,
      hasMore,
      items: items.map(issue => ({
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

  static empty(): CursorPaginatedOutput<SearchIssuesOutput> {
    return this.fromDomain([], false, null)
  }
}
