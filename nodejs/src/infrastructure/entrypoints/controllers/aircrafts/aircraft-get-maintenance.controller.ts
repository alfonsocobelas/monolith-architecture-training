import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from '../controller'
import FindAircraftsInMaintenanceUseCase from 'src/modules/aircrafts/application/find/find-aircrafts-in-maintenance-usecase.service'

export default class AircraftGetMaintenanceController implements Controller {
  constructor(private readonly listService: FindAircraftsInMaintenanceUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const aircrafts = await this.listService.invoke()

    res.status(httpStatus.OK).json(aircrafts)
  }
}
