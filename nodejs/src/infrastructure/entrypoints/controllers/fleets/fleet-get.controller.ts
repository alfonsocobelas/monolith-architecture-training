import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from '../controller'
import SearchFleetsUseCase from 'src/modules/fleets/application/paginate/search-fleets-usecase.service'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

export default class FleetGetController implements Controller {
  constructor(private readonly searchFleets: SearchFleetsUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const { page, pageSize } = req.query
    const filters = req.parsedFilters
    const orders = req.parsedOrders

    const paginateFleets = await this.searchFleets.invoke({
      filters: filters,
      orders: orders,
      page: Number(page) || DEFAULT_PAGE,
      pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE
    })

    res.status(httpStatus.OK).json(paginateFleets)
  }
}
