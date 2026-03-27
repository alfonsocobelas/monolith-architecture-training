import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import ListAircraftModelCatalogueUseCase from 'src/modules/aircraft-models/application/find/list-aircraft-model-catalogue-usecase.service'

export default class AircraftModelGetCatalogueController implements Controller {
  constructor(private readonly listService: ListAircraftModelCatalogueUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const aircraftModels = await this.listService.invoke()

    res.status(httpStatus.OK).json(aircraftModels)
  }
}
