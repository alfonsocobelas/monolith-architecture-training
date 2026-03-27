import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import RegisterAircraftUseCase from 'src/modules/aircrafts/application/create/register-aircraft-usecase.service'

export default class AircraftPostController implements Controller {
  constructor(private readonly registerService: RegisterAircraftUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    await this.registerService.invoke(req.body)

    res.status(httpStatus.CREATED).send()
  }
}
