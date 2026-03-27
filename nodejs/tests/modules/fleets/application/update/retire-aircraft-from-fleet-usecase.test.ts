import RetireAircraftFromFleetUsecase from 'src/modules/fleets/application/update/retire-aircraft-from-fleet-usecase.service'
import { RetireAircraftFromFleetInputMother } from './retire-aircraft-from-fleet-input.mother'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { AircraftBuilder } from '../../../aircrafts/domain/aircraft.builder'
import { FleetBuilder } from '../../domain/fleet.builder'

describe('RetireAircraftFromFleetUseCase (unit tests)', () => {
  let fleetRepository: FleetRepositoryMock
  let aircraftRepository: AircraftRepositoryMock
  let useCase: RetireAircraftFromFleetUsecase

  beforeEach(() => {
    fleetRepository = new FleetRepositoryMock()
    aircraftRepository = new AircraftRepositoryMock()
    useCase = new RetireAircraftFromFleetUsecase(fleetRepository, aircraftRepository)
  })

  it('should retire an aircraft from an existing fleet', async () => {
    // GIVEN
    const input = RetireAircraftFromFleetInputMother.random()
    const fleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds([input.aircraftId]).build()
    const aircraft = AircraftBuilder.anAircraft().withId(input.aircraftId).withFleetId(input.fleetId).build()
    fleetRepository.givenFound(fleet)
    aircraftRepository.givenFound(aircraft)

    // WHEN
    await useCase.invoke(input)

    // THEN
    const expectedFleet = { ...fleet, aircraftIds: [] }
    const expectedAircraft = { ...aircraft, fleetId: undefined }
    fleetRepository.assertCalledWith('get', input.fleetId)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    aircraftRepository.assertCalledWith('save', expectedAircraft)
    fleetRepository.assertCalledWith('save', expectedFleet)
  })

  it('should throw EntityNotFoundError if fleet does not exist', async () => {
    // GIVEN
    const input = RetireAircraftFromFleetInputMother.random()
    fleetRepository.givenNotFound()
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Fleet with id "${input.fleetId}" not found.`)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
  })

  it('should throw EntityNotFoundError if aircraft does not exist', async () => {
    // GIVEN
    const input = RetireAircraftFromFleetInputMother.random()
    const fleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds([input.aircraftId]).build()
    fleetRepository.givenFound(fleet)
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Aircraft with id "${input.aircraftId}" not found.`)
    fleetRepository.assertCalledWith('get', input.fleetId)
    aircraftRepository.assertCalledWith('get', input.aircraftId)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
  })
})
