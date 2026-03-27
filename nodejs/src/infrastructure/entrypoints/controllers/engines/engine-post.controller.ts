import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import RegisterEngineUseCase from 'src/modules/engines/application/create/register-engine-usecase.service'

export default class EnginePostController implements Controller {
  constructor(private readonly registerService: RegisterEngineUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    await this.registerService.invoke(req.body)

    res.status(httpStatus.CREATED).send()
  }
}
