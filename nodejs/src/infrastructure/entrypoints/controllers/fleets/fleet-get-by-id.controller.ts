import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import GetFleetUseCase from 'src/modules/fleets/application/find/get-fleet-usecase.service'

export default class FleetGetByIdController implements Controller {
  constructor(private readonly getService: GetFleetUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    const fleet = await this.getService.invoke({ id })

    res.status(httpStatus.OK).json(fleet)
  }
}
