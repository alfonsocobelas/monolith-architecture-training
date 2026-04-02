import { InstallEngineInAircraftUsecase } from 'src/modules/aircrafts/application/update/install-engine-in-aircraft-usecase.service'
import { AircraftStatus } from 'src/modules/aircrafts/domain/aircraft-enums'
import { InstallEngineInAircraftInputMother } from './install-engine-in-aircraft-input.mother'
import { EngineRepositoryMock } from '../../../engines/mocks/engine.repository.mock'
import { AircraftRepositoryMock } from '../../mocks/aircraft.repository.mock'
import { AircraftModelRepositoryMock } from '../../../aircraft-models/mocks/aircraft-model.repository.mock'
import { AircraftMother } from '../../domain/aircraft.mother'
import { EngineMother } from '../../../engines/domain/engine.mother'
import { AircraftBuilder } from '../../domain/aircraft.builder'
import { AircraftModelBuilder } from '../../../aircraft-models/domain/aircraft-model.builder'
import { TransactionManagerMock } from '../../../shared/mocks/transaction-manager.mock'

describe('InstallEngineInAircraftUseCase (unit tests)', () => {
  let aircraftRepository: AircraftRepositoryMock
  let engineRepository: EngineRepositoryMock
  let modelRepository: AircraftModelRepositoryMock
  let txManager: TransactionManagerMock
  let useCase: InstallEngineInAircraftUsecase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    engineRepository = new EngineRepositoryMock()
    modelRepository = new AircraftModelRepositoryMock()
    txManager = new TransactionManagerMock()
    useCase = new InstallEngineInAircraftUsecase(engineRepository, aircraftRepository, modelRepository, txManager)
    txManager.whenRunInTransactionSuccess()
  })

  it('should install an engine in an aircraft', async () => {
    // GIVEN
    const input = InstallEngineInAircraftInputMother.random()
    const expectedEngine = EngineMother.free(input.engineId, input.aircraftId)
    const expectedAircraft = AircraftBuilder
      .anAircraft().withId(input.aircraftId).withEngineIds([]).withStatus(AircraftStatus.ACTIVE).build()
    const expectedModel = AircraftModelBuilder.aModel().withId(expectedAircraft.modelId).withNumEngines(2).build()
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenFound(expectedEngine)
    modelRepository.givenFound(expectedModel)

    // WHEN
    await useCase.invoke(input)

    // THEN
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    engineRepository.assertCalledWith('get', input.engineId)
    modelRepository.assertCalledWith('get', expectedAircraft.modelId)
    aircraftRepository.assertCalledWith('save', expectedAircraft)
    engineRepository.assertCalledWith('save', expectedEngine)
  })

  it('should throw EntityNotFoundError if engine does not exist', async () => {
    // GIVEN
    const input = InstallEngineInAircraftInputMother.random()
    const expectedAircraft = AircraftMother.activeInFlight(input.aircraftId)
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Engine with id "${input.engineId}" not found.`)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    engineRepository.assertCalledWith('get', input.engineId)
    modelRepository.assertNotCalled('get')
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = InstallEngineInAircraftInputMother.random()
    const expectedEngine = EngineMother.free(input.engineId, input.aircraftId)
    engineRepository.givenFound(expectedEngine)
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Aircraft with id "${input.aircraftId}" not found.`)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    engineRepository.assertCalledWith('get', input.engineId)
    modelRepository.assertNotCalled('get')
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })

  it('should throw EntityNotFoundError if aircraft model does not exist', async () => {
    // GIVEN
    const input = InstallEngineInAircraftInputMother.random()
    const expectedEngine = EngineMother.free(input.engineId, input.aircraftId)
    const expectedAircraft = AircraftMother.activeInFlight(input.aircraftId)
    aircraftRepository.givenFound(expectedAircraft)
    engineRepository.givenFound(expectedEngine)
    modelRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`AircraftModel with id "${expectedAircraft.modelId}" not found.`)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    engineRepository.assertCalledWith('get', input.engineId)
    modelRepository.assertCalledWith('get', expectedAircraft.modelId)
    aircraftRepository.assertNotCalled('save')
    engineRepository.assertNotCalled('save')
  })
})
