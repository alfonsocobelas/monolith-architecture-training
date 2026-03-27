import { Issue } from 'src/modules/issues/domain/issue'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { MockRepository } from '../../shared/mocks/mock.repository'
import { IssueRepository } from 'src/modules/issues/domain/issue.repository'

export class IssueRepositoryMock extends MockRepository<Issue> implements IssueRepository {
  register(issue: Issue): Promise<void> {
    return this.getMock('register')(issue)
  }

  save(issues: Issue | Issue[]): Promise<void> {
    return this.getMock('save')(issues)
  }

  get(issueId: string): Promise<Nullable<Issue>> {
    return this.getMock('get')(issueId)
  }

  matching(criteria: Criteria): Promise<Issue[]> {
    return this.getMock('matching')(criteria)
  }

  exists(criteria: Criteria): Promise<boolean> {
    return this.getMock('exists')(criteria)
  }

  // Helpers
  givenFound(issue: Issue): void {
    this.setMockResult('get', issue)
  }

  givenNotFound(): void {
    this.setMockResult('get', null)
  }

  givenAlreadyExists(): void {
    this.setMockResult('exists', true)
  }

  givenDoesNotExist(): void {
    this.setMockResult('exists', false)
  }

  givenMatching(issues: Issue[]): void {
    this.setMockResult('matching', issues)
  }

  whenRegisterSuccess(): void {
    this.setMockResult('register', undefined)
  }

  whenSaveSuccess(): void {
    this.setMockResult('save', undefined)
  }
}
