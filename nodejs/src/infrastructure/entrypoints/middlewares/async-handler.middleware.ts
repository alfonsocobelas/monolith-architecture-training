/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction, RequestHandler } from 'express'

export function asyncHandler(
  handler: (req: Request, res: Response, next: NextFunction) => Promise<any>
): RequestHandler {
  return async function (req, res, next) {
    try {
      await handler(req, res, next)
    } catch (err) {
      next(err)
    }
  }
}
