interface PaginationParams {
  readonly pageSize: number
  readonly total: number
}

export function getTotalPages(params: PaginationParams): number {
  const { pageSize, total } = params
  return Math.ceil(total / pageSize)
}
