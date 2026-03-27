import { GetIssueUseCase } from 'src/modules/issues/application/find/get-issue-usecase.service'
import { GetIssueInputMother } from './get-issue-input.mother'
import { GetIssueOutputMother } from './get-issue-output.mother'
import { IssueMother } from '../../domain/issue.mother'
import { IssueRepositoryMock } from '../../mocks/issue.repository.mock'

describe('GetIssueUseCase (unit tests)', () => {
  let issueRepository: IssueRepositoryMock
  let useCase: GetIssueUseCase

  beforeEach(() => {
    issueRepository = new IssueRepositoryMock()
    useCase = new GetIssueUseCase(issueRepository)
  })

  it('should get an existing issue by id', async () => {
    // GIVEN
    const input = GetIssueInputMother.random()
    const expectedIssue = IssueMother.fromInput(input)
    const expectedOutput = GetIssueOutputMother.fromDomain(expectedIssue)
    issueRepository.givenFound(expectedIssue)

    // WHEN
    const result = await useCase.invoke(input)

    // THEN
    expect(result).toEqual(expectedOutput)
    issueRepository.assertCalledWith('get', input.id)
  })

  it('should throw EntityNotFoundError if issue does not exist', async () => {
    // GIVEN
    const input = GetIssueInputMother.random()
    issueRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Issue with id "${input.id}" not found.`)
    issueRepository.assertCalledWith('get', input.id)
  })
})
