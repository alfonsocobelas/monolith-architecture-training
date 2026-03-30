import { Injectable } from '@nestjs/common'
import { RemoveCompanyUseCase } from 'src/modules/companies/application/delete/remove-company-usecase.service'
import { IdParamDto } from '../../dtos/shared/id-param.dto'

@Injectable()
export class RemoveCompanyHandler {
  constructor(
    private readonly useCase: RemoveCompanyUseCase
  ) {}

  async run(id: IdParamDto): Promise<void> {
    await this.useCase.invoke(id)
  }
}
