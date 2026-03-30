import { DataSource, EntityTarget, Repository, ObjectLiteral, EntityManager } from 'typeorm'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { TypeOrmCriteriaConverter } from './typeorm-criteria-converter'

export abstract class TypeOrmRepository<EntityType extends ObjectLiteral> {
  private criteriaConverter = new TypeOrmCriteriaConverter()

  constructor(private _client: Promise<DataSource | EntityManager>) {
    this.criteriaConverter = new TypeOrmCriteriaConverter()
  }

  protected abstract entitySchema(): EntityTarget<EntityType>

  protected client(): Promise<DataSource | EntityManager> {
    return this._client
  }

  protected async repository(): Promise<Repository<EntityType>> {
    const client = await this.client()
    const entity = this.entitySchema()

    return client.getRepository(entity)
  }

  protected async searchByCriteria(criteria: Criteria): Promise<EntityType[]> {
    const repository = await this.repository()
    const qb = repository.createQueryBuilder('entity')
    const query = this.criteriaConverter.buildQuery(criteria)

    if (query.filter) {
      qb.where(query.filter.query, query.filter.params)
    }

    if (query.cursor) {
      qb.andWhere(query.cursor.query, query.cursor.params)
    } else if (query.skip) {
      qb.skip(query.skip)
    }

    if (query.sort) {
      qb.orderBy(query.sort)
    }

    if (query.limit) {
      qb.take(query.limit)
    }

    return qb.getMany()
  }

  protected async countByCriteria(criteria: Criteria): Promise<number> {
    const repository = await this.repository()
    const qb = repository.createQueryBuilder('entity')
    const query = this.criteriaConverter.buildQuery(criteria)

    if (query.filter) {
      qb.where(query.filter.query, query.filter.params)
    }

    return qb.getCount()
  }

  protected async existsByCriteria(criteria: Criteria): Promise<boolean> {
    const repository = await this.repository()
    const qb = repository.createQueryBuilder('entity')
    const query = this.criteriaConverter.buildQuery(criteria)

    if (query.filter) {
      qb.where(query.filter.query, query.filter.params)
    }

    return qb.select('1').getExists()
  }

  protected async persist<T>(
    domains: T | T[],
    mapper: { toPersistence: (domain: T) => EntityType }
  ): Promise<void> {
    const repository = await this.repository()

    if (Array.isArray(domains)) {
      const entities = domains.map(mapper.toPersistence)

      await repository.save(entities)
    } else {
      const entity = mapper.toPersistence(domains)

      await repository.save(entity)
    }
  }
}
