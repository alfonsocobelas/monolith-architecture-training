import AddAircraftToFleetUsecase from 'src/modules/fleets/application/update/add-aircraft-to-fleet-usecase.service'
import { AddAircraftToFleetInputMother } from './add-aircraft-to-fleet-input.mother'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { FleetBuilder } from '../../domain/fleet.builder'
import { AircraftBuilder } from '../../../aircrafts/domain/aircraft.builder'

describe('AddAircraftToFleetUseCase (unit tests)', () => {
  let fleetRepository: FleetRepositoryMock
  let aircraftRepository: AircraftRepositoryMock
  let useCase: AddAircraftToFleetUsecase

  beforeEach(() => {
    aircraftRepository = new AircraftRepositoryMock()
    fleetRepository = new FleetRepositoryMock()
    useCase = new AddAircraftToFleetUsecase(fleetRepository, aircraftRepository)
  })

  it('should add aircraft to an existing fleet', async () => {
    // GIVEN
    const input = AddAircraftToFleetInputMother.random()
    const expectedAircraft = AircraftBuilder.anAircraft().withId(input.aircraftId).build()
    const expectedFleet = FleetBuilder.aFleet().withId(input.fleetId).build()
    fleetRepository.givenFound(expectedFleet)
    aircraftRepository.givenFound(expectedAircraft)

    // WHEN
    await useCase.invoke(input)

    // THEN
    fleetRepository.assertCalledWith('get', input.fleetId)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    aircraftRepository.assertCalledWith('save', expectedAircraft)
    fleetRepository.assertCalledWith('save', expectedFleet)
  })

  it('should throw EntityNotFoundError if fleet does not exist', async () => {
    // GIVEN
    const input = AddAircraftToFleetInputMother.random()
    fleetRepository.givenNotFound()
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Fleet with id "${input.fleetId}" not found.`)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = AddAircraftToFleetInputMother.random()
    const expectedFleet = FleetBuilder.aFleet().withId(input.fleetId).build()
    fleetRepository.givenFound(expectedFleet)
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Aircraft with id "${input.aircraftId}" not found.`)
    fleetRepository.assertCalledWith('get', input.fleetId)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
  })

  it('should throw error if aircraft is already in the fleet', async () => {
    // GIVEN
    const input = AddAircraftToFleetInputMother.random()
    const expectedFleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds([input.aircraftId]).build()
    const expectedAircraft = AircraftBuilder.anAircraft().withId(input.aircraftId).withFleetId(input.fleetId).build()
    fleetRepository.givenFound(expectedFleet)
    aircraftRepository.givenFound(expectedAircraft)

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Aircraft is already assigned to fleet ${input.fleetId}.`)
    fleetRepository.assertCalledWith('get', input.fleetId)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
  })
})
