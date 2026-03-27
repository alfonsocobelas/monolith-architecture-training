import { CursorSearchInput } from 'src/modules/shared/application/search-input.dto'

export class SearchIssuesInputMother {
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
    const severityFilter = new Map([
      ['field', 'severity'],
      ['operator', 'eq'],
      ['value', 'high']
    ])

    return { pageSize: 10, filters: [severityFilter] }
  }

  static firstCallWithOrders(): CursorSearchInput {
    const order = new Map([
      ['orderBy', 'code'],
      ['orderType', 'asc']
    ])

    return { pageSize: 10, orders: [order] }
  }

  static firstCallWithFiltersAndOrders(): CursorSearchInput {
    const severityFilter = new Map([
      ['field', 'severity'],
      ['operator', 'eq'],
      ['value', 'high']
    ])

    const order = new Map([
      ['orderBy', 'code'],
      ['orderType', 'asc']
    ])

    return { pageSize: 10, filters: [severityFilter], orders: [order] }
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
    const severityFilter = new Map([
      ['field', 'severity'],
      ['operator', 'eq'],
      ['value', 'high']
    ])

    const partCategoryFilter = new Map([
      ['field', 'partCategory'],
      ['operator', 'eq'],
      ['value', 'engine']
    ])

    return { pageSize: 10, filters: [severityFilter, partCategoryFilter] }
  }

  static firstCallWithMultipleOrders(): CursorSearchInput {
    const order1 = new Map([
      ['orderBy', 'code'],
      ['orderType', 'asc']
    ])

    const order2 = new Map([
      ['orderBy', 'severity'],
      ['orderType', 'desc']
    ])

    return { pageSize: 10, orders: [order1, order2] }
  }

  static firstCallWithMultiple(): CursorSearchInput {
    const severityFilter = new Map([
      ['field', 'severity'],
      ['operator', 'eq'],
      ['value', 'high']
    ])

    const partCategoryFilter = new Map([
      ['field', 'partCategory'],
      ['operator', 'eq'],
      ['value', 'engine']
    ])

    const order1 = new Map([
      ['orderBy', 'code'],
      ['orderType', 'asc']
    ])

    const order2 = new Map([
      ['orderBy', 'severity'],
      ['orderType', 'desc']
    ])

    return { pageSize: 10, filters: [severityFilter, partCategoryFilter], orders: [order1, order2] }
  }

  static nextCallWithCursor(nextCursor: string): CursorSearchInput {
    return { pageSize: 10, cursor: nextCursor }
  }

  static nextCallWithInvalidCursor(): CursorSearchInput {
    const randomFilter = new Map([
      ['field', 'severity'],
      ['operator', 'eq'],
      ['value', 'high']
    ])

    const randomOrder = new Map([
      ['orderBy', 'code'],
      ['orderType', 'asc']
    ])

    const invalidCursor =
      'eyJpZCI6IjAxOWNmNmJkLWU4YzMtNzQxNS1hMjIzLWNlMmYzMWU0NTU0NSIsImNyZWF0ZWRBdCI6MTc3MzY2NjIzOTY0Mtt='
    return { pageSize: 10, cursor: invalidCursor, filters: [randomFilter], orders: [randomOrder] }
  }
}
