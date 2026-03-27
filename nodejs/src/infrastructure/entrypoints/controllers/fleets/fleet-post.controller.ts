import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import RegisterFleetUseCase from 'src/modules/fleets/application/create/register-fleet-usecase.service'

export default class FleetPostController implements Controller {
  constructor(private readonly registerService: RegisterFleetUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    await this.registerService.invoke(req.body)

    res.status(httpStatus.CREATED).send()
  }
}
