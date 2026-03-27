import { CriteriaValidator } from './criteria-validator'
import { Filters } from './filters'
import { Orders } from './orders'
import { Cursor } from './cursor'
import { CursorSearchInput, OffsetSearchInput } from '../../application/search-input.dto'

interface CriteriaParams {
  filters?: Filters
  orders?: Orders
  cursor?: Cursor
  offset?: number
  limit?: number
}
// todo: añadir joins
export class Criteria {
  readonly filters?: Filters
  readonly orders?: Orders
  readonly cursor?: Cursor
  readonly offset?: number
  readonly limit?: number

  constructor(params: CriteriaParams) {
    this.filters = params.filters
    this.orders = params.orders
    this.offset = params.offset
    this.cursor = params.cursor
    this.limit = params.limit
  }

  static fromCursor(input: CursorSearchInput, allowedFilters: string[], allowedOrders: string[]): Criteria {
    const { filters, orders, cursor, pageSize } = input
    let criteriaFilters, criteriaOrders, decodedCursor

    if (filters && filters.length) {
      criteriaFilters = Filters.fromValues(filters)
      CriteriaValidator.validateFilters(criteriaFilters, allowedFilters)
    }

    if (orders && orders.length) {
      const cursorOrder = new Map([['orderBy', 'id'], ['orderType', 'asc']])
      criteriaOrders = Orders.fromValues([...orders, cursorOrder])
      CriteriaValidator.validateOrders(criteriaOrders, allowedOrders)
    }

    if (cursor) {
      decodedCursor = Cursor.decode(cursor, criteriaFilters, criteriaOrders)
    }

    return new Criteria({
      filters: criteriaFilters,
      orders: criteriaOrders,
      cursor: decodedCursor,
      limit: pageSize + 1
    })
  }

  static fromOffset(input: OffsetSearchInput, allowedFilters: string[], allowedOrders: string[]): Criteria {
    const { filters, orders, page, pageSize } = input
    let criteriaFilters, criteriaOrders

    if (filters && filters.length) {
      criteriaFilters = Filters.fromValues(filters)
      CriteriaValidator.validateFilters(criteriaFilters, allowedFilters)
    }

    if (orders && orders.length) {
      criteriaOrders = Orders.fromValues(orders)
      CriteriaValidator.validateOrders(criteriaOrders, allowedOrders)
    }

    const offset = (page - 1) * pageSize

    return new Criteria({
      filters: criteriaFilters,
      orders: criteriaOrders,
      limit: pageSize,
      offset
    })
  }

  hasFilters(): boolean {
    if (!this.filters) {
      return false
    }

    return this.filters.filters.length > 0
  }

  hasOrders(): boolean {
    if (!this.orders) {
      return false
    }

    return this.orders.orders.length > 0
  }
}
