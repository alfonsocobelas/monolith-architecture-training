import { OffsetSearchInput } from 'src/modules/shared/application/search-input.dto'

export class SearchFleetsInputMother {
  static firstPage(): OffsetSearchInput {
    return { page: 1, pageSize: 10, filters: [], orders: [] }
  }

  static onPage(page: number, pageSize: number = 10): OffsetSearchInput {
    return { page, pageSize, filters: [], orders: [] }
  }

  static onlyOperative(): OffsetSearchInput {
    const activeFilter = new Map([
      ['field', 'status'],
      ['operator', 'eq'],
      ['value', 'OPERATIVE']
    ])

    return { page: 1, pageSize: 10, filters: [activeFilter], orders: [] }
  }

  static sortByMaintenanceBudgetDesc(): OffsetSearchInput {
    const order = new Map([
      ['orderBy', 'maintenanceBudget'],
      ['orderType', 'desc']
    ])

    return { page: 1, pageSize: 10, filters: [], orders: [order] }
  }

  static activeInRegion(region: string): OffsetSearchInput {
    const regionFilter = new Map([
      ['field', 'operationRegion'],
      ['operator', 'eq'],
      ['value', region]
    ])

    const statusFilter = new Map([
      ['field', 'status'],
      ['operator', 'eq'],
      ['value', 'ACTIVE']
    ])

    return { page: 1, pageSize: 10, filters: [regionFilter, statusFilter], orders: [] }
  }

  static sortByBudgetAndRegion(): OffsetSearchInput {
    const budgetOrder = new Map([
      ['orderBy', 'maintenanceBudget'],
      ['orderType', 'desc']
    ])
    const regionOrder = new Map([
      ['orderBy', 'operationRegion'],
      ['orderType', 'asc']
    ])

    return { page: 1, pageSize: 10, filters: [], orders: [budgetOrder, regionOrder] }
  }

  static criticalBudgetOnSecondPage(): OffsetSearchInput {
    const budgetFilter = new Map([
      ['field', 'maintenanceBudget'],
      ['operator', 'lt'],
      ['value', '50000']
    ])

    const order = new Map([
      ['orderBy', 'maintenanceBudget'],
      ['orderType', 'asc']
    ])

    return { page: 2, pageSize: 5, filters: [budgetFilter], orders: [order] }
  }
}
