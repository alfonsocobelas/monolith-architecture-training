import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import SearchEnginesUseCase from 'src/modules/engines/application/paginate/search-engines-usecase.service'

const DEFAULT_PAGE_SIZE = 10

export default class EngineGetController implements Controller {
  constructor(private readonly searchEngines: SearchEnginesUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const { cursor, pageSize } = req.query
    const filters = req.parsedFilters
    const orders = req.parsedOrders

    const paginateEngines = await this.searchEngines.invoke({
      filters: filters,
      orders: orders,
      cursor: cursor ? String(cursor) : undefined,
      pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE
    })

    res.status(httpStatus.OK).json(paginateEngines)
  }
}
