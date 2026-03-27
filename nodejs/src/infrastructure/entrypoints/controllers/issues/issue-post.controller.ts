import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from '../controller'
import RegisterIssueUseCase from 'src/modules/issues/application/create/register-issue-usecase.service'

export default class IssuePostController implements Controller {
  constructor(private readonly registerService: RegisterIssueUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    await this.registerService.invoke(req.body)

    res.status(httpStatus.CREATED).send()
  }
}
