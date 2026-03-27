
import { NextFunction, Request, Response, Router } from 'express'
import { ContainerBuilder } from 'node-dependency-injection'
import { asyncHandler } from '../middlewares/async-handler.middleware'
import { validateReqSchema } from '../middlewares/schema-validator.middleware'
import { parsePaginatedOrders } from '../middlewares/parse-paginated-orders.middleware'
import { parsePaginatedFilters } from '../middlewares/parse-paginated-filters.middleware'
import { IdParamSchema } from '../schemas/shared/id-param.schema'
import { AircraftPostSchema } from '../schemas/aircrafts/aircraft-post.schema'
import { PaginateOffsetSchema } from '../schemas/shared/paginate-offset.schema'
import { ControllerNamespaces } from '../controllers/enums'
import AircraftPostController from '../controllers/aircrafts/aircraft-post.controller'
import AircraftGetByIdController from '../controllers/aircrafts/aircraft-get-by-id.controller'
import AircraftGetController from '../controllers/aircrafts/aircraft-get.controller'
import AircraftDeleteController from '../controllers/aircrafts/aircraft-delete.controller'
import AircraftPostInstallEngineController from '../controllers/aircrafts/aircraft-post-install-engine.controller'
import AircraftPostUninstallEngineController from '../controllers/aircrafts/aircraft-post-uninstall-engine.controller'

export const register = (router: Router, container: ContainerBuilder): void => {
  const postController: AircraftPostController = container.get(ControllerNamespaces.AircraftPostController)
  const getByIdController: AircraftGetByIdController = container.get(ControllerNamespaces.AircraftGetByIdController)
  const getController: AircraftGetController = container.get(ControllerNamespaces.AircraftGetController)
  const getMaintenanceController: AircraftGetController = container.get(
    ControllerNamespaces.AircraftGetMaintenanceController
  )
  const deleteController: AircraftDeleteController = container.get(ControllerNamespaces.AircraftDeleteController)
  const postInstallEngineController: AircraftPostInstallEngineController = container.get(
    ControllerNamespaces.AircraftInstallEngineController
  )
  const postUninstallEngineController: AircraftPostUninstallEngineController = container.get(
    ControllerNamespaces.AircraftUninstallEngineController
  )

  router.post(
    '/v1/aircrafts/:aircraftId/engines/:engineId/install',
    asyncHandler((req: Request, res: Response, next: NextFunction) => postInstallEngineController.run(req, res))
  )

  router.post(
    '/v1/aircrafts/:aircraftId/engines/:engineId/uninstall',
    asyncHandler((req: Request, res: Response, next: NextFunction) => postUninstallEngineController.run(req, res))
  )

  router.post(
    '/v1/aircrafts',
    validateReqSchema(AircraftPostSchema, 'body'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => postController.run(req, res))
  )

  router.get(
    '/v1/aircrafts/maintenance',
    asyncHandler((req: Request, res: Response, next: NextFunction) => getMaintenanceController.run(req, res))
  )

  router.get(
    '/v1/aircrafts/:id',
    validateReqSchema(IdParamSchema, 'params'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getByIdController.run(req, res))
  )

  // pagination
  router.get(
    '/v1/aircrafts',
    parsePaginatedFilters,
    parsePaginatedOrders,
    validateReqSchema(PaginateOffsetSchema, 'query'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getController.run(req, res))
  )

  router.delete(
    '/v1/aircrafts/:id',
    validateReqSchema(IdParamSchema, 'params'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => deleteController.run(req, res))
  )
}
