import 'express'

declare global {
  namespace Express {
    interface Request {
      parsedFilters?: Array<Map<string, string>>
      parsedOrders?: Array<Map<string, string>>
    }
  }
}

export {}
