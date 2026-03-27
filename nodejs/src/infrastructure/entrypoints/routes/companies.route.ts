import { NextFunction, Request, Response, Router } from 'express'
import { ContainerBuilder } from 'node-dependency-injection'
import { asyncHandler } from '../middlewares/async-handler.middleware'
import { validateReqSchema } from '../middlewares/schema-validator.middleware'
import { IdParamSchema } from '../schemas/shared/id-param.schema'
import { CompanyPostSchema } from '../schemas/companies/company-post.schema'
import { ControllerNamespaces } from '../controllers/enums'
import CompanyPostController from '../controllers/companies/company-post.controller'
import CompanyGetByIdController from '../controllers/companies/company-get-by-id.controller'
import CompanyDeleteController from '../controllers/companies/company-delete.controller'

export const register = (router: Router, container: ContainerBuilder): void => {
  const postController: CompanyPostController = container.get(ControllerNamespaces.CompanyPostController)
  const getByIdController: CompanyGetByIdController = container.get(ControllerNamespaces.CompanyGetByIdController)
  const deleteController: CompanyDeleteController = container.get(ControllerNamespaces.CompanyDeleteController)

  router.post(
    '/v1/companies',
    validateReqSchema(CompanyPostSchema, 'body'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => postController.run(req, res))
  )

  router.get(
    '/v1/companies/:id',
    validateReqSchema(IdParamSchema, 'params'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => getByIdController.run(req, res))
  )

  router.delete(
    '/v1/companies/:id',
    validateReqSchema(IdParamSchema, 'params'),
    asyncHandler((req: Request, res: Response, next: NextFunction) => deleteController.run(req, res))
  )
}
