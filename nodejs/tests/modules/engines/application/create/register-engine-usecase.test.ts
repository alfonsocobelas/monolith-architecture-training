import RegisterEngineUseCase from 'src/modules/engines/application/create/register-engine-usecase.service'
import { RegisterEngineInputMother } from './register-engine-input.mother'
import { EngineRepositoryMock } from '../../mocks/engine.repository.mock'
import { EngineMother } from '../../domain/engine.mother'

describe('RegisterEngineUseCase (unit tests)', () => {
  let repository: EngineRepositoryMock
  let useCase: RegisterEngineUseCase

  beforeEach(() => {
    repository = new EngineRepositoryMock()
    useCase = new RegisterEngineUseCase(repository)
  })

  it('should register a new engine', async () => {
    // GIVEN
    const input = RegisterEngineInputMother.random()
    const expectedEngine = EngineMother.register(input)
    repository.givenDoesNotExist()
    repository.whenRegisterSuccess()

    // WHEN
    await useCase.invoke(input)

    // THEN
    repository.assertCalledWith('exists', input.serialNumber)
    repository.assertCalledWith('register', expectedEngine)
  })

  it('should throw AlreadyExistsError if serial number is already taken', async () => {
    // GIVEN
    const input = RegisterEngineInputMother.random()
    repository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(
      `Engine with serialNumber "${input.serialNumber}" already exists.`
    )
    repository.assertNotCalled('register')
  })
})
