import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from '../controller'
import SearchAircraftsUseCase from 'src/modules/aircrafts/application/paginate/search-aircrafts-usecase.service'

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 10

export default class AircraftGetController implements Controller {
  constructor(private readonly searchService: SearchAircraftsUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const { page, pageSize } = req.query
    const filters = req.parsedFilters
    const orders = req.parsedOrders

    const paginateAircrafts = await this.searchService.invoke({
      filters: filters,
      orders: orders,
      page: Number(page) || DEFAULT_PAGE,
      pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE
    })

    res.status(httpStatus.OK).json(paginateAircrafts)
  }
}
