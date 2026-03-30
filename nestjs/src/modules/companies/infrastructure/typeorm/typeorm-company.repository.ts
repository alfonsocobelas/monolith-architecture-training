import { DataSource, EntityTarget } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { TypeOrmRepository } from 'src/infrastructure/persistence/typeorm/typeorm.repository'
import { TypeOrmCriteriaConverter } from 'src/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { CompanyMapper } from './typeorm-company.mapper'
import { CompanyEntity } from './typeorm-company.entity'
import { Company } from '../../domain/company'
import { CompanyRepository } from '../../domain/company.repository'

@Injectable()
export class TypeOrmCompanyRepository
  extends TypeOrmRepository<CompanyEntity>
  implements CompanyRepository
{
  constructor(dataSource: DataSource, converter: TypeOrmCriteriaConverter) {
    super(dataSource, converter)
  }

  protected entitySchema(): EntityTarget<CompanyEntity> {
    return CompanyEntity
  }

  async register(company: Company): Promise<void> {
    const repository = this.repository()
    const entity = CompanyMapper.toPersistence(company)

    await repository.insert(entity)
  }

  async save(companies: Company | Company[]): Promise<void> {
    const entities = Array.isArray(companies)
      ? companies.map(CompanyMapper.toPersistence)
      : CompanyMapper.toPersistence(companies)

    await this.persist(entities)
  }

  async get(companyId: string): Promise<Nullable<Company>> {
    const repository = this.repository()

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
    const repository = this.repository()

    await repository.delete({ id: companyId })
  }

  async exists(name: string): Promise<boolean> {
    const repository = this.repository()

    const existEntity = await repository
      .createQueryBuilder('company')
      .where('company.name = :name', { name })
      .select('1')
      .getExists()

    return existEntity
  }
}
