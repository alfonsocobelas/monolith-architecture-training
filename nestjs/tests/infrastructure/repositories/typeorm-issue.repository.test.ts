import { v7 as uuidv7 } from 'uuid'
import { TypeOrmIssueRepository } from 'src/modules/issues/infrastructure/typeorm/typeorm-issue.repository'
import { TypeOrmCriteriaConverter } from 'src/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { IssueMother } from '../../modules/issues/domain/issue.mother'
import { queryRunner } from '../../jest.setup.integration'

let repository: TypeOrmIssueRepository

beforeEach(async () => {
  repository = new TypeOrmIssueRepository(queryRunner.manager.connection, new TypeOrmCriteriaConverter())
})

describe('IssueRepository (integration tests)', () => {
  describe('register method', () => {
    it('should register a new issue', async () => {
      const issue = IssueMother.random()

      await repository.register(issue)
    })
  })

  describe('get method', () => {
    it('should return an issue by its id', async () => {
      const issue = IssueMother.random()

      await repository.register(issue)
      const foundIssue = await repository.get(issue.id)

      expect(foundIssue).toEqual(issue)
    })

    it('should return null if issue does not exist', async () => {
      const nonExistingId = uuidv7()
      const foundIssue = await repository.get(nonExistingId)

      expect(foundIssue).toBeNull()
    })
  })

  describe('get method', () => {
    it('should return an issue by its id', async () => {
      const issue = IssueMother.random()

      await repository.register(issue)
      const foundIssue = await repository.get(issue.id)

      expect(foundIssue).toEqual(issue)
    })

    it('should return null if issue does not exist', async () => {
      const nonExistingId = uuidv7()
      const foundIssue = await repository.get(nonExistingId)

      expect(foundIssue).toBeNull()
    })
  })
})
