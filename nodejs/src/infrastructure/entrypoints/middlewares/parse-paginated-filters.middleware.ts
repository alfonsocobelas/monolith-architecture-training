import { Request, Response, NextFunction } from 'express'
import { InvalidArgumentError } from 'src/common/errors'

type FilterType = { value: string; operator: string; field: string }

export function parsePaginatedFilters(req: Request, res: Response, next: NextFunction) {
  const filters = req.query.filters ? JSON.parse(req.query.filters as string) : undefined

  if (!filters) {
    return next()
  }

  if (!Array.isArray(filters)) {
    throw new InvalidArgumentError('Invalid filters format')
  }

  req.parsedFilters = filters.map(filter => {
    const { field, operator, value } = filter as unknown as FilterType

    if (!field || !operator || !value) {
      throw new InvalidArgumentError('Invalid filters format')
    }

    return new Map([
      ['field', field],
      ['operator', operator],
      ['value', value]
    ])
  })

  next()
}
