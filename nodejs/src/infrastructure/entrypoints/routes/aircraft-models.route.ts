
import { NextFunction, Request, Response, Router } from 'express'
import { ContainerBuilder } from 'node-dependency-injection'
import { asyncHandler } from '../middlewares/async-handler.middleware'
import { validateReqSchema } from '../middlewares/schema-validator.middleware'
import { IdParamSchema } from '../schemas/shared/id-param.schema'
import { AircraftModelPostSchema } from '../schemas/aircraft-models/aircraft-model-post.schema'
import { ControllerNamespaces } from '../controllers/enums'
import AircraftModelPostController from '../controllers/aircraft-models/aircraft-model-post.controller'
import AircraftModelGetByIdController from '../controllers/aircraft-models/aircraft-model-get-by-id.controller'
import AircraftModelGetCatalogueController from '../controllers/aircraft-models/aircraft-model-get-catalogue.controller'
import AircraftModelDeleteController from '../controllers/aircraft-models/aircraft-model-delete.controller'

export const register = (router: Router, container: ContainerBuilder): void => {
  const postController: AircraftModelPostController = container.get(ControllerNamespaces.AircraftModelPostController)
  const getByIdController: AircraftModelGetByIdController = container.get(
    ControllerNamespaces.AircraftModelGetByIdController
  )
  const getCatalogueController: AircraftModelGetCatalogueController = container.get(
    ControllerNamespaces.AircraftModelGetCatalogueController
  )
  const deleteController: AircraftModelDeleteController = container.get(
    ControllerNamespaces.AircraftModelDeleteController
  )

  router.post(
    '/v1/aircraft-models',
    validateReqSchema(AircraftModelPostSchema, 'body'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => postController.run(req, res))
  )

  router.get(
    '/v1/aircraft-models/catalogue',
    asyncHandler((req: Request, res: Response, next: NextFunction) => getCatalogueController.run(req, res))
  )

  router.get(
    '/v1/aircraft-models/:id',
    validateReqSchema(IdParamSchema, 'params'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getByIdController.run(req, res))
  )

  router.delete(
    '/v1/aircraft-models/:id',
    validateReqSchema(IdParamSchema, 'params'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => deleteController.run(req, res))
  )
}
