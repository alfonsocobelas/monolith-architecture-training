import { OffsetSearchInput } from 'src/modules/shared/application/search-input.dto'

export class SearchAircraftsInputMother {
  static firstPage(): OffsetSearchInput {
    return { page: 1, pageSize: 10, filters: [], orders: [] }
  }

  static onPage(page: number, pageSize: number = 10): OffsetSearchInput {
    return { page, pageSize, filters: [], orders: [] }
  }

  static onlyActive(): OffsetSearchInput {
    const activeFilter = new Map([
      ['field', 'status'],
      ['operator', 'eq'],
      ['value', 'ACTIVE']
    ])

    return { page: 1, pageSize: 10, filters: [activeFilter], orders: [] }
  }

  static sortByMostFlown(): OffsetSearchInput {
    const order = new Map([
      ['orderBy', 'totalFlightHours'],
      ['orderType', 'desc']
    ])

    return { page: 1, pageSize: 10, filters: [], orders: [order] }
  }

  static criticalFuelOnSecondPage(): OffsetSearchInput {
    const fuelFilter = new Map([
      ['field', 'fuelLevelPercentage'],
      ['operator', 'lt'],
      ['value', '15']
    ])

    const order = new Map([
      ['orderBy', 'fuelLevelPercentage'],
      ['orderType', 'asc']
    ])

    return { page: 2, pageSize: 5, filters: [fuelFilter], orders: [order] }
  }

  static lowFuelAndActive(): OffsetSearchInput {
    const fuelFilter = new Map([
      ['field', 'fuelLevelPercentage'],
      ['operator', 'lt'],
      ['value', '20']
    ])

    const statusFilter = new Map([
      ['field', 'status'],
      ['operator', 'eq'],
      ['value', 'ACTIVE']
    ])

    return { page: 1, pageSize: 5, filters: [fuelFilter, statusFilter], orders: [] }
  }

  static sortByHoursAndFuel(): OffsetSearchInput {
    const hoursOrder = new Map([
      ['orderBy', 'totalFlightHours'],
      ['orderType', 'desc']
    ])
    const fuelOrder = new Map([
      ['orderBy', 'fuelLevelPercentage'],
      ['orderType', 'asc']
    ])

    return { page: 1, pageSize: 10, filters: [], orders: [hoursOrder, fuelOrder] }
  }

  static sortByHoursDesc(): OffsetSearchInput {
    const orders = new Map([
      ['orderBy', 'totalFlightHours'],
      ['orderType', 'desc']
    ])
    return {
      page: 1,
      pageSize: 10,
      filters: [],
      orders: [orders]
    }
  }

  static withInvalidFilterField(): OffsetSearchInput {
    const invalidFilter = new Map([
      ['field', 'non_existent_field'],
      ['operator', 'eq'],
      ['value', 'test']
    ])

    return { page: 1, pageSize: 10, filters: [invalidFilter], orders: [] }
  }

  static withInvalidOrderField(): OffsetSearchInput {
    const invalidOrder = new Map([
      ['orderBy', 'non_existent_field'],
      ['orderType', 'asc']
    ])

    return { page: 1, pageSize: 10, filters: [], orders: [invalidOrder] }
  }
}
