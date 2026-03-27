import RetireAircraftsFromFleetUsecase from 'src/modules/fleets/application/update/retire-aircrafts-from-fleet-usecase.service'
import { RetireAircraftsFromFleetInputMother } from './retire-aircrafts-from-fleet-input.mother'
import { FleetRepositoryMock } from '../../mocks/fleet.repository.mock'
import { AircraftRepositoryMock } from '../../../aircrafts/mocks/aircraft.repository.mock'
import { FleetBuilder } from '../../domain/fleet.builder'
import { AircraftBuilder } from '../../../aircrafts/domain/aircraft.builder'

describe('RetireAircraftsFromFleetUseCase (unit tests)', () => {
  let fleetRepository: FleetRepositoryMock
  let aircraftRepository: AircraftRepositoryMock
  let useCase: RetireAircraftsFromFleetUsecase

  beforeEach(() => {
    fleetRepository = new FleetRepositoryMock()
    aircraftRepository = new AircraftRepositoryMock()
    useCase = new RetireAircraftsFromFleetUsecase(fleetRepository, aircraftRepository)
  })

  it('should retire multiple aircrafts from an existing fleet', async () => {
    // GIVEN
    const input = RetireAircraftsFromFleetInputMother.random()
    const fleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds(input.aircraftIds).build()
    const aircrafts = input.aircraftIds.map(id =>
      AircraftBuilder.anAircraft().withId(id).withFleetId(input.fleetId).build()
    )
    fleetRepository.givenFound(fleet)
    aircraftRepository.givenAircraftsFound(aircrafts)

    // WHEN
    await useCase.invoke(input)

    // THEN
    const expectedFleet = { ...fleet, aircraftIds: [] }
    const expectedAircrafts = aircrafts.map(aircraft => ({ ...aircraft, fleetId: undefined }))
    fleetRepository.assertCalledWith('get', input.fleetId)
    aircraftRepository.assertCalledWith('find', input.aircraftIds)
    aircraftRepository.assertCalledWith('save', expectedAircrafts)
    fleetRepository.assertCalledWith('save', expectedFleet)
  })

  it('should throw EntityNotFoundError if fleet does not exist', async () => {
    // GIVEN
    const input = RetireAircraftsFromFleetInputMother.random()
    fleetRepository.givenNotFound()
    aircraftRepository.givenNotFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow(`Fleet with id "${input.fleetId}" not found.`)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
  })

  it('should throw InvalidArgumentError if no aircrafts are found with the provided IDs', async () => {
    // GIVEN
    const input = RetireAircraftsFromFleetInputMother.random()
    const fleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds(input.aircraftIds).build()
    fleetRepository.givenFound(fleet)
    aircraftRepository.givenNoAircraftsFound()

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow('No aircrafts found with the provided IDs.')
    aircraftRepository.assertCalledWith('find', input.aircraftIds)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
  })

  it('should throw InvalidArgumentError if some aircraft IDs are not found', async () => {
    // GIVEN
    const input = RetireAircraftsFromFleetInputMother.random()
    const fleet = FleetBuilder.aFleet().withId(input.fleetId).withAircraftIds(input.aircraftIds).build()
    const foundAircrafts = input.aircraftIds
      .slice(0, -1)
      .map(id => AircraftBuilder.anAircraft().withId(id).withFleetId(input.fleetId).build())
    fleetRepository.givenFound(fleet)
    aircraftRepository.givenAircraftsFound(foundAircrafts)

    // WHEN & THEN
    await expect(useCase.invoke(input)).rejects.toThrow('Some aircraft IDs were not found')
    aircraftRepository.assertCalledWith('find', input.aircraftIds)
    aircraftRepository.assertNotCalled('save')
    fleetRepository.assertNotCalled('save')
  })
})
