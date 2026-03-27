export interface BaseSearchInput {
  readonly pageSize: number
  readonly filters?: Array<Map<string, string>>
  readonly orders?: Array<Map<string, string>>
}

export interface CursorSearchInput extends BaseSearchInput {
  readonly cursor?: string
}

export interface OffsetSearchInput extends BaseSearchInput {
  readonly page: number
}
