import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Issue } from './issue'

export interface IssueRepository {
  register(issue: Issue): Promise<void>
  save(issues: Issue | Issue[]): Promise<void>
  get(issueId: string): Promise<Nullable<Issue>>
  matching(criteria: Criteria): Promise<Issue[]>
  exists(criteria: Criteria): Promise<boolean>
}
