import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import RegisterAircraftModelUseCase from 'src/modules/aircraft-models/application/create/register-aircraft-model-usecase.service'

export default class AircraftModelPostController implements Controller {
  constructor(private readonly registerService: RegisterAircraftModelUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    await this.registerService.invoke(req.body)

    res.status(httpStatus.CREATED).send()
  }
}
