import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import RemoveAircraftModelUseCase from 'src/modules/aircraft-models/application/delete/remove-aircraft-model-usecase.service'

export default class AircraftModelDeleteController implements Controller {
  constructor(private readonly removeService: RemoveAircraftModelUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    await this.removeService.invoke({ id })

    res.status(httpStatus.NO_CONTENT).send()
  }
}
