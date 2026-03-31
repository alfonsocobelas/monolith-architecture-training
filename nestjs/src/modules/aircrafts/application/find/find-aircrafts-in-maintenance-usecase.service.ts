import { Injectable } from '@nestjs/common'
import { FindAircraftsInMaintenanceOutput } from './find-aircrafts-in-maintenance-output.dto'
import { AircraftRepository } from '../../domain/aircraft.repository'
import { AircraftsInMaintenanceSpecification } from '../../domain/specifications/aircrafts-in-maintenance.specification'

const EMPTY_AIRCRAFTS_IN_MAINTENANCE = [] as FindAircraftsInMaintenanceOutput[]

@Injectable()
export class FindAircraftsInMaintenanceUseCase {
  constructor(
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(): Promise<FindAircraftsInMaintenanceOutput[]> {
    const aircrafts = await this.aircraftRepository.matching(new AircraftsInMaintenanceSpecification())

    if (!aircrafts.length) {
      return EMPTY_AIRCRAFTS_IN_MAINTENANCE
    }

    return aircrafts.map(aircraft => ({
      id: aircraft.id,
      modelId: aircraft.modelId,
      tailNumber: aircraft.tailNumber,
      totalFlightHours: aircraft.totalFlightHours,
      fuelLevelPercentage: aircraft.fuelLevelPercentage,
      status: aircraft.status
    }))
  }
}
