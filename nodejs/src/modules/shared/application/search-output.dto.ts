import { Nullable } from 'src/common/nullable'

interface BaseSearchOutput<T> {
  readonly items: T[]
}

export interface CursorPaginatedOutput<T> extends BaseSearchOutput<T> {
  readonly hasMore: boolean
  readonly nextCursor: Nullable<string>
}

export interface OffsetPaginatedOutput<T> extends BaseSearchOutput<T> {
  readonly total: number
  readonly page: number
  readonly pageSize: number
  readonly totalPages: number
}
