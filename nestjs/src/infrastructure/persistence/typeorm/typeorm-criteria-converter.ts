import { Injectable } from '@nestjs/common'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Filter } from 'src/modules/shared/domain/query/filter'
import { Filters } from 'src/modules/shared/domain/query/filters'
import { Orders } from 'src/modules/shared/domain/query/orders'
import { Operator } from 'src/modules/shared/domain/query/filter-operator'

type TypeOrmFilterValue = string | number | boolean
type TypeOrmFilter = {
  query: string
  params: Record<string, TypeOrmFilterValue>
}
type TypeOrmSortTypes = 'ASC' | 'DESC'
type TypeOrmSort = Record<string, TypeOrmSortTypes>
type TypeOrmQuery = {
  filter?: TypeOrmFilter
  cursor?: TypeOrmFilter
  sort?: TypeOrmSort
  skip?: number
  limit?: number
}

interface TransformerFunction<T, K> {
  (value: T): K
}

@Injectable()
export class TypeOrmCriteriaConverter {
  private filterTransformers: Map<Operator, TransformerFunction<Filter, TypeOrmFilter>>

  constructor() {
    this.filterTransformers = new Map([
      [Operator.EQUAL, this.equalFilter],
      [Operator.NOT_EQUAL, this.notEqualFilter],
      [Operator.IN, this.inFilter],
      [Operator.GT, this.greaterThanFilter],
      [Operator.GTE, this.greaterThanOrEqualFilter],
      [Operator.LT, this.lowerThanFilter],
      [Operator.LTE, this.lowerThanOrEqualFilter],
      [Operator.CONTAINS, this.containsFilter],
      [Operator.NOT_CONTAINS, this.notContainsFilter]
    ])
  }

  buildQuery(criteria: Criteria): TypeOrmQuery {
    let filter, cursor, limit, sort, skip

    if (criteria.hasFilters()) {
      filter = this.generateFilter(criteria.filters!)
    }

    if (criteria.hasOrders()) {
      sort = this.generateSort(criteria.orders!)
    }

    if (criteria.cursor) {
      cursor = this.generateCursor(criteria.cursor.value)
    }

    if (criteria.offset) {
      skip = criteria.offset
    }

    if (criteria.limit) {
      limit = criteria.limit
    }

    return { filter, cursor, sort, skip, limit }
  }

  private generateFilter(filters: Filters): TypeOrmFilter {
    const queryParts: string[] = []
    const params: Record<string, TypeOrmFilterValue> = {}

    filters.filters.forEach(filter => {
      const transformer = this.filterTransformers.get(filter.operator.value)

      if (!transformer) {
        throw new Error(`Unsupported operator: ${filter.operator.value}`)
      }

      const result = transformer(filter)

      queryParts.push(result.query)
      Object.assign(params, result.params)
    })

    return {
      query: queryParts.join(' AND '),
      params
    }
  }

  private generateSort(orders: Orders): TypeOrmSort {
    const sort: Record<string, TypeOrmSortTypes> = {}

    orders.orders.forEach(order => {
      const direction = order.orderType.isAsc() ? 'ASC' : 'DESC'
      Object.assign(sort, { [`entity.${order.orderBy.value}`]: direction })
    })

    return sort
  }

  private generateCursor(cursor: string): TypeOrmFilter {
    return {
      query: 'entity.id > :cursor',
      params: { cursor }
    }
  }

  private equalFilter(filter: Filter): TypeOrmFilter {
    return {
      query: `entity.${filter.field.value} = :${filter.field.value}`,
      params: { [filter.field.value]: filter.value.value }
    }
  }

  private notEqualFilter(filter: Filter): TypeOrmFilter {
    return {
      query: `entity.${filter.field.value} != :${filter.field.value}`,
      params: { [filter.field.value]: filter.value.value }
    }
  }

  private inFilter(filter: Filter): TypeOrmFilter {
    return {
      query: `entity.${filter.field.value} IN (:...${filter.field.value})`,
      params: { [filter.field.value]: filter.value.value }
    }
  }

  private greaterThanFilter(filter: Filter): TypeOrmFilter {
    return {
      query: `entity.${filter.field.value} > :${filter.field.value}`,
      params: { [filter.field.value]: filter.value.value }
    }
  }

  private greaterThanOrEqualFilter(filter: Filter): TypeOrmFilter {
    return {
      query: `entity.${filter.field.value} >= :${filter.field.value}`,
      params: { [filter.field.value]: filter.value.value }
    }
  }

  private lowerThanFilter(filter: Filter): TypeOrmFilter {
    return {
      query: `entity.${filter.field.value} < :${filter.field.value}`,
      params: { [filter.field.value]: filter.value.value }
    }
  }

  private lowerThanOrEqualFilter(filter: Filter): TypeOrmFilter {
    return {
      query: `entity.${filter.field.value} <= :${filter.field.value}`,
      params: { [filter.field.value]: filter.value.value }
    }
  }

  private containsFilter(filter: Filter): TypeOrmFilter {
    return {
      query: `entity.${filter.field.value} ILIKE :${filter.field.value}`,
      params: { [filter.field.value]: `%${filter.value.value}%` }
    }
  }

  private notContainsFilter(filter: Filter): TypeOrmFilter {
    return {
      query: `entity.${filter.field.value} NOT ILIKE :${filter.field.value}`,
      params: { [filter.field.value]: `%${filter.value.value}%` }
    }
  }
}
