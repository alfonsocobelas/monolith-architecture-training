/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { plainToInstance } from 'class-transformer'
import { validate, ValidationError } from 'class-validator'
import { InvalidRequestError } from 'src/common/errors'

export function validateReqSchema(dtoClass: any, source: 'body' | 'params' | 'query' = 'body') {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = plainToInstance(dtoClass, req[source])
      const validationErrors = await validate(dto)

      if (validationErrors.length) {
        const formattedErrors = getFormattedErrors(validationErrors)
        const error = new InvalidRequestError('Invalid request data', formattedErrors)

        return next(error)
      }

      next()
    } catch (error) {
      return next(error)
    }
  }
}

function getFormattedErrors(errors: ValidationError[]): any[] {
  return errors.flatMap((err: ValidationError) =>
    Object.values(err.constraints || {}).map(msg => ({ [err.property]: msg }))
  )
}
