import { Aircraft } from 'src/modules/aircrafts/domain/aircraft'
import { FindAircraftsInMaintenanceOutput } from 'src/modules/aircrafts/application/find/find-aircrafts-in-maintenance-output.dto'

export class FindAircraftsInMaintenanceOutputMother {
  static fromDomainList(aircrafts: Aircraft[]): FindAircraftsInMaintenanceOutput[] {
    return aircrafts.map(aircraft => this.fromDomain(aircraft))
  }

  static fromDomain(aircraft: Aircraft): FindAircraftsInMaintenanceOutput {
    return {
      id: aircraft.id,
      modelId: aircraft.modelId,
      tailNumber: aircraft.tailNumber,
      totalFlightHours: aircraft.totalFlightHours,
      fuelLevelPercentage: aircraft.fuelLevelPercentage,
      status: aircraft.status
    }
  }
}
