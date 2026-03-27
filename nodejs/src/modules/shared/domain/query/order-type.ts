import { InvalidArgumentError } from 'src/common/errors'

export enum OrderTypes {
  ASC = 'asc',
  DESC = 'desc'
}

const ORDER_TYPE_MAP = new Map<string, OrderTypes>(Object.values(OrderTypes).map(val => [val, val]))

export class OrderType {
  constructor(readonly value: OrderTypes) {
    if (!value) {
      throw new InvalidArgumentError('OrderType value cannot be empty')
    }
  }

  static fromValue(value: string): OrderType {
    const orderType = ORDER_TYPE_MAP.get(value)

    if (!orderType) {
      throw new InvalidArgumentError(`The order type ${value} is invalid`)
    }

    return new OrderType(orderType)
  }

  public isAsc(): boolean {
    return this.value === OrderTypes.ASC
  }

  public isDesc(): boolean {
    return this.value === OrderTypes.DESC
  }
}
