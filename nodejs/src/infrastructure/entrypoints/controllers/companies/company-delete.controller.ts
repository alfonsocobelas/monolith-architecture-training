import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import RemoveCompanyUseCase from 'src/modules/companies/application/delete/remove-company-usecase.service'

export default class CompanyDeleteController implements Controller {
  constructor(private readonly removeService: RemoveCompanyUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    await this.removeService.invoke({ id })

    res.status(httpStatus.NO_CONTENT).send()
  }
}
