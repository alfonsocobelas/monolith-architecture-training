import { AlreadyExistsError } from 'src/common/errors'
import { RegisterCompanyInput } from './register-company-input.dto'
import { CompanyRepository } from '../../domain/company.repository'
import { Company } from '../../domain/company'

export default class RegisterCompanyUseCase {
  constructor(private readonly repository: CompanyRepository) {}

  async invoke(input: RegisterCompanyInput): Promise<void> {
    const companyExists = await this.repository.exists(input.name)

    if (companyExists) {
      throw new AlreadyExistsError('Company', 'name', input.name)
    }

    const company = Company.create({
      id: input.id,
      name: input.name
    })

    await this.repository.register(company)
  }
}
