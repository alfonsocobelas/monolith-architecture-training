import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Cursor } from 'src/modules/shared/domain/query/cursor'

interface Identifiable {
  id: string
}

export async function paginateWithCursor<T extends Identifiable, K>(
  criteria: Criteria,
  repository: { matching: (criteria: Criteria) => Promise<T[]> },
  pageSize: number,
  mapFn: (item: T) => K
): Promise<{ nextCursor: string | null; hasMore: boolean; items: K[] }> {
  const items = await repository.matching(criteria)

  const hasMore = items.length > pageSize
  if (hasMore) {
    items.pop()
  }

  const lastItem = items[items.length - 1]
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
    items: items.map(mapFn)
  }
}
