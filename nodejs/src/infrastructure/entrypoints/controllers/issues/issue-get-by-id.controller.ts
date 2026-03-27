import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { Controller } from '../controller'
import GetIssueUseCase from 'src/modules/issues/application/find/get-issue-usecase.service'

export default class IssueGetByIdController implements Controller {
  constructor(private readonly getService: GetIssueUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    const issue = await this.getService.invoke({ id })

    res.status(httpStatus.OK).json(issue)
  }
}
