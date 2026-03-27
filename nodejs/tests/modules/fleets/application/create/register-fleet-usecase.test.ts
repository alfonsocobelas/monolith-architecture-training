import RegisterFleetUseCase from 'src/modules/fleets/application/create/register-fleet-usecase.service'
import { FleetWithNameSpecification } from 'src/modules/fleets/domain/specifications/fleet-with-name.specification'
import { RegisterFleetInputMother } from './register-fleet-input.mother'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { FleetMother } from '../../domain/fleet.mother'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'
import { AircraftBuilder } from '../../../aircrafts/domain/aircraft.builder'

describe('RegisterFleetUseCase (unit tests)', () => {
  let fleetRepository: FleetRepositoryMock
  let aircraftRepository: AircraftRepositoryMock
  let useCase: RegisterFleetUseCase

  beforeEach(() => {
    fleetRepository = new FleetRepositoryMock()
    aircraftRepository = new AircraftRepositoryMock()
    useCase = new RegisterFleetUseCase(fleetRepository, aircraftRepository)
  })

  it('should register a new fleet', async () => {
    // GIVEN
    const input = RegisterFleetInputMother.random()
    const expectedFleet = FleetMother.fromInput(input)
    const expectedAircrafts = input.aircraftIds.map(id => AircraftBuilder.anAircraft().withId(id).build())
    fleetRepository.givenDoesNotExist()
    aircraftRepository.givenAircraftsFound(expectedAircrafts)

    // WHEN
    await useCase.invoke(input)
    fleetRepository.whenRegisterSuccess()
    aircraftRepository.whenSaveSuccess()

    // THEN
    fleetRepository.assertCalledWith('exists', expect.any(FleetWithNameSpecification))
    aircraftRepository.assertCalledWith('find', input.aircraftIds)
    fleetRepository.assertCalledWith('register', expectedFleet)
    aircraftRepository.assertCalledWith('save', expectedAircrafts)
  })

  it('should throw AlreadyExistsError if fleet with same name already exists', async () => {
    // GIVEN
    const input = RegisterFleetInputMother.random()
    const expectedAircrafts = input.aircraftIds.map(id => AircraftBuilder.anAircraft().withId(id).build())
    aircraftRepository.givenAircraftsFound(expectedAircrafts)
    fleetRepository.givenAlreadyExists()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Fleet with name "${input.name}" already exists.`)
    aircraftRepository.assertCalledWith('find', input.aircraftIds)
    fleetRepository.assertCalledWith('exists', expect.any(FleetWithNameSpecification))
    fleetRepository.assertNotCalled('register')
    aircraftRepository.assertNotCalled('save')
  })

  it('should throw InvalidArgumentError if no aircrafts are found with the provided IDs', async () => {
    // GIVEN
    const input = RegisterFleetInputMother.random()
    fleetRepository.givenDoesNotExist()
    aircraftRepository.givenNoAircraftsFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow('No aircrafts found with the provided IDs.')
    fleetRepository.assertCalledWith('exists', expect.any(FleetWithNameSpecification))
    aircraftRepository.assertCalledWith('find', input.aircraftIds)
    fleetRepository.assertNotCalled('register')
    aircraftRepository.assertNotCalled('save')
  })

  it('should throw InvalidArgumentError if some aircraft IDs were not found', async () => {
    // GIVEN
    const input = RegisterFleetInputMother.random()
    const foundAircrafts = input.aircraftIds.slice(0, -1).map(id => AircraftBuilder.anAircraft().withId(id).build())
    fleetRepository.givenDoesNotExist()
    aircraftRepository.givenAircraftsFound(foundAircrafts)

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow('Some aircraft IDs were not found.')
    fleetRepository.assertCalledWith('exists', expect.any(FleetWithNameSpecification))
    aircraftRepository.assertCalledWith('find', input.aircraftIds)
    fleetRepository.assertNotCalled('register')
    aircraftRepository.assertNotCalled('save')
  })
})
