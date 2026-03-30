import { Injectable } from '@nestjs/common'
import { RegisterCompanyUseCase } from 'src/modules/companies/application/create/register-company-usecase.service'
import { RegisterCompanyDto } from '../../dtos/companies/register-company.dto'

@Injectable()
export class RegisterCompanyHandler {
  constructor(
    private readonly useCase: RegisterCompanyUseCase
  ) {}

  async run(dto: RegisterCompanyDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
