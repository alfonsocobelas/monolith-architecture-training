import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from '../../../entrypoints/controllers/controller'

export default class HealthCheckGetController implements Controller {
  async run(req: Request, res: Response): Promise<void> {
    res.status(httpStatus.OK).send()
  }
}
