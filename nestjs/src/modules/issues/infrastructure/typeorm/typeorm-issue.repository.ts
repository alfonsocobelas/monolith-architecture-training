import { DataSource, EntityTarget } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { TypeOrmRepository } from 'src/infrastructure/persistence/typeorm/typeorm.repository'
import { TypeOrmCriteriaConverter } from 'src/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { IssueEntity } from './typeorm-issue.entity'
import { IssueMapper } from './typeorm-issue.mapper'
import { IssueRepository } from '../../domain/issue.repository'
import { Issue } from '../../domain/issue'

@Injectable()
export class TypeOrmIssueRepository
  extends TypeOrmRepository<IssueEntity>
  implements IssueRepository
{
  constructor(dataSource: DataSource, converter: TypeOrmCriteriaConverter) {
    super(dataSource, converter)
  }

  protected entitySchema(): EntityTarget<IssueEntity> {
    return IssueEntity
  }

  async register(issue: Issue): Promise<void> {
    const repository = this.repository()
    const entity = IssueMapper.toPersistence(issue)

    await repository.insert(entity)
  }

  async get(issueId: string): Promise<Nullable<Issue>> {
    const repository = this.repository()
    const entity = await repository.findOneBy({ id: issueId })

    if (!entity) {
      return null
    }

    return IssueMapper.toDomain(entity)
  }

  async save(issues: Issue | Issue[]): Promise<void> {
    const entities = Array.isArray(issues)
      ? issues.map(IssueMapper.toPersistence)
      : IssueMapper.toPersistence(issues)

    await this.persist(entities)
  }

  async matching(criteria: Criteria): Promise<Issue[]> {
    const entities = await this.searchByCriteria(criteria)

    return entities.map(entity => IssueMapper.toDomain(entity))
  }

  async exists(criteria: Criteria): Promise<boolean> {
    return this.existsByCriteria(criteria)
  }
}
