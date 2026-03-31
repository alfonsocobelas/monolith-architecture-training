import { Injectable } from '@nestjs/common'
import { GetCompanyUseCase } from 'src/modules/companies/application/find/get-company-usecase.service'
import { GetCompanyResponse } from '../../dtos/companies/get-company.response'

@Injectable()
export class GetCompanyHandler {
  constructor(
    private readonly useCase: GetCompanyUseCase
  ) {}

  async run(id: string): Promise<GetCompanyResponse> {
    return this.useCase.invoke({ id })
  }
}
