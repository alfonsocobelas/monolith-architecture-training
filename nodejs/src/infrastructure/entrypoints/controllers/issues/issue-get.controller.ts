import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import SearchIssuesUseCase from 'src/modules/issues/application/paginate/search-issues-usecase.service'

const DEFAULT_PAGE_SIZE = 10

export default class IssueGetController implements Controller {
  constructor(private readonly searchIssues: SearchIssuesUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const { cursor, pageSize } = req.query
    const filters = req.parsedFilters
    const orders = req.parsedOrders

    const paginateIssues = await this.searchIssues.invoke({
      filters: filters,
      orders: orders,
      cursor: cursor ? String(cursor) : undefined,
      pageSize: Number(pageSize) || DEFAULT_PAGE_SIZE
    })

    res.status(httpStatus.OK).json(paginateIssues)
  }
}
