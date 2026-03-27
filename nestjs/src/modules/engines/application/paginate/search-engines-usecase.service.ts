import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Cursor } from 'src/modules/shared/domain/query/cursor'
import { CursorSearchInput } from 'src/modules/shared/application/search-input.dto'
import { CursorPaginatedOutput } from 'src/modules/shared/application/search-output.dto'
import { SearchEnginesOutput } from './search-engines-output.dto'
import { EngineRepository } from '../../domain/engine.repository'
import searchEnginesConfig from './search-engines-config'

export class SearchEnginesUseCase {
  constructor(
    private readonly engineRepository: EngineRepository
  ) {}

  async invoke(input: CursorSearchInput): Promise<CursorPaginatedOutput<SearchEnginesOutput>> {
    const { allowedFilters, allowedOrders } = searchEnginesConfig

    const criteria = Criteria.fromCursor(input, allowedFilters, allowedOrders)
    const engines = await this.engineRepository.matching(criteria)

    const hasMore = engines.length > input.pageSize
    if (hasMore) {
      engines.pop()
    }

    const lastItem = engines[engines.length - 1]
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
      items: engines.map(engine => ({
        id: engine.id,
        serialNumber: engine.serialNumber,
        healthScore: engine.healthScore,
        flyingHoursAccumulated: engine.flyingHoursAccumulated,
        cyclesSinceLastOverhaul: engine.cyclesSinceLastOverhaul,
        status: engine.status
      }))
    }
  }
}
