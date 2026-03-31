import { Injectable } from '@nestjs/common'
import { EntityNotFoundError } from 'src/common/errors'
import { AircraftRepository } from 'src/modules/aircrafts/domain/aircraft.repository'
import { FleetRepository } from 'src/modules/fleets/domain/fleet.repository'
import { RetireAircraftFromFleetInput } from './retire-aircraft-from-fleet-input'

@Injectable()
export class RetireAircraftFromFleetUsecase {
  constructor(
    private readonly fleetRepository: FleetRepository,
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(input: RetireAircraftFromFleetInput): Promise<void> {
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

    aircraft.retireFromFleet(input.fleetId)
    fleet.retireAircraft(input.aircraftId)

    await Promise.all([
      this.aircraftRepository.save(aircraft),
      this.fleetRepository.save(fleet)
    ])
  }
}
