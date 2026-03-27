import { EntityManager } from 'typeorm'
import { CompanyBuilder } from '../../../modules/companies/domain/company.builder'

export async function setupCompany(manager: EntityManager): Promise<string> {
  const company = CompanyBuilder.aCompany().build()
  await manager.getRepository('CompanyEntity').save(company)
  return company.id
}
