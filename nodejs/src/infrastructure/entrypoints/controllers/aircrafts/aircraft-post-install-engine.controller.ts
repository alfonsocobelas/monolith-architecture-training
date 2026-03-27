import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import InstallEngineInAircraftUsecase from 'src/modules/aircrafts/application/update/install-engine-in-aircraft-usecase.service'

export default class AircraftPostInstallEngineController implements Controller {
  constructor(private readonly installEngineService: InstallEngineInAircraftUsecase) {}

  async run(req: Request, res: Response): Promise<void> {
    const engineId = req.params.engineId as string
    const aircraftId = req.params.aircraftId as string

    await this.installEngineService.invoke({ aircraftId, engineId })

    res.status(httpStatus.CREATED).send()
  }
}
