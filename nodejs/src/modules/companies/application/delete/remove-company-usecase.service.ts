import { EntityNotFoundError } from 'src/common/errors'
import { RemoveCompanyInput } from './remove-company-input.dto'
import { CompanyRepository } from '../../domain/company.repository'

export default class RemoveCompanyUseCase {
  constructor(private readonly repository: CompanyRepository) {}

  async invoke(input: RemoveCompanyInput): Promise<void> {
    const company = await this.repository.get(input.id)

    if (!company) {
      throw new EntityNotFoundError('Company', input.id)
    }

    await this.repository.remove(input.id)
  }
}
