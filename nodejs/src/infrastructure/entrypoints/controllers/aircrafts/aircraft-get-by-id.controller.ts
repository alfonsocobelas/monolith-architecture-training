import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import GetAircraftUseCase from 'src/modules/aircrafts/application/find/get-aircraft-usecase.service'

export default class AircraftGetByIdController implements Controller {
  constructor(private readonly getService: GetAircraftUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    const aircraft = await this.getService.invoke({ id })

    res.status(httpStatus.OK).json(aircraft)
  }
}
