import { EntityTarget } from 'typeorm'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { TypeOrmRepository } from 'src/infrastructure/persistence/typeorm/typeorm.repository'
import { IssueEntity } from './typeorm-issue.entity'
import { IssueMapper } from './typeorm-issue.mapper'
import { IssueRepository } from '../../domain/issue.repository'
import { Issue } from '../../domain/issue'

export default class TypeOrmIssueRepository extends TypeOrmRepository<IssueEntity> implements IssueRepository {
  protected entitySchema(): EntityTarget<IssueEntity> {
    return IssueEntity
  }

  async register(issue: Issue): Promise<void> {
    const repository = await this.repository()
    const entity = IssueMapper.toPersistence(issue)

    await repository.insert(entity)
  }

  async get(issueId: string): Promise<Nullable<Issue>> {
    const repository = await this.repository()
    const entity = await repository.findOneBy({ id: issueId })

    if (!entity) {
      return null
    }

    return IssueMapper.toDomain(entity)
  }

  async save(issues: Issue | Issue[]): Promise<void> {
    await this.persist(issues, IssueMapper)
  }

  async matching(criteria: Criteria): Promise<Issue[]> {
    const entities = await this.searchByCriteria(criteria)

    return entities.map(entity => IssueMapper.toDomain(entity))
  }

  async exists(criteria: Criteria): Promise<boolean> {
    return this.existsByCriteria(criteria)
  }
}
