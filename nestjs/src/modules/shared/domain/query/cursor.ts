import { InvalidArgumentError } from 'src/common/errors'
import { Encoding } from 'src/common/enums'
import { Filters } from './filters'
import * as crypto from 'crypto'
import { Orders } from './orders'

interface CursorMetadata {
  id: string;
  filtersHash?: string;
  ordersHash?: string;
  createdAt: number;
}

// todo: en el siguiente proyecto que use graph vamos a usar “Relay/GraphQL”
export class Cursor {
  private static readonly EXPIRATION_TIME_MS = 24 * 60 * 60 * 1000

  constructor(
    readonly value: string
  ) {}

  static decode(cursor: string, filters?: Filters, orders?: Orders): Cursor {
    const metadata = this.getMetadata(cursor)

    this.ensureIsNotExpired(metadata.createdAt)

    if (filters) {
      this.ensureFiltersMatch(metadata.filtersHash, filters)
    }

    if (orders) {
      this.ensureOrdersMatch(metadata.ordersHash, orders)
    }

    return new Cursor(metadata.id)
  }

  static encode(id: string, filters?: Filters, orders?: Orders): string {
    const filtersHash = filters ? this.generateFiltersHash(filters) : undefined
    const ordersHash = orders ? this.generateOrdersHash(orders) : undefined

    const metadata: CursorMetadata = {
      id,
      filtersHash,
      ordersHash,
      createdAt: Date.now()
    }

    const metadataSerialized = JSON.stringify(metadata)

    return Buffer.from(metadataSerialized, Encoding.UTF8).toString(Encoding.BASE64)
  }

  private static getMetadata(cursor: string): CursorMetadata {
    try {
      const raw = Buffer.from(cursor, Encoding.BASE64).toString(Encoding.UTF8)
      const metadata = JSON.parse(raw)

      if (!metadata.id || !metadata.createdAt) {
        throw new InvalidArgumentError('Invalid cursor format')
      }

      return metadata
    } catch (error) {
      throw new InvalidArgumentError('Invalid cursor format')
    }
  }

  private static ensureIsNotExpired(createdAt: number): void {
    const isExpired = Date.now() - createdAt > this.EXPIRATION_TIME_MS

    if (isExpired) {
      throw new InvalidArgumentError('Cursor is expired')
    }
  }

  private static ensureFiltersMatch(metadataFiltersHash: string | undefined, filters: Filters): void {
    const currentHash = this.generateFiltersHash(filters)

    if (metadataFiltersHash !== currentHash) {
      throw new InvalidArgumentError('Cursor filters do not match current filters')
    }
  }

  private static ensureOrdersMatch(metadataOrdersHash: string | undefined, orders: Orders): void {
    const currentHash = this.generateOrdersHash(orders)

    if (metadataOrdersHash !== currentHash) {
      throw new InvalidArgumentError('Cursor orders do not match current orders')
    }
  }

  private static generateFiltersHash(filters: Filters): string {
    const deterministicFilters = [...filters.filters].sort((a, b) =>
      a.field.value.localeCompare(b.field.value)
    )

    const serializedFilters = JSON.stringify(deterministicFilters)

    return crypto
      .createHash('sha256')
      .update(serializedFilters)
      .digest(Encoding.BASE64)
  }

  private static generateOrdersHash(orders: Orders): string {
    const sortedOrders = [...orders.orders].sort((a, b) =>
      a.orderBy.value.localeCompare(b.orderBy.value)
    )

    const serializedOrders = JSON.stringify(
      sortedOrders.map(o => ({
        field: o.orderBy.value,
        direction: o.orderType.value
      }))
    )
    return crypto
      .createHash('sha256')
      .update(serializedOrders)
      .digest(Encoding.BASE64)
  }
}
