import { Injectable } from '@nestjs/common'
import { EntityNotFoundError, InvalidArgumentError } from 'src/common/errors'
import { FleetRepository } from 'src/modules/fleets/domain/fleet.repository'
import { AircraftRepository } from 'src/modules/aircrafts/domain/aircraft.repository'
import { RetireAircraftsFromFleetInput } from './retire-aircrafts-from-fleet-input.dto'

@Injectable()
export class RetireAircraftsFromFleetUsecase {
  constructor(
    private readonly fleetRepository: FleetRepository,
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(input: RetireAircraftsFromFleetInput): Promise<void> {
    const { fleetId, aircraftIds } = input

    const [fleet, aircrafts] = await Promise.all([
      this.fleetRepository.get(fleetId),
      this.aircraftRepository.find(aircraftIds)
    ])

    if (!fleet) {
      throw new EntityNotFoundError('Fleet', fleetId)
    }

    if (!aircrafts.length) {
      throw new InvalidArgumentError('No aircrafts found with the provided IDs.')
    }

    if (aircrafts.length !== aircraftIds.length) {
      throw new InvalidArgumentError('Some aircraft IDs were not found')
    }

    for (const aircraft of aircrafts) {
      aircraft.retireFromFleet(fleetId)
      fleet.retireAircraft(aircraft.id)
    }

    await Promise.all([
      this.aircraftRepository.save(aircrafts),
      this.fleetRepository.save(fleet)
    ])
  }
}
