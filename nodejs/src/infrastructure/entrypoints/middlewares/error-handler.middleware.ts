/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }

  if (err.status) {
    res.status(err.status).json({ name: err.name, message: err.message })
  } else {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'InternalServerError', message: 'An unexpected error occurred' })
  }
}
