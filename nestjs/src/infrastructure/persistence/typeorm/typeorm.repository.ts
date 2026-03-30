import { Injectable } from '@nestjs/common'
import { DataSource, EntityTarget, Repository, ObjectLiteral, EntityManager } from 'typeorm'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { TypeOrmCriteriaConverter } from './typeorm-criteria-converter'

@Injectable()
export abstract class TypeOrmRepository<EntityType extends ObjectLiteral> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly criteriaConverter: TypeOrmCriteriaConverter
  ) {}

  protected abstract entitySchema(): EntityTarget<EntityType>

  protected client(): EntityManager {
    return this.dataSource.manager
  }

  protected repository(): Repository<EntityType> {
    const client = this.client()
    const entity = this.entitySchema()

    return client.getRepository(entity)
  }

  protected async searchByCriteria(criteria: Criteria): Promise<EntityType[]> {
    const repository = this.repository()
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
    const repository = this.repository()
    const qb = repository.createQueryBuilder('entity')
    const query = this.criteriaConverter.buildQuery(criteria)

    if (query.filter) {
      qb.where(query.filter.query, query.filter.params)
    }

    return qb.getCount()
  }

  protected async existsByCriteria(criteria: Criteria): Promise<boolean> {
    const repository = this.repository()
    const qb = repository.createQueryBuilder('entity')
    const query = this.criteriaConverter.buildQuery(criteria)

    if (query.filter) {
      qb.where(query.filter.query, query.filter.params)
    }

    return qb.select('1').getExists()
  }

  protected async persist(entities: EntityType | EntityType[]): Promise<void> {
    const repository = this.repository()

    if (Array.isArray(entities)) {
      await repository.save(entities)
    } else {
      await repository.save(entities)
    }
  }
}
