import { Request, Response, NextFunction } from 'express'
import { InvalidArgumentError } from 'src/common/errors'

type Order = { orderBy: string; orderType: string }

export function parsePaginatedOrders(req: Request, res: Response, next: NextFunction) {
  const orders = req.query.orders ? JSON.parse(req.query.orders as string) : undefined

  if (!orders) {
    return next()
  }

  if (!Array.isArray(orders)) {
    throw new InvalidArgumentError('Invalid orders format')
  }

  req.parsedOrders = orders.map(order => {
    const { orderBy, orderType } = order as unknown as Order

    if (!orderBy || !orderType) {
      throw new InvalidArgumentError('Invalid order format')
    }

    return new Map([
      ['orderBy', orderBy as string],
      ['orderType', orderType as string]
    ])
  })

  next()
}
