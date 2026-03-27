import { CursorSearchInput } from 'src/modules/shared/application/search-input.dto'

export class SearchEnginesInputMother {
  static firstCall(): CursorSearchInput {
    return { pageSize: 10 }
  }

  static lastCall(
    nextCursor: string,
    pageSize: number,
    filters?: Array<Map<string, string>>,
    orders?: Array<Map<string, string>>
  ): CursorSearchInput {
    return { pageSize, cursor: nextCursor, filters, orders }
  }

  static firstCallWithFilters(): CursorSearchInput {
    const healthScoreFilter = new Map([
      ['field', 'healthScore'],
      ['operator', 'gt'],
      ['value', '80']
    ])

    return { pageSize: 10, filters: [healthScoreFilter] }
  }

  static firstCallWithOrders(): CursorSearchInput {
    const order = new Map([
      ['orderBy', 'flyingHoursAccumulated'],
      ['orderType', 'desc']
    ])

    return { pageSize: 10, orders: [order] }
  }

  static firstCallWithFiltersAndOrders(): CursorSearchInput {
    const healthScoreFilter = new Map([
      ['field', 'healthScore'],
      ['operator', 'gt'],
      ['value', '80']
    ])

    const order = new Map([
      ['orderBy', 'flyingHoursAccumulated'],
      ['orderType', 'desc']
    ])

    return { pageSize: 10, filters: [healthScoreFilter], orders: [order] }
  }

  static firstCallWithInvalidFilter(): CursorSearchInput {
    const invalidFilter = new Map([
      ['field', 'invalidField'],
      ['operator', 'eq'],
      ['value', 'someValue']
    ])

    return { pageSize: 10, filters: [invalidFilter] }
  }

  static firstCallWithInvalidOrder(): CursorSearchInput {
    const invalidOrder = new Map([
      ['orderBy', 'invalidField'],
      ['orderType', 'asc']
    ])

    return { pageSize: 10, orders: [invalidOrder] }
  }

  static firstCallWithMultipleFilters(): CursorSearchInput {
    const healthScoreFilter = new Map([
      ['field', 'healthScore'],
      ['operator', 'gt'],
      ['value', '80']
    ])
    const statusFilter = new Map([
      ['field', 'status'],
      ['operator', 'eq'],
      ['value', 'OPERATIONAL']
    ])

    return { pageSize: 10, filters: [healthScoreFilter, statusFilter] }
  }

  static firstCallWithMultipleOrders(): CursorSearchInput {
    const order1 = new Map([
      ['orderBy', 'flyingHoursAccumulated'],
      ['orderType', 'desc']
    ])
    const order2 = new Map([
      ['orderBy', 'healthScore'],
      ['orderType', 'asc']
    ])

    return { pageSize: 10, orders: [order1, order2] }
  }

  static firstCallWithMultiple(): CursorSearchInput {
    const healthScoreFilter = new Map([
      ['field', 'healthScore'],
      ['operator', 'gt'],
      ['value', '80']
    ])
    const statusFilter = new Map([
      ['field', 'status'],
      ['operator', 'eq'],
      ['value', 'OPERATIONAL']
    ])
    const order1 = new Map([
      ['orderBy', 'flyingHoursAccumulated'],
      ['orderType', 'desc']
    ])
    const order2 = new Map([
      ['orderBy', 'healthScore'],
      ['orderType', 'asc']
    ])

    return { pageSize: 10, filters: [healthScoreFilter, statusFilter], orders: [order1, order2] }
  }

  static nextCallWithCursor(
    nextCursor: string,
    filters?: Array<Map<string, string>>,
    orders?: Array<Map<string, string>>
  ): CursorSearchInput {
    return { pageSize: 10, cursor: nextCursor, filters, orders }
  }

  static nextCallWithInvalidCursor(): CursorSearchInput {
    const randomFilter = new Map([
      ['field', 'healthScore'],
      ['operator', 'gt'],
      ['value', '80']
    ])

    const randomOrder = new Map([
      ['orderBy', 'flyingHoursAccumulated'],
      ['orderType', 'desc']
    ])

    const invalidCursor =
      'eyJpZCI6IjAxOWNmNmJkLWU4YzMtNzQxNS1hMjIzLWNlMmYzMWU0NTU0NSIsImNyZWF0ZWRBdCI6MTc3MzY2NjIzOTY0Mtt='
    return { pageSize: 10, cursor: invalidCursor, filters: [randomFilter], orders: [randomOrder] }
  }
}
