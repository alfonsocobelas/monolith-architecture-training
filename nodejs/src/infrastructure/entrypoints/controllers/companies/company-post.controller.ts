import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import RegisterCompanyUseCase from 'src/modules/companies/application/create/register-company-usecase.service'

export default class CompanyPostController implements Controller {
  constructor(private readonly registerService: RegisterCompanyUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    await this.registerService.invoke(req.body)

    res.status(httpStatus.CREATED).send()
  }
}
