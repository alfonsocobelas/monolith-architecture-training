import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import RemoveEngineFromAircraftUsecase from 'src/modules/aircrafts/application/update/remove-engine-from-aircraft-usecase.service'

export default class AircraftPostUninstallEngineController implements Controller {
  constructor(private readonly uninstallEngineService: RemoveEngineFromAircraftUsecase) {}

  async run(req: Request, res: Response): Promise<void> {
    const engineId = req.params.engineId as string
    const aircraftId = req.params.aircraftId as string

    await this.uninstallEngineService.invoke({ aircraftId, engineId })

    res.status(httpStatus.CREATED).send()
  }
}
