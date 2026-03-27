import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import GetAircraftModelUseCase from 'src/modules/aircraft-models/application/find/get-aircraft-model-usecase.service'

export default class GetAircraftModelController implements Controller {
  constructor(private readonly getService: GetAircraftModelUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    const aircraftModel = await this.getService.invoke({ id })

    res.status(httpStatus.OK).json(aircraftModel)
  }
}
