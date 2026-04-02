import { DataSource } from 'typeorm'
import { CompanyBuilder } from '../../../modules/companies/domain/company.builder'
import { moduleFixture } from '../../../jest.setup.integration'

export async function setupCompany(): Promise<string> {
  const company = CompanyBuilder.aCompany().build()

  const repository = moduleFixture.get<DataSource>(DataSource)
  await repository.getRepository('CompanyEntity').save(company)

  return company.id
}
