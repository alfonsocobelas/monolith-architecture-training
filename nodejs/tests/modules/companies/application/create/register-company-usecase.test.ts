import RegisterCompanyUseCase from 'src/modules/companies/application/create/register-company-usecase.service'
import { RegisterCompanyInputMother } from './register-company-input.mother'
import { CompanyMother } from '../../domain/company.mother'
import { CompanyRepositoryMock } from '../../mocks/company.repository.mock'

describe('RegisterCompanyUseCase (unit tests)', () => {
  let repository: CompanyRepositoryMock
  let useCase: RegisterCompanyUseCase

  beforeEach(() => {
    repository = new CompanyRepositoryMock()
    useCase = new RegisterCompanyUseCase(repository)
  })

  it('should register a new company', async () => {
    // GIVEN
    const input = RegisterCompanyInputMother.random()
    const expectedCompany = CompanyMother.fromInput(input)
    repository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    repository.whenRegisterSuccess()

    // THEN
    repository.assertCalledWith('exists', input.name)
    repository.assertCalledWith('register', expectedCompany)
  })

  it('should throw AlreadyExistsError if name is already taken', async () => {
    // GIVEN
    const input = RegisterCompanyInputMother.random()
    repository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Company with name "${input.name}" already exists.`)
    repository.assertNotCalled('register')
  })
})
