import httpStatus from 'http-status'
import { Request, Response } from 'express'
import RemoveAircraftUseCase from 'src/modules/aircrafts/application/delete/remove-aircraft-usecase.service'

export default class AircraftDeleteController {
  constructor(private readonly removeService: RemoveAircraftUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    await this.removeService.invoke({ id })

    res.status(httpStatus.NO_CONTENT).send()
  }
}
