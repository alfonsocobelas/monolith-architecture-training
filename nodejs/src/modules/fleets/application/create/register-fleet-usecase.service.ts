import { AlreadyExistsError, InvalidArgumentError } from 'src/common/errors'
import { AircraftRepository } from 'src/modules/aircrafts/domain/aircraft.repository'
import { RegisterFleetInput } from './register-fleet-input.dto'
import { Fleet } from '../../domain/fleet'
import { FleetRepository } from '../../domain/fleet.repository'
import { FleetType, OperationRegion } from '../../domain/fleet-enums'
import { FleetWithNameSpecification } from '../../domain/specifications/fleet-with-name.specification'

export default class RegisterFleetUseCase {
  constructor(
    private readonly fleetRepository: FleetRepository,
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(input: RegisterFleetInput): Promise<void> {
    const { aircraftIds, name } = input

    const [aircrafts, fleetExists] = await Promise.all([
      this.aircraftRepository.find(aircraftIds),
      this.fleetRepository.exists(new FleetWithNameSpecification(name))
    ])

    if (fleetExists) {
      throw new AlreadyExistsError('Fleet', 'name', name)
    }

    if (!aircrafts.length) {
      throw new InvalidArgumentError('No aircrafts found with the provided IDs.')
    }

    if (aircrafts.length !== aircraftIds.length) {
      throw new InvalidArgumentError('Some aircraft IDs were not found.')
    }

    for (const aircraft of aircrafts) {
      aircraft.addToFleet(input.id)
    }

    const fleet = Fleet.create({
      id: input.id,
      aircraftIds: input.aircraftIds,
      companyId: input.companyId,
      name: input.name,
      operationRegion: input.operationRegion as OperationRegion,
      type: input.type as FleetType,
      maintenanceBudget: input.maintenanceBudget
    })

    await Promise.all([await this.fleetRepository.register(fleet), await this.aircraftRepository.save(aircrafts)])
  }
}
