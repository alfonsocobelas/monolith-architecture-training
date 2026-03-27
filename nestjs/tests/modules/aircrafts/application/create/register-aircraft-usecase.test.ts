import { RegisterAircraftUseCase } from 'src/modules/aircrafts/application/create/register-aircraft-usecase.service'
import { RegisterAircraftInputMother } from './register-aircraft-input.mother'
import { AircraftWithTailNumberSpecification } from 'src/modules/aircrafts/domain/specifications/aircraft-with-tail-number.specification'
import { AircraftModelMother } from '../../../aircraft-models/domain/aircraft-model.mother'
import { AircraftModelRepositoryMock } from '../../../aircraft-models/mocks/aircraft-model.repository.mock'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { AircraftMother } from '../../domain/aircraft.mother'

describe('RegisterAircraftUseCase (unit tests)', () => {
  let aircraftRepository: AircraftRepositoryMock
  let modelRepository: AircraftModelRepositoryMock
  let useCase: RegisterAircraftUseCase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    modelRepository = new AircraftModelRepositoryMock()
    useCase = new RegisterAircraftUseCase(aircraftRepository, modelRepository)
  })

  it('should register a new aircraft', async () => {
    // GIVEN
    const input = RegisterAircraftInputMother.random()
    const expectedModel = AircraftModelMother.fromInput(input)
    const expectedAircraft = AircraftMother.register(input)
    modelRepository.givenFound(expectedModel)
    aircraftRepository.givenDoesNotExist()

    // WHEN
    await useCase.invoke(input)
    aircraftRepository.whenRegisterSuccess()

    // THEN
    modelRepository.assertCalledWith('get', input.modelId)
    aircraftRepository.assertCalledWith('exists', expect.any(AircraftWithTailNumberSpecification))
    aircraftRepository.assertCalledWith('register', expectedAircraft)
  })

  it('should throw EntityNotFoundError if aircraft model does not exist', async () => {
    // GIVEN
    const input = RegisterAircraftInputMother.random()
    modelRepository.givenNotFound()
    aircraftRepository.givenDoesNotExist()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`AircraftModel with id "${input.modelId}" not found.`)
    modelRepository.assertCalledWith('get', input.modelId)
    aircraftRepository.assertCalledWith('exists', expect.any(AircraftWithTailNumberSpecification))
    aircraftRepository.assertNotCalled('register')
  })

  it('should throw AlreadyExistsError if tail number is already taken', async () => {
    // GIVEN
    const input = RegisterAircraftInputMother.random()
    const expectedModel = AircraftModelMother.fromInput(input)
    modelRepository.givenFound(expectedModel)
    aircraftRepository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Aircraft with tailNumber "${input.tailNumber}" already exists.`)
    modelRepository.assertCalledWith('get', input.modelId)
    aircraftRepository.assertCalledWith('exists', expect.any(AircraftWithTailNumberSpecification))
    aircraftRepository.assertNotCalled('register')
  })
})
