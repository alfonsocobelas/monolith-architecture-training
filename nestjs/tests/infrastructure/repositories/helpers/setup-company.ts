import { DataSource } from 'typeorm'
import { CompanyBuilder } from '../../../modules/companies/domain/company.builder'

export async function setupCompany(connection: DataSource): Promise<string> {
  const company = CompanyBuilder.aCompany().build()
  await connection.getRepository('CompanyEntity').save(company)
  return company.id
}
