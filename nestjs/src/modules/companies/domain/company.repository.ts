import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Company } from './company'

export abstract class CompanyRepository {
  abstract register(company: Company): Promise<void>
  abstract save(company: Company | Company[]): Promise<void>
  abstract get(companyId: string): Promise<Nullable<Company>>
  abstract matching(criteria: Criteria): Promise<Company[]>
  abstract exists(name: string): Promise<boolean>
  abstract remove(companyId: string): Promise<void>
}
