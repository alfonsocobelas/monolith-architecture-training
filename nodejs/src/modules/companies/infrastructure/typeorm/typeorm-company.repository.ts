import { EntityTarget } from 'typeorm'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { TypeOrmRepository } from 'src/infrastructure/persistence/typeorm/typeorm.repository'
import { CompanyMapper } from './typeorm-company.mapper'
import { CompanyEntity } from './typeorm-company.entity'
import { Company } from '../../domain/company'
import { CompanyRepository } from '../../domain/company.repository'

export default class TypeOrmCompanyRepository extends TypeOrmRepository<CompanyEntity> implements CompanyRepository {
  protected entitySchema(): EntityTarget<CompanyEntity> {
    return CompanyEntity
  }

  async register(company: Company): Promise<void> {
    const repository = await this.repository()
    const entity = CompanyMapper.toPersistence(company)

    await repository.insert(entity)
  }

  async save(companies: Company | Company[]): Promise<void> {
    await this.persist(companies, CompanyMapper)
  }

  async get(companyId: string): Promise<Nullable<Company>> {
    const repository = await this.repository()

    const entity = await repository.findOneBy({ id: companyId })

    if (!entity) {
      return null
    }

    return CompanyMapper.toDomain(entity)
  }

  async matching(criteria: Criteria): Promise<Company[]> {
    const entities = await this.searchByCriteria(criteria)

    return entities.map(entity => CompanyMapper.toDomain(entity))
  }

  async remove(companyId: string): Promise<void> {
    const repository = await this.repository()

    await repository.delete({ id: companyId })
  }

  async exists(name: string): Promise<boolean> {
    const repository = await this.repository()

    const existEntity = await repository
      .createQueryBuilder('company')
      .where('company.name = :name', { name })
      .select('1')
      .getExists()

    return existEntity
  }
}
