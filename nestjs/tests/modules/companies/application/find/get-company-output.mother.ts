import { GetCompanyOutput } from 'src/modules/companies/application/find/get-company-output.dto'
import { Company } from 'src/modules/companies/domain/company'

export class GetCompanyOutputMother {
  static fromDomain(company: Company): GetCompanyOutput {
    return {
      id: company.id,
      name: company.name
    }
  }
}
