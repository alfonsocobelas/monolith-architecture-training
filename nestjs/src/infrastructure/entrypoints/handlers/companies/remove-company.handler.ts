import { Injectable } from '@nestjs/common'
import { RemoveCompanyUseCase } from 'src/modules/companies/application/delete/remove-company-usecase.service'

@Injectable()
export class RemoveCompanyHandler {
  constructor(
    private readonly useCase: RemoveCompanyUseCase
  ) {}

  async run(id: string): Promise<void> {
    await this.useCase.invoke({ id })
  }
}
