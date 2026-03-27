import { InvalidArgumentError } from 'src/common/errors'
import { OrderBy } from './order-by'
import { OrderType } from './order-type'

export class Order {
  readonly orderBy: OrderBy
  readonly orderType: OrderType

  constructor(orderBy: OrderBy, orderType: OrderType) {
    this.orderBy = orderBy
    this.orderType = orderType
  }

  static fromValues(value: Map<string, string>): Order {
    const orderBy = value.get('orderBy')
    const orderType = value.get('orderType')

    if (!orderBy || !orderType) {
      throw new InvalidArgumentError('Invalid order values')
    }

    return new Order(
      new OrderBy(orderBy),
      OrderType.fromValue(orderType)
    )
  }
}
