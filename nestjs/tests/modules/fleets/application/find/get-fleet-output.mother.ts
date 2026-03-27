import { GetFleetOutput } from 'src/modules/fleets/application/find/get-fleet-output.dto'
import { Fleet } from 'src/modules/fleets/domain/fleet'

export class GetFleetOutputMother {
  static fromDomain(fleet: Fleet): GetFleetOutput {
    return {
      id: fleet.id,
      name: fleet.name,
      companyId: fleet.companyId,
      aircraftIds: fleet.aircraftIds,
      operationRegion: fleet.operationRegion,
      type: fleet.type,
      maintenanceBudget: fleet.maintenanceBudget,
      status: fleet.status
    }
  }
}
