import RegisterAircraftModelUseCase from 'src/modules/aircraft-models/application/create/register-aircraft-model-usecase.service'
import { RegisterAircraftModelInputMother } from './register-aircraft-model-intput.mother'
import { AircraftModelRepositoryMock } from '../../mocks/aircraft-model.repository.mock'
import { AircraftModelMother } from '../../domain/aircraft-model.mother'

describe('RegisterAircraftModelUseCase (unit test)', () => {
  let repository: AircraftModelRepositoryMock
  let useCase: RegisterAircraftModelUseCase

  beforeEach(() => {
    repository = new AircraftModelRepositoryMock()
    useCase = new RegisterAircraftModelUseCase(repository)
  })

  it('should register a new aircraft model', async () => {
    // GIVEN
    const input = RegisterAircraftModelInputMother.random()
    const expectedModel = AircraftModelMother.register(input)
    repository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    repository.whenRegisterSuccess()

    // THEN
    repository.assertCalledWith('exists', input.code)
    repository.assertCalledWith('register', expectedModel)
  })

  it('should throw AlreadyExistsError if code is already taken', async () => {
    // GIVEN
    const input = RegisterAircraftModelInputMother.random()
    repository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`AircraftModel with code "${input.code}" already exists.`)
    repository.assertNotCalled('register')
  })
})
