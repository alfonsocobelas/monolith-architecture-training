import { EntityNotFoundError } from 'src/common/errors'
import { FleetRepository } from '../../domain/fleet.repository'
import { GetFleetOutput } from './get-fleet-output.dto'
import { GetFleetInput } from './get-fleet-input.dto'

export default class GetFleetUseCase {
  constructor(private readonly fleetRepository: FleetRepository) {}

  async invoke(input: GetFleetInput): Promise<GetFleetOutput> {
    const fleet = await this.fleetRepository.get(input.id)

    if (!fleet) {
      throw new EntityNotFoundError('Fleet', input.id)
    }

    return {
      id: fleet.id,
      aircraftIds: fleet.aircraftIds,
      companyId: fleet.companyId,
      name: fleet.name,
      operationRegion: fleet.operationRegion,
      type: fleet.type,
      maintenanceBudget: fleet.maintenanceBudget,
      status: fleet.status
    }
  }
}
