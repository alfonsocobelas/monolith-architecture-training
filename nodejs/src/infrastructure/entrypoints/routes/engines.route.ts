import { NextFunction, Request, Response, Router } from 'express'
import { ContainerBuilder } from 'node-dependency-injection'
import { asyncHandler } from '../middlewares/async-handler.middleware'
import { validateReqSchema } from '../middlewares/schema-validator.middleware'
import { parsePaginatedFilters } from '../middlewares/parse-paginated-filters.middleware'
import { parsePaginatedOrders } from '../middlewares/parse-paginated-orders.middleware'
import { IdParamSchema } from '../schemas/shared/id-param.schema'
import { EnginePostSchema } from '../schemas/engines/engine-post.schema'
import { PaginateCursorSchema } from '../schemas/shared/paginate-cursor.schema'
import { ControllerNamespaces } from '../controllers/enums'
import EnginePostController from '../controllers/engines/engine-post.controller'
import EngineGetByIdController from '../controllers/engines/engine-get-by-id.controller'
import EngineGetController from '../controllers/engines/engine-get.controller'

export const register = (router: Router, container: ContainerBuilder): void => {
  const postController: EnginePostController = container.get(ControllerNamespaces.EnginePostController)
  const getByIdController: EngineGetByIdController = container.get(ControllerNamespaces.EngineGetByIdController)
  const getController: EngineGetController = container.get(ControllerNamespaces.EngineGetController)

  router.post(
    '/v1/engines',
    validateReqSchema(EnginePostSchema, 'body'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => postController.run(req, res))
  )

  router.get(
    '/v1/engines/:id',
    validateReqSchema(IdParamSchema, 'params'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getByIdController.run(req, res))
  )

  // pagination
  router.get(
    '/v1/engines',
    parsePaginatedFilters,
    parsePaginatedOrders,
    validateReqSchema(PaginateCursorSchema, 'query'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getController.run(req, res))
  )
}
