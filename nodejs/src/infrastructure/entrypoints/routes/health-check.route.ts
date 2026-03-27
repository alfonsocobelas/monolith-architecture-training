import { Request, Response, Router } from 'express'
import { ContainerBuilder } from 'node-dependency-injection'
import { ControllerNamespaces } from '../controllers/enums'
import HealthCheckGetController from '../../entrypoints/controllers/health-check/health-check-get.controller'

export const register = (router: Router, container: ContainerBuilder): void => {
  const controller: HealthCheckGetController = container.get(ControllerNamespaces.HealthCheck)

  router.get('/health', (req: Request, res: Response) => controller.run(req, res))
}
