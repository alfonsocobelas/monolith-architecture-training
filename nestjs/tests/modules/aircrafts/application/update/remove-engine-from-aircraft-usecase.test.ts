import { RemoveEngineFromAircraftUsecase } from 'src/modules/aircrafts/application/update/remove-engine-from-aircraft-usecase.service'
import { RemoveEngineFromAircraftInputMother } from './remove-engine-from-aircraft-input.mother'
import { EngineRepositoryMock } from '../../../engines/mocks/engine.repository.mock'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { AircraftBuilder } from '../../domain/aircraft.builder'
import { EngineMother } from '../../../engines/domain/engine.mother'
import { EngineBuilder } from '../../../engines/domain/engine.builder'

describe('RemoveEngineFromAircraftUseCase (unit tests)', () => {
  let aircraftRepository: AircraftRepositoryMock
  let engineRepository: EngineRepositoryMock
  let useCase: RemoveEngineFromAircraftUsecase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    engineRepository = new EngineRepositoryMock()
    useCase = new RemoveEngineFromAircraftUsecase(engineRepository, aircraftRepository)
  })

  it('should remove an engine from an aircraft', async () => {
    // GIVEN
    const input = RemoveEngineFromAircraftInputMother.random()
    const expectedAircraft = AircraftBuilder
      .anAircraft()
      .withId(input.aircraftId)
      .withEngineIds([input.engineId])
      .build()
    const expectedEngine = EngineBuilder
      .anEngine()
      .withId(input.engineId)
      .withAircraftId(input.aircraftId)
      .withIsInstalled(true)
      .build()
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenFound(expectedEngine)

    // WHEN
    await useCase.invoke(input)

    // THEN
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    engineRepository.assertCalledWith('get', input.engineId)
    aircraftRepository.assertCalledWith('save', expectedAircraft)
    engineRepository.assertCalledWith('save', expectedEngine)
  })

  it('should throw EntityNotFoundError if engine does not exist', async () => {
    // GIVEN
    const input = RemoveEngineFromAircraftInputMother.random()
    const expectedAircraft = AircraftBuilder.anAircraft().withId(input.aircraftId).build()
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Engine with id "${input.engineId}" not found.`)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    engineRepository.assertCalledWith('get', input.engineId)
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })

  it('should throw EntityNotFoundError if aircraft does not exist ', async () => {
    // GIVEN
    const input = RemoveEngineFromAircraftInputMother.random()
    const expectedEngine = EngineMother.installed(input.engineId, input.aircraftId)
    engineRepository.givenFound(expectedEngine)
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Aircraft with id "${input.aircraftId}" not found.`)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    engineRepository.assertCalledWith('get', input.engineId)
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })
})
