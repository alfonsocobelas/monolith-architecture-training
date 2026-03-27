import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Company } from './company'

export interface CompanyRepository {
  register(company: Company): Promise<void>
  save(company: Company | Company[]): Promise<void>
  get(companyId: string): Promise<Nullable<Company>>
  matching(criteria: Criteria): Promise<Company[]>
  exists(name: string): Promise<boolean>
  remove(companyId: string): Promise<void>
}
