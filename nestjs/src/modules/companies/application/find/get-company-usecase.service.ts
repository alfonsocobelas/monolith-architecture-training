import { Injectable } from '@nestjs/common'
import { EntityNotFoundError } from 'src/common/errors'
import { GetCompanyInput } from './get-company-input.dto'
import { GetCompanyOutput } from './get-company-output.dto'
import { CompanyRepository } from '../../domain/company.repository'

@Injectable()
export class GetCompanyUseCase {
  constructor(
    private readonly repository: CompanyRepository
  ) {}

  async invoke(input: GetCompanyInput): Promise<GetCompanyOutput> {
    const company = await this.repository.get(input.id)

    if (!company) {
      throw new EntityNotFoundError('Company', input.id)
    }

    return {
      id: company.id,
      name: company.name
    }
  }
}
