import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import GetEngineUseCase from 'src/modules/engines/application/find/get-engine-usecase.service'

export default class EngineGetByIdController implements Controller {
  constructor(private readonly getEngine: GetEngineUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    const engine = await this.getEngine.invoke({ id })

    res.status(httpStatus.OK).json(engine)
  }
}
