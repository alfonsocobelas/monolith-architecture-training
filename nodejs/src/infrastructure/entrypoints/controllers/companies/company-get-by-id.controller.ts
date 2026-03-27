import httpStatus from 'http-status'
import { Request, Response } from 'express'
import { Controller } from '../controller'
import GetCompanyUseCase from 'src/modules/companies/application/find/get-company-usecase.service'

export default class CompanyGetByIdController implements Controller {
  constructor(private readonly getService: GetCompanyUseCase) {}

  async run(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    const company = await this.getService.invoke({ id })

    res.status(httpStatus.OK).json(company)
  }
}
