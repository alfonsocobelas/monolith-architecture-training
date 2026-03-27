import { v7 as uuidv7 } from 'uuid'
import { RegisterIssueUseCase } from 'src/modules/issues/application/create/register-issue-usecase.service'
import { IssueWithCodeSpecification } from 'src/modules/issues/domain/specifications/issue-with-code.specification'
import { RegisterIssueInputMother } from './register-issue-input.mother'
import { IssueRepositoryMock } from '../../mocks/issue.repository.mock'
import { IssueMother } from '../../domain/issue.mother'

describe('RegisterIssueUseCase (unit tests)', () => {
  let issueRepository: IssueRepositoryMock
  let useCase: RegisterIssueUseCase

  beforeEach(() => {
    issueRepository = new IssueRepositoryMock()
    useCase = new RegisterIssueUseCase(issueRepository)
  })

  it('should register a new engine issue', async () => {
    // GIVEN
    const engineId = uuidv7()
    const input = RegisterIssueInputMother.engine(engineId)
    const issue = IssueMother.fromInput(input)
    const expectedIssue = IssueMother.register(issue)
    issueRepository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    issueRepository.whenRegisterSuccess()

    // THEN
    issueRepository.assertCalledWith('exists', expect.any(IssueWithCodeSpecification))
    issueRepository.assertCalledWith('register', expectedIssue)
  })

  it('should register a new avionics issue', async () => {
    // GIVEN
    const aircraftId = uuidv7()
    const input = RegisterIssueInputMother.avionics(aircraftId)
    const issue = IssueMother.fromInput(input)
    const expectedIssue = IssueMother.register(issue)
    issueRepository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    issueRepository.whenRegisterSuccess()

    // THEN
    issueRepository.assertCalledWith('exists', expect.any(IssueWithCodeSpecification))
    issueRepository.assertCalledWith('register', expectedIssue)
  })

  it('should throw AlreadyExistsError if an issue with the same code already exists', async () => {
    // GIVEN
    const input = RegisterIssueInputMother.random()
    issueRepository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Issue with code "${input.code}" already exists.`)
    issueRepository.assertCalledWith('exists', expect.any(IssueWithCodeSpecification))
    issueRepository.assertNotCalled('register')
  })
})
