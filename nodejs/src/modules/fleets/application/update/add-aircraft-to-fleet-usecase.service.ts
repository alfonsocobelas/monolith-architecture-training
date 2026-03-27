import { EntityNotFoundError } from 'src/common/errors'
import { FleetRepository } from 'src/modules/fleets/domain/fleet.repository'
import { AddAircraftToFleetInput } from './add-aircraft-to-fleet-input.dto'
import { AircraftRepository } from '../../../aircrafts/domain/aircraft.repository'

export default class AddAircraftToFleetUsecase {
  constructor(
    private readonly fleetRepository: FleetRepository,
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(input: AddAircraftToFleetInput): Promise<void> {
    const [fleet, aircraft] = await Promise.all([
      this.fleetRepository.get(input.fleetId),
      this.aircraftRepository.get(input.aircraftId)
    ])

    if (!fleet) {
      throw new EntityNotFoundError('Fleet', input.fleetId)
    }

    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', input.aircraftId)
    }

    aircraft.addToFleet(input.fleetId)
    fleet.addAircraft(input.aircraftId)

    await Promise.all([this.aircraftRepository.save(aircraft), this.fleetRepository.save(fleet)])
  }
}
