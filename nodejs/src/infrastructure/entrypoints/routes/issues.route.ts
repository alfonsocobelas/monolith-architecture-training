import { NextFunction, Request, Response, Router } from 'express'
import { ContainerBuilder } from 'node-dependency-injection'
import { parsePaginatedFilters } from '../middlewares/parse-paginated-filters.middleware'
import { parsePaginatedOrders } from '../middlewares/parse-paginated-orders.middleware'
import { validateReqSchema } from '../middlewares/schema-validator.middleware'
import { asyncHandler } from '../middlewares/async-handler.middleware'
import { PaginateCursorSchema } from '../schemas/shared/paginate-cursor.schema'
import { IdParamSchema } from '../schemas/shared/id-param.schema'
import { IssuePostSchema } from '../schemas/issues/issue-post.schema'
import { ControllerNamespaces } from '../controllers/enums'
import IssuePostController from '../controllers/issues/issue-post.controller'
import IssueGetByIdController from '../controllers/issues/issue-get-by-id.controller'
import IssueGetController from '../controllers/issues/issue-get.controller'

export const register = (router: Router, container: ContainerBuilder): void => {
  const putController: IssuePostController = container.get(ControllerNamespaces.IssuePostController)
  const getByIdController: IssueGetByIdController = container.get(ControllerNamespaces.IssueGetByIdController)
  const getController: IssueGetController = container.get(ControllerNamespaces.IssueGetController)

  router.post(
    '/v1/issues',
    validateReqSchema(IssuePostSchema, 'body'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => putController.run(req, res))
  )

  // pagination
  router.get(
    '/v1/issues',
    parsePaginatedFilters,
    parsePaginatedOrders,
    validateReqSchema(PaginateCursorSchema, 'query'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getController.run(req, res))
  )

  router.get(
    '/v1/issues/:id',
    validateReqSchema(IdParamSchema, 'params'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getByIdController.run(req, res))
  )
}
