import { NextFunction, Request, Response, Router } from 'express'
import { ContainerBuilder } from 'node-dependency-injection'
import { asyncHandler } from '../middlewares/async-handler.middleware'
import { validateReqSchema } from '../middlewares/schema-validator.middleware'
import { parsePaginatedFilters } from '../middlewares/parse-paginated-filters.middleware'
import { parsePaginatedOrders } from '../middlewares/parse-paginated-orders.middleware'
import { IdParamSchema } from '../schemas/shared/id-param.schema'
import { PaginateOffsetSchema } from '../schemas/shared/paginate-offset.schema'
import { FleetPostSchema } from '../schemas/fleets/fleet-post.schema'
import { ControllerNamespaces } from '../controllers/enums'
import FleetPostController from '../controllers/fleets/fleet-post.controller'
import FleetGetByIdController from '../controllers/fleets/fleet-get-by-id.controller'
import FleetGetController from '../controllers/fleets/fleet-get.controller'

export const register = (router: Router, container: ContainerBuilder): void => {
  const postController: FleetPostController = container.get(ControllerNamespaces.FleetPostController)
  const getByIdController: FleetGetByIdController = container.get(ControllerNamespaces.FleetGetByIdController)
  const getController: FleetGetController = container.get(ControllerNamespaces.FleetGetController)

  router.post(
    '/v1/fleets',
    validateReqSchema(FleetPostSchema, 'body'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => postController.run(req, res))
  )

  router.get(
    '/v1/fleets/:id',
    validateReqSchema(IdParamSchema, 'params'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getByIdController.run(req, res))
  )

  // pagination
  router.get(
    '/v1/fleets',
    parsePaginatedFilters,
    parsePaginatedOrders,
    validateReqSchema(PaginateOffsetSchema, 'query'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getController.run(req, res))
  )
}
