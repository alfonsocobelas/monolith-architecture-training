import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Issue } from './issue'

export abstract class IssueRepository {
  abstract register(issue: Issue): Promise<void>
  abstract save(issues: Issue | Issue[]): Promise<void>
  abstract get(issueId: string): Promise<Nullable<Issue>>
  abstract matching(criteria: Criteria): Promise<Issue[]>
  abstract exists(criteria: Criteria): Promise<boolean>
}
